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
 * Average values per 10 minutes for generic stats : eliminations, assists, deaths, damage, healing
 * @export
 * @interface Average
 */
export interface Average {
	/**
	 * Average eliminations per 10 minutes
	 * @type {number}
	 * @memberof Average
	 */
	eliminations: number;
	/**
	 * Average assists per 10 minutes
	 * @type {number}
	 * @memberof Average
	 */
	assists: number;
	/**
	 * Average deaths per 10 minutes
	 * @type {number}
	 * @memberof Average
	 */
	deaths: number;
	/**
	 * Average damage done per 10 minutes
	 * @type {number}
	 * @memberof Average
	 */
	damage: number;
	/**
	 * Average healing done per 10 minutes
	 * @type {number}
	 * @memberof Average
	 */
	healing: number;
}

/**
 * Check if a given object implements the Average interface.
 */
export function instanceOfAverage(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'eliminations' in value;
	isInstance = isInstance && 'assists' in value;
	isInstance = isInstance && 'deaths' in value;
	isInstance = isInstance && 'damage' in value;
	isInstance = isInstance && 'healing' in value;

	return isInstance;
}

export function AverageFromJSON(json: any): Average {
	return AverageFromJSONTyped(json, false);
}

export function AverageFromJSONTyped(json: any, ignoreDiscriminator: boolean): Average {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		eliminations: json['eliminations'],
		assists: json['assists'],
		deaths: json['deaths'],
		damage: json['damage'],
		healing: json['healing']
	};
}

export function AverageToJSON(value?: Average | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		eliminations: value.eliminations,
		assists: value.assists,
		deaths: value.deaths,
		damage: value.damage,
		healing: value.healing
	};
}