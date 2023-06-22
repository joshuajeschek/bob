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

import { exists, mapValues } from '../runtime';
import type { CareerStats } from './CareerStats';
import { CareerStatsFromJSON, CareerStatsFromJSONTyped, CareerStatsToJSON } from './CareerStats';
import type { HeroesComparisons } from './HeroesComparisons';
import { HeroesComparisonsFromJSON, HeroesComparisonsFromJSONTyped, HeroesComparisonsToJSON } from './HeroesComparisons';

/**
 * Competitive statistics about heroes in the last season played by the player. If the player doesn't have stats for this gamemode, it's null.
 * @export
 * @interface Competitive
 */
export interface Competitive {
	/**
	 *
	 * @type {HeroesComparisons}
	 * @memberof Competitive
	 */
	heroesComparisons: HeroesComparisons;
	/**
	 *
	 * @type {CareerStats}
	 * @memberof Competitive
	 */
	careerStats: CareerStats;
}

/**
 * Check if a given object implements the Competitive interface.
 */
export function instanceOfCompetitive(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'heroesComparisons' in value;
	isInstance = isInstance && 'careerStats' in value;

	return isInstance;
}

export function CompetitiveFromJSON(json: any): Competitive {
	return CompetitiveFromJSONTyped(json, false);
}

export function CompetitiveFromJSONTyped(json: any, ignoreDiscriminator: boolean): Competitive {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		heroesComparisons: HeroesComparisonsFromJSON(json['heroes_comparisons']),
		careerStats: CareerStatsFromJSON(json['career_stats'])
	};
}

export function CompetitiveToJSON(value?: Competitive | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		heroes_comparisons: HeroesComparisonsToJSON(value.heroesComparisons),
		career_stats: CareerStatsToJSON(value.careerStats)
	};
}