import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Time } from '@sapphire/time-utilities';
import { EmbedBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, bold, inlineCode } from 'discord.js';
import { getPlayerSummary } from '../lib/overfast';

@ApplyOptions<Command.Options>({
	name: 'disconnect',
	description: 'Disconnect your Battle.net account from your Discord account.'
})
export class DisconnectCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		await interaction.deferReply({ ephemeral: true });
		const user = await this.container.db.user.findFirst({ where: { id: interaction.user.id } });
		if (!user?.battleTag) {
			return interaction.editReply(
				`Your Discord account is not connected to a Battle.net account.\n\nYou can connect your accounts using the ${inlineCode('/connect')} command.`
			);
		}
		const summary = await getPlayerSummary(user.battleTag);
		const embed = new EmbedBuilder() //
			.setThumbnail(summary.avatar || null)
			.setDescription(
				`Your Discord account is connected to ${bold(user.battleTag)} on Battle.net.\n\nWould you like to connect disconnect your account?`
			);
		const component = new ActionRowBuilder<ButtonBuilder>() //
			.setComponents([
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
		if (action === 'disconnect') {
			await this.container.db.user.update({
				where: {
					id: interaction.user.id
				},
				data: {
					battleTag: null
				}
			});
			embed //
				.setDescription(
					`Your Discord account is no longer connected to a Battle.net account.\n\nYou can connect your accounts again using the ${inlineCode(
						'/connect'
					)} command.`
				)
				.setThumbnail(this.container.client.user?.displayAvatarURL() ?? null);
			return interaction.editReply({ embeds: [embed], components: [] });
		}
		embed.setDescription(`Your Discord account is still connected to ${bold(user.battleTag)} on Battle.net and the command was cancelled.`);
		return interaction.editReply({ embeds: [embed], components: [] });
	}

	private async getButtonAction(message: Message): Promise<'disconnect' | 'cancel'> {
		return new Promise((resolve) => {
			const collector = message.createMessageComponentCollector({ time: Time.Minute * 5 });
			collector.on('collect', (buttonPress) => {
				buttonPress.deferUpdate();
				resolve(buttonPress.customId as 'disconnect' | 'cancel');
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
			{ idHints: ['1118554526249668699', '1121474699176726609'] }
		);
	}
}
