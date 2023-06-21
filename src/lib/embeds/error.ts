import { Colors, EmbedBuilder } from 'discord.js';

export default async function () {
	return new EmbedBuilder()
		.setTitle('An error occurred!')
		.setDescription('Please try again later or contact me at dev@jeschek.eu')
		.setColor(Colors.Red)
		.setTimestamp();
}
