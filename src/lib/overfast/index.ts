import { Time } from '@sapphire/time-utilities';
import { Configuration, HeroKey, HeroKeyCareerFilter, HeroesApi, PlayerGamemode, PlayersApi, Role } from './api';
import memoizee from 'memoizee';

export * from './types';
export { HeroKeyCareerFilter, HeroKey, PlayerGamemode } from './api';

const config = new Configuration({
	basePath: 'https://overfast-api.tekrop.fr'
});

const playersApi = new PlayersApi(config);
const heroesApi = new HeroesApi(config);

function sanitizeBattleTag(battleTag: string) {
	const arr = battleTag.split('');
	const lastHash = arr.lastIndexOf('#');
	if (lastHash !== -1) {
		arr[lastHash] = '-';
	}
	return arr.join('');
}

const playerSummary = (battleTag: string) => playersApi.getPlayerSummaryPlayersPlayerIdSummaryGet({ playerId: sanitizeBattleTag(battleTag) });
export const getPlayerSummary = memoizee(playerSummary, { maxAge: Time.Hour + Time.Minute });

const playerCareer = (battleTag: string) => playersApi.getPlayerCareerPlayersPlayerIdGet({ playerId: sanitizeBattleTag(battleTag) });
export const getPlayerCareer = memoizee(playerCareer, { maxAge: Time.Hour + Time.Minute });

const playerCareerStats = (battleTag: string, gamemode: PlayerGamemode, hero?: HeroKeyCareerFilter) =>
	playersApi.getPlayerStatsPlayersPlayerIdStatsGet({ playerId: sanitizeBattleTag(battleTag), gamemode, hero });
export const getPlayerCareerStats = memoizee(playerCareerStats, { maxAge: Time.Hour + Time.Minute });

const heroes = (role?: Role) => heroesApi.listHeroesHeroesGet({ role });
export const getHeroes = memoizee(heroes, { maxAge: Time.Day + Time.Minute, preFetch: true });

const hero = (heroKey: HeroKey) => heroesApi.getHeroHeroesHeroKeyGet({ heroKey });
export const getHero = memoizee(hero, { maxAge: Time.Day + Time.Minute, preFetch: true });
