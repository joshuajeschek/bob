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
import type { MediaType } from './MediaType';
import { MediaTypeFromJSON, MediaTypeFromJSONTyped, MediaTypeToJSON } from './MediaType';

/**
 * Media concerning the hero (YouTube video, pdf story, etc.)
 * @export
 * @interface Media1
 */
export interface Media1 {
	/**
	 *
	 * @type {MediaType}
	 * @memberof Media1
	 */
	type: MediaType;
	/**
	 * Link to the media
	 * @type {string}
	 * @memberof Media1
	 */
	link: string;
}

/**
 * Check if a given object implements the Media1 interface.
 */
export function instanceOfMedia1(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'type' in value;
	isInstance = isInstance && 'link' in value;

	return isInstance;
}

export function Media1FromJSON(json: any): Media1 {
	return Media1FromJSONTyped(json, false);
}

export function Media1FromJSONTyped(json: any, ignoreDiscriminator: boolean): Media1 {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		type: MediaTypeFromJSON(json['type']),
		link: json['link']
	};
}

export function Media1ToJSON(value?: Media1 | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		type: MediaTypeToJSON(value.type),
		link: value.link
	};
}
