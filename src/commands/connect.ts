import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { createConnectToken, generateAuthURL, setTokenExpiration } from '../lib/connect';
import { Time } from '@sapphire/time-utilities';
import { EmbedBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, bold, time } from 'discord.js';
import { sleep } from '@sapphire/utilities';
import { getProfile } from '../lib/overwatch';

@ApplyOptions<Command.Options>({
	name: 'connect',
	description: 'Connect your Battle.net account to your Discord account.'
})
export class ConnectCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		await interaction.deferReply({ ephemeral: true });
		const user = await this.container.db.user.findFirst({ where: { id: interaction.user.id } });
		if (user?.battleTag) {
			const profile = await getProfile(user.battleTag);
			const embed = new EmbedBuilder() //
				.setThumbnail(profile.portrait)
				.setDescription(
					`Your Discord account is already connected to ${bold(
						user.battleTag
					)} on Battle.net.\n\nWould you like to connect a different account or disconnect your account?`
				);
			const component = new ActionRowBuilder<ButtonBuilder>() //
				.setComponents([
					new ButtonBuilder() //
						.setCustomId('reconnect')
						.setStyle(ButtonStyle.Success)
						.setLabel('Reconnect'),
					new ButtonBuilder() //
						.setCustomId('disconnect')
						.setStyle(ButtonStyle.Danger)
						.setLabel('Disconnect'),
					new ButtonBuilder() //
						.setCustomId('cancel')
						.setStyle(ButtonStyle.Secondary)
						.setLabel('Cancel')
				]);
			const reply = await interaction.editReply({ embeds: [embed], components: [component] });
			const action = await this.getButtonAction(reply);
			if (action === 'reconnect') {
				interaction.editReply({ embeds: [embed], components: [] });
			} else if (action === 'disconnect') {
				await this.container.db.user.update({
					where: {
						id: interaction.user.id
					},
					data: {
						battleTag: null
					}
				});
				embed //
					.setDescription(`Your Discord account is no longer connected to to a Battle.net account.`)
					.setThumbnail(this.container.client.user?.displayAvatarURL() ?? null);
				return interaction.editReply({ embeds: [embed], components: [] });
			} else {
				embed.setDescription(`Your Discord account is still connected to ${bold(user.battleTag)} on Battle.net and the command was cancelled.`);
				return interaction.editReply({ embeds: [embed], components: [] });
			}
		}
		const connectToken = await createConnectToken(interaction.user.id);
		const authURL = generateAuthURL(connectToken);
		const expiration = setTokenExpiration(connectToken, Time.Minute * 5);

		const embed = new EmbedBuilder() //
			.setTimestamp(Date.now())
			.setThumbnail(this.container.client.user?.displayAvatarURL() ?? null)
			.setDescription('Please authenticate with Battle.net using the button below.')
			.setFields({ name: 'Expiration:', value: time(expiration) });

		const component = new ActionRowBuilder<ButtonBuilder>() //
			.addComponents(
				new ButtonBuilder() //
					.setURL(authURL)
					.setLabel('Connect')
					.setStyle(ButtonStyle.Link)
					.setEmoji('🔗')
			);
		await interaction.editReply({ embeds: [embed], components: [component] });
		let stopped = await this.editReply(interaction, embed, expiration);
		while (!stopped) {
			await sleep(Time.Second * 5);
			stopped = await this.editReply(interaction, embed, expiration);
		}
		return;
	}

	private async editReply(interaction: Command.ChatInputCommandInteraction, embed: EmbedBuilder, expiration: Date) {
		const user = await this.container.db.user.findFirst({ where: { id: interaction.user.id } });
		const expirationDifference = expiration.getTime() - Date.now();
		if (expirationDifference < 0 || !user || (!user.connectToken && !user.battleTag)) {
			embed.setFields({ name: 'Expired', value: 'This connection request has expired. Please try again using the `/connect` command.' });
			interaction.editReply({ embeds: [embed], components: [] });
			return true;
		}
		if (user.battleTag) {
			const profile = await getProfile(user.battleTag);
			embed.setFields({ name: 'Connection Success', value: `Your Discord account is connected to ${bold(user.battleTag)} on Battle.net` });
			embed.setThumbnail(profile.portrait);
			interaction.editReply({ embeds: [embed], components: [] });

			return true;
		}
		return false;
	}

	private async getButtonAction(message: Message): Promise<'reconnect' | 'disconnect' | 'cancel'> {
		return new Promise((resolve) => {
			const collector = message.createMessageComponentCollector({ time: Time.Second * 10 });
			collector.on('collect', (buttonPress) => {
				buttonPress.deferUpdate();
				resolve(buttonPress.customId as 'reconnect' | 'disconnect' | 'cancel');
			});
			collector.on('end', () => {
				resolve('cancel');
			});
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description),
			{ idHints: ['1118174634945294437'] }
		);
	}
}
