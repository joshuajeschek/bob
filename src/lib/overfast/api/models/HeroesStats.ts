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
import type { HeroStat } from './HeroStat';
import { HeroStatFromJSON, HeroStatFromJSONTyped, HeroStatToJSON } from './HeroStat';

/**
 *
 * @export
 * @interface HeroesStats
 */
export interface HeroesStats {
	/**
	 * Label of the hero statistic
	 * @type {string}
	 * @memberof HeroesStats
	 */
	label: string;
	/**
	 * List of values of this statistic for each heroes. All heroes may not be included in the list.
	 * @type {Array<HeroStat>}
	 * @memberof HeroesStats
	 */
	values: Array<HeroStat>;
}

/**
 * Check if a given object implements the HeroesStats interface.
 */
export function instanceOfHeroesStats(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'label' in value;
	isInstance = isInstance && 'values' in value;

	return isInstance;
}

export function HeroesStatsFromJSON(json: any): HeroesStats {
	return HeroesStatsFromJSONTyped(json, false);
}

export function HeroesStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): HeroesStats {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		label: json['label'],
		values: (json['values'] as Array<any>).map(HeroStatFromJSON)
	};
}

export function HeroesStatsToJSON(value?: HeroesStats | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		label: value.label,
		values: (value.values as Array<any>).map(HeroStatToJSON)
	};
}