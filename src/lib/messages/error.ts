import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from 'discord.js';

export default function (): [EmbedBuilder, ActionRowBuilder<ButtonBuilder>] {
	const embed = new EmbedBuilder()
		.setTitle('An error occurred!')
		.setDescription('Please try again later or contact me.')
		.setColor(Colors.Red)
		.setTimestamp();

	const component = new ActionRowBuilder<ButtonBuilder>() //
		.setComponents([
			new ButtonBuilder() //
				.setStyle(ButtonStyle.Link)
				.setURL(`${process.env.BASE_URL}/contact`)
				.setEmoji('📧')
				.setLabel('Contact')
		]);

	return [embed, component];
}
