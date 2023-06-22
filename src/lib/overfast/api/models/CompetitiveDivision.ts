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

/**
 * Competitive division of a rank
 * @export
 */
export const CompetitiveDivision = {
	Bronze: 'bronze',
	Silver: 'silver',
	Gold: 'gold',
	Platinum: 'platinum',
	Diamond: 'diamond',
	Master: 'master',
	Grandmaster: 'grandmaster'
} as const;
export type CompetitiveDivision = (typeof CompetitiveDivision)[keyof typeof CompetitiveDivision];

export function CompetitiveDivisionFromJSON(json: any): CompetitiveDivision {
	return CompetitiveDivisionFromJSONTyped(json, false);
}

export function CompetitiveDivisionFromJSONTyped(json: any, ignoreDiscriminator: boolean): CompetitiveDivision {
	return json as CompetitiveDivision;
}

export function CompetitiveDivisionToJSON(value?: CompetitiveDivision | null): any {
	return value as any;
}