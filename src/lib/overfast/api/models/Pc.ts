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
import type { Damage } from './Damage';
import { DamageFromJSON, DamageFromJSONTyped, DamageToJSON } from './Damage';
import type { Support } from './Support';
import { SupportFromJSON, SupportFromJSONTyped, SupportToJSON } from './Support';
import type { Tank } from './Tank';
import { TankFromJSON, TankFromJSONTyped, TankToJSON } from './Tank';

/**
 * Competitive ranks for PC and last season played on it. If the player doesn't play on this platform, it's null.
 * @export
 * @interface Pc
 */
export interface Pc {
	/**
	 * Last competitive season played by the player
	 * @type {number}
	 * @memberof Pc
	 */
	season?: number;
	/**
	 *
	 * @type {Tank}
	 * @memberof Pc
	 */
	tank?: Tank;
	/**
	 *
	 * @type {Damage}
	 * @memberof Pc
	 */
	damage?: Damage;
	/**
	 *
	 * @type {Support}
	 * @memberof Pc
	 */
	support?: Support;
}

/**
 * Check if a given object implements the Pc interface.
 */
export function instanceOfPc(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function PcFromJSON(json: any): Pc {
	return PcFromJSONTyped(json, false);
}

export function PcFromJSONTyped(json: any, ignoreDiscriminator: boolean): Pc {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		season: !exists(json, 'season') ? undefined : json['season'],
		tank: !exists(json, 'tank') ? undefined : TankFromJSON(json['tank']),
		damage: !exists(json, 'damage') ? undefined : DamageFromJSON(json['damage']),
		support: !exists(json, 'support') ? undefined : SupportFromJSON(json['support'])
	};
}

export function PcToJSON(value?: Pc | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		season: value.season,
		tank: TankToJSON(value.tank),
		damage: DamageToJSON(value.damage),
		support: SupportToJSON(value.support)
	};
}
