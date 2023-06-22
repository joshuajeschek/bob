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
import type { Console1 } from './Console1';
import { Console1FromJSON, Console1FromJSONTyped, Console1ToJSON } from './Console1';
import type { Pc1 } from './Pc1';
import { Pc1FromJSON, Pc1FromJSONTyped, Pc1ToJSON } from './Pc1';

/**
 *
 * @export
 * @interface PlayerStats
 */
export interface PlayerStats {
	/**
	 *
	 * @type {Pc1}
	 * @memberof PlayerStats
	 */
	pc?: Pc1;
	/**
	 *
	 * @type {Console1}
	 * @memberof PlayerStats
	 */
	console?: Console1;
}

/**
 * Check if a given object implements the PlayerStats interface.
 */
export function instanceOfPlayerStats(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function PlayerStatsFromJSON(json: any): PlayerStats {
	return PlayerStatsFromJSONTyped(json, false);
}

export function PlayerStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerStats {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		pc: !exists(json, 'pc') ? undefined : Pc1FromJSON(json['pc']),
		console: !exists(json, 'console') ? undefined : Console1FromJSON(json['console'])
	};
}

export function PlayerStatsToJSON(value?: PlayerStats | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		pc: Pc1ToJSON(value.pc),
		console: Console1ToJSON(value.console)
	};
}
