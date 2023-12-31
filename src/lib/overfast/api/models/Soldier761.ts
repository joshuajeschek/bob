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
 * Stats summary for Soldier: 76. Not defined if he never played the hero.
 * @export
 * @interface Soldier761
 */
export interface Soldier761 {
	/**
	 * Number of games played
	 * @type {number}
	 * @memberof Soldier761
	 */
	gamesPlayed: number;
	/**
	 * Number of games won
	 * @type {number}
	 * @memberof Soldier761
	 */
	gamesWon: number;
	/**
	 * Number of games lost
	 * @type {number}
	 * @memberof Soldier761
	 */
	gamesLost: number;
	/**
	 * Time played (in seconds)
	 * @type {number}
	 * @memberof Soldier761
	 */
	timePlayed: number;
	/**
	 * Winrate (in percent)
	 * @type {number}
	 * @memberof Soldier761
	 */
	winrate: number;
	/**
	 * Kill / Death / Assist ratio
	 * @type {number}
	 * @memberof Soldier761
	 */
	kda: number;
	/**
	 *
	 * @type {Total}
	 * @memberof Soldier761
	 */
	total: Total;
	/**
	 *
	 * @type {Average}
	 * @memberof Soldier761
	 */
	average: Average;
}

/**
 * Check if a given object implements the Soldier761 interface.
 */
export function instanceOfSoldier761(value: object): boolean {
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

export function Soldier761FromJSON(json: any): Soldier761 {
	return Soldier761FromJSONTyped(json, false);
}

export function Soldier761FromJSONTyped(json: any, ignoreDiscriminator: boolean): Soldier761 {
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

export function Soldier761ToJSON(value?: Soldier761 | null): any {
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
