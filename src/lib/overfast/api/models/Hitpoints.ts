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
/**
 * Hitpoints of the hero
 * @export
 * @interface Hitpoints
 */
export interface Hitpoints {
	/**
	 * Health of the hero
	 * @type {number}
	 * @memberof Hitpoints
	 */
	health: number;
	/**
	 * Armor of the hero
	 * @type {number}
	 * @memberof Hitpoints
	 */
	armor: number;
	/**
	 * Shields of the hero
	 * @type {number}
	 * @memberof Hitpoints
	 */
	shields: number;
	/**
	 * Total HP of the hero
	 * @type {number}
	 * @memberof Hitpoints
	 */
	total: number;
}

/**
 * Check if a given object implements the Hitpoints interface.
 */
export function instanceOfHitpoints(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'health' in value;
	isInstance = isInstance && 'armor' in value;
	isInstance = isInstance && 'shields' in value;
	isInstance = isInstance && 'total' in value;

	return isInstance;
}

export function HitpointsFromJSON(json: any): Hitpoints {
	return HitpointsFromJSONTyped(json, false);
}

export function HitpointsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Hitpoints {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		health: json['health'],
		armor: json['armor'],
		shields: json['shields'],
		total: json['total']
	};
}

export function HitpointsToJSON(value?: Hitpoints | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		health: value.health,
		armor: value.armor,
		shields: value.shields,
		total: value.total
	};
}
