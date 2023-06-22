import images from '../images';
import { capitalizeFirstLetter } from '../util';
import { getAccentColor } from './util';
import { EmbedBuilder, bold } from 'discord.js';
import { DurationFormatter, Time } from '@sapphire/time-utilities';
import type { APIEmbedField } from 'discord.js';
import type { CareerStats, PlayerSummary, SummaryCompetitive, SummaryCompetitiveRoleRank, SummaryCompetitiveRoleRankFull } from '../overfast';
import type { HeroCareerStats, Hero, CareerStatCategory, PlayerGamemode } from '../overfast';

type CustomCareerStatCategory = CareerStatCategory | 'basic';
interface CustomHeroCareerStats extends Omit<HeroCareerStats, 'category'> {
	category: CustomCareerStatCategory;
}

const CATEGORY_ORDER: CustomCareerStatCategory[] = ['hero_specific', 'game', 'assists', 'average', 'combat'];
const MINUTE_STATS = ['time_played', 'objective_time'];
const SECONDS_STATS = ['time_spent_on_fire_avg_per_10_min', 'objective_time_avg_per_10_min'];

function formatStatValue(key: string, value: number) {
	if (MINUTE_STATS.includes(key)) {
		return new DurationFormatter().format(value * Time.Second);
	}
	if (SECONDS_STATS.includes(key)) {
		return new DurationFormatter().format(value * Time.Millisecond);
	}
	if (typeof value === 'number') {
		// add a comma every 3 digits from the end
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	return `${value}`;
}

export function getStatsFields(stats: HeroCareerStats[]): APIEmbedField[] {
	const basicStatsStats = [
		...(stats.find((category) => category.category === 'game')?.stats || []),
		...(stats.find((category) => category.category === 'assists')?.stats || [])
	];
	const basicStats = { category: 'game', label: 'Game', stats: basicStatsStats } as CustomHeroCareerStats;
	const filteredStats =
		[...stats, basicStats] //
			.filter((category) => !['best', 'game', 'assists'].includes(category.category))
			.sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)) || [];
	return (
		filteredStats.map((category: CustomHeroCareerStats) => {
			const categoryStats = category.stats.map((stat) => `${stat.label}: ${bold(formatStatValue(stat.key, stat.value as number))}`).join('\n');
			return {
				name: category.label,
				value: categoryStats,
				inline: category.category !== 'hero_specific'
			};
		}) || []
	);
}

export default async function (
	summary: PlayerSummary,
	stats: CareerStats,
	gamemode: PlayerGamemode,
	platform: keyof SummaryCompetitive,
	hero?: Hero | Promise<Hero>
) {
	const image = images.ranks(summary, platform);
	const roleRanks = Object.entries(summary.competitive?.[platform] as object) //
		.filter(([_, rank]: [string, SummaryCompetitiveRoleRankFull]) => typeof rank === 'object')
		.map(
			([role, rank]: [string, SummaryCompetitiveRoleRank]) =>
				`${capitalizeFirstLetter(role)} Rank: ` + bold(`${capitalizeFirstLetter(rank.division)} ${rank.tier}`)
		);
	const ranks = `Endorsement: ` + bold(`Level ${summary.endorsement.level}`) + '\n' + roleRanks.join('\n');
	const accentColor = summary.avatar || summary.namecard ? getAccentColor((summary.avatar || summary.namecard) as string) : null;

	const fields = Object.values(stats).filter(Boolean).flatMap(getStatsFields).filter(Boolean);
	const intro =
		`Statistics for ${bold(capitalizeFirstLetter(gamemode))}` +
		(hero ? ` and ${bold((await hero).name)}` : '') +
		(fields.length > 0 ? ':' : ' not found.');

	return new EmbedBuilder() //
		.setTitle(summary.username)
		.setThumbnail((await hero)?.portrait || summary.avatar || null)
		.setColor((await accentColor) || null)
		.setFields(...fields)
		.setImage(await image)
		.setDescription(`${ranks}\n\n${intro}`);
}
