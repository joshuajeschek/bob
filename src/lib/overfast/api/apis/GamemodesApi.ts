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

import * as runtime from '../runtime';
import type { BlizzardErrorMessage, GamemodeDetails, HTTPValidationError, InternalServerErrorMessage, Locale } from '../models';
import {
	BlizzardErrorMessageFromJSON,
	BlizzardErrorMessageToJSON,
	GamemodeDetailsFromJSON,
	GamemodeDetailsToJSON,
	HTTPValidationErrorFromJSON,
	HTTPValidationErrorToJSON,
	InternalServerErrorMessageFromJSON,
	InternalServerErrorMessageToJSON,
	LocaleFromJSON,
	LocaleToJSON
} from '../models';

export interface ListMapGamemodesGamemodesGetRequest {
	locale?: Locale;
}

/**
 *
 */
export class GamemodesApi extends runtime.BaseAPI {
	/**
	 * Get a list of Overwatch gamemodes : Assault, Escort, Hybrid, etc.<br />**Cache TTL : 1 day.**
	 * Get a list of gamemodes
	 */
	async listMapGamemodesGamemodesGetRaw(
		requestParameters: ListMapGamemodesGamemodesGetRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<GamemodeDetails>>> {
		const queryParameters: any = {};

		if (requestParameters.locale !== undefined) {
			queryParameters['locale'] = requestParameters.locale;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/gamemodes`,
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(GamemodeDetailsFromJSON));
	}

	/**
	 * Get a list of Overwatch gamemodes : Assault, Escort, Hybrid, etc.<br />**Cache TTL : 1 day.**
	 * Get a list of gamemodes
	 */
	async listMapGamemodesGamemodesGet(
		requestParameters: ListMapGamemodesGamemodesGetRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<GamemodeDetails>> {
		const response = await this.listMapGamemodesGamemodesGetRaw(requestParameters, initOverrides);
		return await response.value();
	}
}