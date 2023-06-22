import messages from '../lib/messages';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { inlineCode } from 'discord.js';
import { getHero, getHeroes, getPlayerCareerStats, getPlayerSummary } from '../lib/overfast';
import { Stopwatch } from '@sapphire/stopwatch';
import type { EmbedFooterOptions } from '@discordjs/builders';
import type { HeroKeyCareerFilter, ResponseError } from '../lib/overfast';

const TANK_HEROS = getHeroes('tank').then((heroes) => heroes.map((hero) => ({ name: hero.name, value: hero.key })));
const DAMAGE_HEROS = getHeroes('damage').then((heroes) => heroes.map((hero) => ({ name: hero.name, value: hero.key })));
const SUPPORT_HEROS = getHeroes('support').then((heroes) => heroes.map((hero) => ({ name: hero.name, value: hero.key })));

@ApplyOptions<Command.Options>({
	name: 'stats',
	description: 'Retrieve the stats of an overwatch player'
})
export class ProfileCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const stopwatch = new Stopwatch();
		await interaction.deferReply();
		let discordUser = interaction.options.getUser('user');
		let battleTag = interaction.options.getString('battletag');
		const platform = (interaction.options.getString('platform') || 'pc') as 'pc' | 'console';
		const gamemode = (interaction.options.getString('gamemode') || 'competitive') as 'quickplay' | 'competitive';
		const heroKey = (interaction.options.getString('tank') ||
			interaction.options.getString('damage') ||
			interaction.options.getString('support') ||
			'all-heroes') as HeroKeyCareerFilter;
		const footer: EmbedFooterOptions = { text: '🎮', iconURL: this.container.client.user?.displayAvatarURL() };

		const hero = heroKey != 'all-heroes' && (await getHero(heroKey).catch(() => null));

		if (discordUser && battleTag) {
			footer.text = `btw, you only need to provide one of the options ${inlineCode('user')} and ${inlineCode('battletag')}.`;
		}

		if (!discordUser) {
			discordUser = interaction.user;
		}

		if (!battleTag) {
			const user = await this.container.db.user.findUnique({ where: { id: discordUser.id } });
			if (!user || !user.battleTag) {
				return interaction.editReply({ content: `You must provide a battletag or link your account with the ${inlineCode('/connect')} command.` });
			}
			battleTag = user.battleTag;
		}

		const summary = await getPlayerSummary(battleTag).catch(async (error: ResponseError) => {
			this.container.logger.error(`Error occured on command 'stats': ${error.response.statusText}`);
			const embed = await messages.apiError(error);
			await interaction.editReply({ embeds: [embed] });
		});
		if (!summary) return;
		const stats = await getPlayerCareerStats(battleTag, gamemode, heroKey).catch(async (error: ResponseError) => {
			this.container.logger.error(`Error occured on command 'stats': ${error.response.statusText}`);
			const embed = await messages.apiError(error);
			await interaction.editReply({ embeds: [embed] });
		});
		if (!stats) return;

		if (summary.privacy === 'private') {
			return interaction.editReply({
				content: `${summary.username ? inlineCode(summary.username) : 'That user'} has a private profile. Please ask them to make it public.`
			});
		}

		const embed = await messages.stats(summary, stats, gamemode, platform, hero || undefined);

		footer.text = `took ${stopwatch}`;
		embed.setFooter(footer);

		return interaction.editReply({ embeds: [embed] });
	}

	public override async registerApplicationCommands(registry: Command.Registry) {
		const tank_heros = await TANK_HEROS;
		const damage_heros = await DAMAGE_HEROS;
		const support_heros = await SUPPORT_HEROS;
		registry.registerChatInputCommand(
			async (builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
					.addUserOption((option) =>
						option //
							.setName('user')
							.setDescription('The Discord user to get the Overwatch stats of (default: you)')
					)
					.addStringOption((option) =>
						option //
							.setName('battletag')
							.setDescription('The Overwatch Player to get the stats of (default: you)')
					)
					.addStringOption((option) =>
						option //
							.setName('platform')
							.setDescription('The platform to get the stats of (default: PC)')
							.setChoices(
								{
									name: 'PC',
									value: 'pc'
								},
								{
									name: 'Console',
									value: 'console'
								}
							)
					)
					.addStringOption((option) =>
						option //
							.setName('gamemode')
							.setDescription('The gamemode to get the stats of (default: Competitive)')
							.setChoices(
								{
									name: 'Competitive',
									value: 'competitive'
								},
								{
									name: 'Quickplay',
									value: 'quickplay'
								}
							)
					)
					.addStringOption((option) =>
						option //
							.setName('tank')
							.setDescription('A tank hero to get the stats of (You can only specify one hero per request)')
							.setChoices(...tank_heros)
					)
					.addStringOption((option) =>
						option //
							.setName('damage')
							.setDescription('A damage hero to get the stats of (You can only specify one hero per request)')
							.setChoices(...damage_heros)
					)
					.addStringOption((option) =>
						option //
							.setName('support')
							.setDescription('A support hero to get the stats of (You can only specify one hero per request)')
							.setChoices(...support_heros)
					),

			{ idHints: ['1121086888766357616'] }
		);
	}
}
