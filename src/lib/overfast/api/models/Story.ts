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
import type { Media1 } from './Media1';
import { Media1FromJSON, Media1FromJSONTyped, Media1ToJSON } from './Media1';
import type { StoryChapter } from './StoryChapter';
import { StoryChapterFromJSON, StoryChapterFromJSONTyped, StoryChapterToJSON } from './StoryChapter';

/**
 *
 * @export
 * @interface Story
 */
export interface Story {
	/**
	 * Brief summary of the origin story of the hero
	 * @type {string}
	 * @memberof Story
	 */
	summary: string;
	/**
	 *
	 * @type {Media1}
	 * @memberof Story
	 */
	media?: Media1;
	/**
	 * List of chapters concerning the story of the hero
	 * @type {Array<StoryChapter>}
	 * @memberof Story
	 */
	chapters: Array<StoryChapter>;
}

/**
 * Check if a given object implements the Story interface.
 */
export function instanceOfStory(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'summary' in value;
	isInstance = isInstance && 'chapters' in value;

	return isInstance;
}

export function StoryFromJSON(json: any): Story {
	return StoryFromJSONTyped(json, false);
}

export function StoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Story {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		summary: json['summary'],
		media: !exists(json, 'media') ? undefined : Media1FromJSON(json['media']),
		chapters: (json['chapters'] as Array<any>).map(StoryChapterFromJSON)
	};
}

export function StoryToJSON(value?: Story | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		summary: value.summary,
		media: Media1ToJSON(value.media),
		chapters: (value.chapters as Array<any>).map(StoryChapterToJSON)
	};
}