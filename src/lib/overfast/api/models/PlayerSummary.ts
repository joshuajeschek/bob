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
import type { Competitive1 } from './Competitive1';
import { Competitive1FromJSON, Competitive1FromJSONTyped, Competitive1ToJSON } from './Competitive1';
import type { PlayerEndorsement } from './PlayerEndorsement';
import { PlayerEndorsementFromJSON, PlayerEndorsementFromJSONTyped, PlayerEndorsementToJSON } from './PlayerEndorsement';
import type { PlayerPrivacy } from './PlayerPrivacy';
import { PlayerPrivacyFromJSON, PlayerPrivacyFromJSONTyped, PlayerPrivacyToJSON } from './PlayerPrivacy';

/**
 *
 * @export
 * @interface PlayerSummary
 */
export interface PlayerSummary {
	/**
	 * Username of the player
	 * @type {string}
	 * @memberof PlayerSummary
	 */
	username: string;
	/**
	 * URL of the player's avatar. Can be null if couldn't retrieve any
	 * @type {string}
	 * @memberof PlayerSummary
	 */
	avatar?: string;
	/**
	 * URL of the player's namecard (or banner) if any
	 * @type {string}
	 * @memberof PlayerSummary
	 */
	namecard?: string;
	/**
	 * Title of the player if any
	 * @type {string}
	 * @memberof PlayerSummary
	 */
	title?: string;
	/**
	 *
	 * @type {PlayerEndorsement}
	 * @memberof PlayerSummary
	 */
	endorsement: PlayerEndorsement;
	/**
	 *
	 * @type {Competitive1}
	 * @memberof PlayerSummary
	 */
	competitive?: Competitive1;
	/**
	 *
	 * @type {PlayerPrivacy}
	 * @memberof PlayerSummary
	 */
	privacy: PlayerPrivacy;
}

/**
 * Check if a given object implements the PlayerSummary interface.
 */
export function instanceOfPlayerSummary(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'username' in value;
	isInstance = isInstance && 'endorsement' in value;
	isInstance = isInstance && 'privacy' in value;

	return isInstance;
}

export function PlayerSummaryFromJSON(json: any): PlayerSummary {
	return PlayerSummaryFromJSONTyped(json, false);
}

export function PlayerSummaryFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerSummary {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		username: json['username'],
		avatar: !exists(json, 'avatar') ? undefined : json['avatar'],
		namecard: !exists(json, 'namecard') ? undefined : json['namecard'],
		title: !exists(json, 'title') ? undefined : json['title'],
		endorsement: PlayerEndorsementFromJSON(json['endorsement']),
		competitive: !exists(json, 'competitive') ? undefined : Competitive1FromJSON(json['competitive']),
		privacy: PlayerPrivacyFromJSON(json['privacy'])
	};
}

export function PlayerSummaryToJSON(value?: PlayerSummary | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		username: value.username,
		avatar: value.avatar,
		namecard: value.namecard,
		title: value.title,
		endorsement: PlayerEndorsementToJSON(value.endorsement),
		competitive: Competitive1ToJSON(value.competitive),
		privacy: PlayerPrivacyToJSON(value.privacy)
	};
}
