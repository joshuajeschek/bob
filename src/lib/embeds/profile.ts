import images from '../images';
import { EmbedBuilder, italic } from 'discord.js';
import { capitalizeFirstLetter } from '../util';
import { getAccentColor } from './util';
import type { APIEmbedField } from 'discord.js';
import type { PlayerSummary } from '../overfast';

export default async function (summary: PlayerSummary, platform: 'pc' | 'console') {
	const fields: APIEmbedField[] = [];
	if (summary?.endorsement?.level) {
		fields.push({
			name: 'Endorsement Level',
			value: summary.endorsement.level.toString()
		});
	}
	if (summary.competitive && Object.hasOwn(summary.competitive, platform)) {
		const platformRanks = summary.competitive[platform] as NonNullable<typeof summary.competitive.pc>;
		for (const [role, rank] of Object.entries(platformRanks)) {
			if (rank && rank.division && rank.tier) {
				fields.push({
					name: `${capitalizeFirstLetter(role)} Rank`,
					value: `${capitalizeFirstLetter(rank.division)} ${rank.tier}`,
					inline: true
				});
			}
		}
	}

	const accentColor = summary.avatar || summary.namecard ? getAccentColor((summary.avatar || summary.namecard) as string) : null;
	const image = images.ranks(summary, platform);
	return new EmbedBuilder() //
		.setThumbnail(summary.avatar || null)
		.setTitle(summary.username || null)
		.setColor((await accentColor) || null)
		.setImage(await image)
		.setTimestamp()
		.setDescription(summary.title ? italic(summary.title) : null)
		.setFields(...(fields || null));
}
