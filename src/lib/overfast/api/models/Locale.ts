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
 * Locales supported by Blizzard
 * @export
 */
export const Locale = {
	DeDe: 'de-de',
	EnGb: 'en-gb',
	EnUs: 'en-us',
	EsEs: 'es-es',
	EsMx: 'es-mx',
	FrFr: 'fr-fr',
	ItIt: 'it-it',
	JaJp: 'ja-jp',
	KoKr: 'ko-kr',
	PlPl: 'pl-pl',
	PtBr: 'pt-br',
	RuRu: 'ru-ru',
	ZhTw: 'zh-tw'
} as const;
export type Locale = (typeof Locale)[keyof typeof Locale];

export function LocaleFromJSON(json: any): Locale {
	return LocaleFromJSONTyped(json, false);
}

export function LocaleFromJSONTyped(json: any, ignoreDiscriminator: boolean): Locale {
	return json as Locale;
}

export function LocaleToJSON(value?: Locale | null): any {
	return value as any;
}
