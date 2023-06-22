import type {
	Hero,
	HeroCareerStats,
	CareerStatCategory,
	HeroKey,
	CareerStats,
	Competitive1,
	Console,
	Damage,
	Pc,
	PlayerSummary,
	ResponseError,
	Support,
	Tank
} from './api';

type SummaryCompetitive = Competitive1;
type SummaryCompetitivePlatform = Pc | Console;
type SummaryCompetitiveRoleRank = Tank | Damage | Support;
type SummaryCompetitiveRoleRankFull = Tank | Damage | Support | number | undefined;

export type {
	PlayerSummary,
	CareerStats,
	ResponseError,
	HeroCareerStats,
	CareerStatCategory,
	Hero,
	HeroKey,
	SummaryCompetitive,
	SummaryCompetitivePlatform,
	SummaryCompetitiveRoleRank,
	SummaryCompetitiveRoleRankFull
};
