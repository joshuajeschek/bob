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
import type { MapGamemode } from './MapGamemode';
import { MapGamemodeFromJSON, MapGamemodeFromJSONTyped, MapGamemodeToJSON } from './MapGamemode';

/**
 *
 * @export
 * @interface GamemodeDetails
 */
export interface GamemodeDetails {
	/**
	 *
	 * @type {MapGamemode}
	 * @memberof GamemodeDetails
	 */
	key: MapGamemode;
	/**
	 * Name of the gamemode
	 * @type {string}
	 * @memberof GamemodeDetails
	 */
	name: string;
	/**
	 * Icon URL of the gamemode
	 * @type {string}
	 * @memberof GamemodeDetails
	 */
	icon: string;
	/**
	 * Description of the gamemode
	 * @type {string}
	 * @memberof GamemodeDetails
	 */
	description: string;
	/**
	 * URL of an example screenshot of a map for the gamemode
	 * @type {string}
	 * @memberof GamemodeDetails
	 */
	screenshot: string;
}

/**
 * Check if a given object implements the GamemodeDetails interface.
 */
export function instanceOfGamemodeDetails(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'key' in value;
	isInstance = isInstance && 'name' in value;
	isInstance = isInstance && 'icon' in value;
	isInstance = isInstance && 'description' in value;
	isInstance = isInstance && 'screenshot' in value;

	return isInstance;
}

export function GamemodeDetailsFromJSON(json: any): GamemodeDetails {
	return GamemodeDetailsFromJSONTyped(json, false);
}

export function GamemodeDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): GamemodeDetails {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		key: MapGamemodeFromJSON(json['key']),
		name: json['name'],
		icon: json['icon'],
		description: json['description'],
		screenshot: json['screenshot']
	};
}

export function GamemodeDetailsToJSON(value?: GamemodeDetails | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		key: MapGamemodeToJSON(value.key),
		name: value.name,
		icon: value.icon,
		description: value.description,
		screenshot: value.screenshot
	};
}
