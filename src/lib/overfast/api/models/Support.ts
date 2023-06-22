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
import type { CompetitiveDivision } from './CompetitiveDivision';
import { CompetitiveDivisionFromJSON, CompetitiveDivisionFromJSONTyped, CompetitiveDivisionToJSON } from './CompetitiveDivision';

/**
 * Support role details
 * @export
 * @interface Support
 */
export interface Support {
	/**
	 *
	 * @type {CompetitiveDivision}
	 * @memberof Support
	 */
	division: CompetitiveDivision;
	/**
	 * Tier inside the division, lower is better
	 * @type {number}
	 * @memberof Support
	 */
	tier: number;
	/**
	 * URL the role icon
	 * @type {string}
	 * @memberof Support
	 */
	roleIcon: string;
	/**
	 * URL of the rank icon associated with the player rank (division + tier)
	 * @type {string}
	 * @memberof Support
	 */
	rankIcon: string;
}

/**
 * Check if a given object implements the Support interface.
 */
export function instanceOfSupport(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'division' in value;
	isInstance = isInstance && 'tier' in value;
	isInstance = isInstance && 'roleIcon' in value;
	isInstance = isInstance && 'rankIcon' in value;

	return isInstance;
}

export function SupportFromJSON(json: any): Support {
	return SupportFromJSONTyped(json, false);
}

export function SupportFromJSONTyped(json: any, ignoreDiscriminator: boolean): Support {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		division: CompetitiveDivisionFromJSON(json['division']),
		tier: json['tier'],
		roleIcon: json['role_icon'],
		rankIcon: json['rank_icon']
	};
}

export function SupportToJSON(value?: Support | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		division: CompetitiveDivisionToJSON(value.division),
		tier: value.tier,
		role_icon: value.roleIcon,
		rank_icon: value.rankIcon
	};
}
