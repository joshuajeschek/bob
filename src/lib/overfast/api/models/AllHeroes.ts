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
import type { Assists } from './Assists';
import { AssistsFromJSON, AssistsFromJSONTyped, AssistsToJSON } from './Assists';

/**
 * Total of statistics for all heroes
 * @export
 * @interface AllHeroes
 */
export interface AllHeroes {
	/**
	 * Statistics for "Assists" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	assists?: { [key: string]: Assists };
	/**
	 * Statistics for "Average" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	average?: { [key: string]: Assists };
	/**
	 * Statistics for "Best" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	best?: { [key: string]: Assists };
	/**
	 * Statistics for "Combat" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	combat?: { [key: string]: Assists };
	/**
	 * Statistics for "Game" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	game?: { [key: string]: Assists };
	/**
	 * Statistics for "Hero Specific" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	heroSpecific?: { [key: string]: Assists };
	/**
	 * Statistics for "Match Awards" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	matchAwards?: { [key: string]: Assists };
	/**
	 * Statistics for "Miscellaneous" category
	 * @type {{ [key: string]: Assists; }}
	 * @memberof AllHeroes
	 */
	miscellaneous?: { [key: string]: Assists };
}

/**
 * Check if a given object implements the AllHeroes interface.
 */
export function instanceOfAllHeroes(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function AllHeroesFromJSON(json: any): AllHeroes {
	return AllHeroesFromJSONTyped(json, false);
}

export function AllHeroesFromJSONTyped(json: any, ignoreDiscriminator: boolean): AllHeroes {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		assists: !exists(json, 'assists') ? undefined : mapValues(json['assists'], AssistsFromJSON),
		average: !exists(json, 'average') ? undefined : mapValues(json['average'], AssistsFromJSON),
		best: !exists(json, 'best') ? undefined : mapValues(json['best'], AssistsFromJSON),
		combat: !exists(json, 'combat') ? undefined : mapValues(json['combat'], AssistsFromJSON),
		game: !exists(json, 'game') ? undefined : mapValues(json['game'], AssistsFromJSON),
		heroSpecific: !exists(json, 'hero_specific') ? undefined : mapValues(json['hero_specific'], AssistsFromJSON),
		matchAwards: !exists(json, 'match_awards') ? undefined : mapValues(json['match_awards'], AssistsFromJSON),
		miscellaneous: !exists(json, 'miscellaneous') ? undefined : mapValues(json['miscellaneous'], AssistsFromJSON)
	};
}

export function AllHeroesToJSON(value?: AllHeroes | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		assists: value.assists === undefined ? undefined : mapValues(value.assists, AssistsToJSON),
		average: value.average === undefined ? undefined : mapValues(value.average, AssistsToJSON),
		best: value.best === undefined ? undefined : mapValues(value.best, AssistsToJSON),
		combat: value.combat === undefined ? undefined : mapValues(value.combat, AssistsToJSON),
		game: value.game === undefined ? undefined : mapValues(value.game, AssistsToJSON),
		hero_specific: value.heroSpecific === undefined ? undefined : mapValues(value.heroSpecific, AssistsToJSON),
		match_awards: value.matchAwards === undefined ? undefined : mapValues(value.matchAwards, AssistsToJSON),
		miscellaneous: value.miscellaneous === undefined ? undefined : mapValues(value.miscellaneous, AssistsToJSON)
	};
}
