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
import type { Value1 } from './Value1';
import { Value1FromJSON, Value1FromJSONTyped, Value1ToJSON } from './Value1';

/**
 *
 * @export
 * @interface SingleCareerStat
 */
export interface SingleCareerStat {
	/**
	 * Statistic key
	 * @type {string}
	 * @memberof SingleCareerStat
	 */
	key: string;
	/**
	 * Statistic label
	 * @type {string}
	 * @memberof SingleCareerStat
	 */
	label: string;
	/**
	 *
	 * @type {Value1}
	 * @memberof SingleCareerStat
	 */
	value: Value1;
}

/**
 * Check if a given object implements the SingleCareerStat interface.
 */
export function instanceOfSingleCareerStat(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'key' in value;
	isInstance = isInstance && 'label' in value;
	isInstance = isInstance && 'value' in value;

	return isInstance;
}

export function SingleCareerStatFromJSON(json: any): SingleCareerStat {
	return SingleCareerStatFromJSONTyped(json, false);
}

export function SingleCareerStatFromJSONTyped(json: any, ignoreDiscriminator: boolean): SingleCareerStat {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		key: json['key'],
		label: json['label'],
		value: Value1FromJSON(json['value'])
	};
}

export function SingleCareerStatToJSON(value?: SingleCareerStat | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		key: value.key,
		label: value.label,
		value: Value1ToJSON(value.value)
	};
}
