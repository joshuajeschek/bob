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
 * Link to the ability video
 * @export
 * @interface Link
 */
export interface Link {
	/**
	 * MP4 version
	 * @type {string}
	 * @memberof Link
	 */
	mp4: string;
	/**
	 * WebM version
	 * @type {string}
	 * @memberof Link
	 */
	webm: string;
}

/**
 * Check if a given object implements the Link interface.
 */
export function instanceOfLink(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'mp4' in value;
	isInstance = isInstance && 'webm' in value;

	return isInstance;
}

export function LinkFromJSON(json: any): Link {
	return LinkFromJSONTyped(json, false);
}

export function LinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): Link {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		mp4: json['mp4'],
		webm: json['webm']
	};
}

export function LinkToJSON(value?: Link | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		mp4: value.mp4,
		webm: value.webm
	};
}
