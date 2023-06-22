import messages from '../lib/messages';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { inlineCode } from 'discord.js';
import { getPlayerSummary } from '../lib/overfast';
import { Stopwatch } from '@sapphire/stopwatch';
import type { EmbedFooterOptions } from '@discordjs/builders';
import type { ResponseError } from '../lib/overfast/api';

@ApplyOptions<Command.Options>({
	name: 'profile',
	description: 'Retrieve the profile of an overwatch player'
})
export class ProfileCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const stopwatch = new Stopwatch();
		let reply: Promise<any> = interaction.deferReply();
		let discordUser = interaction.options.getUser('user');
		let battleTag = interaction.options.getString('battletag');
		const platform = (interaction.options.getString('platform') || 'pc') as 'pc' | 'console';
		const footer: EmbedFooterOptions = { text: '🎮', iconURL: this.container.client.user?.displayAvatarURL() };

		if (discordUser && battleTag) {
			footer.text = `btw, you only need to provide one of the options ${inlineCode('user')} and ${inlineCode('battletag')}.`;
		}

		if (!discordUser) {
			discordUser = interaction.user;
		}

		if (!battleTag) {
			reply = (await reply) && interaction.editReply('Looking for your Battle.net account (this might take a seconds)...');
			const user = await this.container.db.user.findUnique({ where: { id: discordUser.id } });
			if (!user || !user.battleTag) {
				await reply;
				return interaction.editReply({ content: 'You must provide a battletag or link your account with the link command.' });
			}
			battleTag = user.battleTag;
		}
		if (!battleTag) {
			await reply;
			return interaction.editReply({ content: 'You must provide a battletag or link your account with the link command.' });
		}

		reply = (await reply) && interaction.editReply('Fetching the stats (this might take some seconds)...');

		const profile = await getPlayerSummary(battleTag).catch(async (error: ResponseError) => {
			this.container.logger.error(`Error occured on command 'profile': ${error.response.statusText}`);
			const embed = await messages.apiError(error);
			await reply;
			await interaction.editReply({ embeds: [embed] });
		});

		if (!profile) return;

		if (profile.privacy === 'private') {
			await reply;
			return interaction.editReply({
				content: `${profile.username ? inlineCode(profile.username) : 'That user'} has a private profile. Please ask them to make it public.`
			});
		}

		const embed = await messages.profile(profile, platform);

		footer.text = `took ${stopwatch}`;
		embed.setFooter(footer);

		await reply;
		return interaction.editReply({ content: null, embeds: [embed] });
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
					.addUserOption((option) =>
						option //
							.setName('user')
							.setDescription('The Discord user to get the Overwatch profile of (default: you)')
					)
					.addStringOption((option) =>
						option //
							.setName('battletag')
							.setDescription('The Overwatch Player to get the profile of (default: you)')
					)
					.addStringOption((option) =>
						option //
							.setName('platform')
							.setDescription('The platform to get the profile of (default: pc)')
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
					),
			{ idHints: ['1118556730524188712', '1121474705967300638'] }
		);
	}
}
