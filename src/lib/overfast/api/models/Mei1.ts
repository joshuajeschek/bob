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
import type { Average } from './Average';
import { AverageFromJSON, AverageFromJSONTyped, AverageToJSON } from './Average';
import type { Total } from './Total';
import { TotalFromJSON, TotalFromJSONTyped, TotalToJSON } from './Total';

/**
 * Stats summary for Mei. Not defined if he never played the hero.
 * @export
 * @interface Mei1
 */
export interface Mei1 {
	/**
	 * Number of games played
	 * @type {number}
	 * @memberof Mei1
	 */
	gamesPlayed: number;
	/**
	 * Number of games won
	 * @type {number}
	 * @memberof Mei1
	 */
	gamesWon: number;
	/**
	 * Number of games lost
	 * @type {number}
	 * @memberof Mei1
	 */
	gamesLost: number;
	/**
	 * Time played (in seconds)
	 * @type {number}
	 * @memberof Mei1
	 */
	timePlayed: number;
	/**
	 * Winrate (in percent)
	 * @type {number}
	 * @memberof Mei1
	 */
	winrate: number;
	/**
	 * Kill / Death / Assist ratio
	 * @type {number}
	 * @memberof Mei1
	 */
	kda: number;
	/**
	 *
	 * @type {Total}
	 * @memberof Mei1
	 */
	total: Total;
	/**
	 *
	 * @type {Average}
	 * @memberof Mei1
	 */
	average: Average;
}

/**
 * Check if a given object implements the Mei1 interface.
 */
export function instanceOfMei1(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'gamesPlayed' in value;
	isInstance = isInstance && 'gamesWon' in value;
	isInstance = isInstance && 'gamesLost' in value;
	isInstance = isInstance && 'timePlayed' in value;
	isInstance = isInstance && 'winrate' in value;
	isInstance = isInstance && 'kda' in value;
	isInstance = isInstance && 'total' in value;
	isInstance = isInstance && 'average' in value;

	return isInstance;
}

export function Mei1FromJSON(json: any): Mei1 {
	return Mei1FromJSONTyped(json, false);
}

export function Mei1FromJSONTyped(json: any, ignoreDiscriminator: boolean): Mei1 {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		gamesPlayed: json['games_played'],
		gamesWon: json['games_won'],
		gamesLost: json['games_lost'],
		timePlayed: json['time_played'],
		winrate: json['winrate'],
		kda: json['kda'],
		total: TotalFromJSON(json['total']),
		average: AverageFromJSON(json['average'])
	};
}

export function Mei1ToJSON(value?: Mei1 | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		games_played: value.gamesPlayed,
		games_won: value.gamesWon,
		games_lost: value.gamesLost,
		time_played: value.timePlayed,
		winrate: value.winrate,
		kda: value.kda,
		total: TotalToJSON(value.total),
		average: AverageToJSON(value.average)
	};
}
