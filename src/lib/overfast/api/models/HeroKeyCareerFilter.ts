//@ts-nocheck
/* tslint:disable */
/* eslint-disable */
/**
 * OverFast API
 * OverFast API gives data about Overwatch 2 heroes, gamemodes, maps and players statistics by scraping Blizzard pages. Built with **FastAPI** and **Beautiful Soup**, and uses **nginx** as reverse proxy and **Redis** for caching. By using a Refresh-Ahead cache system, it minimizes calls to Blizzard pages (which can be very slow), and quickly returns accurate data to users.  In players statistics endpoints, several conversions are made for convenience : - all **duration values** are converted into **seconds** (integer) - **percent values** are exposed as **integers** instead of a string with a percent symbol - integer and float string representations are converted into the concerned type  Swagger UI (useful for trying API calls) : https://overfast-api.tekrop.fr/docs
 *
 * The version of the OpenAPI document: 2.17.2
 * Contact: vporchet@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Hero keys filter for career statistics endpoint
 * @export
 */
export const HeroKeyCareerFilter = {
	AllHeroes: 'all-heroes',
	Ana: 'ana',
	Ashe: 'ashe',
	Baptiste: 'baptiste',
	Bastion: 'bastion',
	Brigitte: 'brigitte',
	Cassidy: 'cassidy',
	Dva: 'dva',
	Doomfist: 'doomfist',
	Echo: 'echo',
	Genji: 'genji',
	Hanzo: 'hanzo',
	JunkerQueen: 'junker-queen',
	Junkrat: 'junkrat',
	Kiriko: 'kiriko',
	Lifeweaver: 'lifeweaver',
	Lucio: 'lucio',
	Mei: 'mei',
	Mercy: 'mercy',
	Moira: 'moira',
	Orisa: 'orisa',
	Pharah: 'pharah',
	Ramattra: 'ramattra',
	Reaper: 'reaper',
	Reinhardt: 'reinhardt',
	Roadhog: 'roadhog',
	Sigma: 'sigma',
	Sojourn: 'sojourn',
	Soldier76: 'soldier-76',
	Sombra: 'sombra',
	Symmetra: 'symmetra',
	Torbjorn: 'torbjorn',
	Tracer: 'tracer',
	Widowmaker: 'widowmaker',
	Winston: 'winston',
	WreckingBall: 'wrecking-ball',
	Zarya: 'zarya',
	Zenyatta: 'zenyatta'
} as const;
export type HeroKeyCareerFilter = (typeof HeroKeyCareerFilter)[keyof typeof HeroKeyCareerFilter];

export function HeroKeyCareerFilterFromJSON(json: any): HeroKeyCareerFilter {
	return HeroKeyCareerFilterFromJSONTyped(json, false);
}

export function HeroKeyCareerFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): HeroKeyCareerFilter {
	return json as HeroKeyCareerFilter;
}

export function HeroKeyCareerFilterToJSON(value?: HeroKeyCareerFilter | null): any {
	return value as any;
}
