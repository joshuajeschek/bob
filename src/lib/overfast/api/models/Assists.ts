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
 *
 * @export
 * @interface Assists
 */
export interface Assists {}

/**
 * Check if a given object implements the Assists interface.
 */
export function instanceOfAssists(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function AssistsFromJSON(json: any): Assists {
	return AssistsFromJSONTyped(json, false);
}

export function AssistsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Assists {
	return json;
}

export function AssistsToJSON(value?: Assists | null): any {
	return value;
}
