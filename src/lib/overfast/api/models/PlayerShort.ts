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
import type { PlayerPrivacy } from './PlayerPrivacy';
import { PlayerPrivacyFromJSON, PlayerPrivacyFromJSONTyped, PlayerPrivacyToJSON } from './PlayerPrivacy';

/**
 *
 * @export
 * @interface PlayerShort
 */
export interface PlayerShort {
	/**
	 * Identifier of the player : BattleTag (with "#" replaced by "-")
	 * @type {string}
	 * @memberof PlayerShort
	 */
	playerId: string;
	/**
	 * Player nickname displayed in the game
	 * @type {string}
	 * @memberof PlayerShort
	 */
	name: string;
	/**
	 *
	 * @type {PlayerPrivacy}
	 * @memberof PlayerShort
	 */
	privacy: PlayerPrivacy;
	/**
	 * Player's career OverFast API URL (Get player career data)
	 * @type {string}
	 * @memberof PlayerShort
	 */
	careerUrl: string;
}

/**
 * Check if a given object implements the PlayerShort interface.
 */
export function instanceOfPlayerShort(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'playerId' in value;
	isInstance = isInstance && 'name' in value;
	isInstance = isInstance && 'privacy' in value;
	isInstance = isInstance && 'careerUrl' in value;

	return isInstance;
}

export function PlayerShortFromJSON(json: any): PlayerShort {
	return PlayerShortFromJSONTyped(json, false);
}

export function PlayerShortFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerShort {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		playerId: json['player_id'],
		name: json['name'],
		privacy: PlayerPrivacyFromJSON(json['privacy']),
		careerUrl: json['career_url']
	};
}

export function PlayerShortToJSON(value?: PlayerShort | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		player_id: value.playerId,
		name: value.name,
		privacy: PlayerPrivacyToJSON(value.privacy),
		career_url: value.careerUrl
	};
}
