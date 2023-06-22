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
import type { Ability } from './Ability';
import { AbilityFromJSON, AbilityFromJSONTyped, AbilityToJSON } from './Ability';
import type { Hitpoints } from './Hitpoints';
import { HitpointsFromJSON, HitpointsFromJSONTyped, HitpointsToJSON } from './Hitpoints';
import type { Role } from './Role';
import { RoleFromJSON, RoleFromJSONTyped, RoleToJSON } from './Role';
import type { Story1 } from './Story1';
import { Story1FromJSON, Story1FromJSONTyped, Story1ToJSON } from './Story1';

/**
 *
 * @export
 * @interface Hero
 */
export interface Hero {
	/**
	 * Name of the hero
	 * @type {string}
	 * @memberof Hero
	 */
	name: string;
	/**
	 * Short description of the hero
	 * @type {string}
	 * @memberof Hero
	 */
	description: string;
	/**
	 * Portrait picture URL of the hero
	 * @type {string}
	 * @memberof Hero
	 */
	portrait?: string;
	/**
	 *
	 * @type {Role}
	 * @memberof Hero
	 */
	role: Role;
	/**
	 * Location of the hero
	 * @type {string}
	 * @memberof Hero
	 */
	location: string;
	/**
	 *
	 * @type {Hitpoints}
	 * @memberof Hero
	 */
	hitpoints?: Hitpoints;
	/**
	 * List of hero abilities
	 * @type {Array<Ability>}
	 * @memberof Hero
	 */
	abilities: Array<Ability>;
	/**
	 *
	 * @type {Story1}
	 * @memberof Hero
	 */
	story: Story1;
}

/**
 * Check if a given object implements the Hero interface.
 */
export function instanceOfHero(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'name' in value;
	isInstance = isInstance && 'description' in value;
	isInstance = isInstance && 'role' in value;
	isInstance = isInstance && 'location' in value;
	isInstance = isInstance && 'abilities' in value;
	isInstance = isInstance && 'story' in value;

	return isInstance;
}

export function HeroFromJSON(json: any): Hero {
	return HeroFromJSONTyped(json, false);
}

export function HeroFromJSONTyped(json: any, ignoreDiscriminator: boolean): Hero {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		name: json['name'],
		description: json['description'],
		portrait: !exists(json, 'portrait') ? undefined : json['portrait'],
		role: RoleFromJSON(json['role']),
		location: json['location'],
		hitpoints: !exists(json, 'hitpoints') ? undefined : HitpointsFromJSON(json['hitpoints']),
		abilities: (json['abilities'] as Array<any>).map(AbilityFromJSON),
		story: Story1FromJSON(json['story'])
	};
}

export function HeroToJSON(value?: Hero | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		name: value.name,
		description: value.description,
		portrait: value.portrait,
		role: RoleToJSON(value.role),
		location: value.location,
		hitpoints: HitpointsToJSON(value.hitpoints),
		abilities: (value.abilities as Array<any>).map(AbilityToJSON),
		story: Story1ToJSON(value.story)
	};
}