import { FetchResultTypes, fetch } from '@sapphire/fetch';

interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
	sub: string;
	id_token: string;
}

interface UserInfoResponse {
	battletag: string;
	sub: string;
	id: number;
}

function battleNetURL(endpoint: string, params?: URLSearchParams) {
	if (!params) {
		return new URL(`https://oauth.battle.net/${endpoint}`);
	}
	return new URL(`https://oauth.battle.net/${endpoint}?${params}`);
}

/**
 * Gets the access token from the Battle.net API.
 * @param code The code to use.
 * @returns The access token.
 */
export function getAccessToken(code: string) {
	const accessParams = new URLSearchParams({
		grant_type: 'authorization_code',
		redirect_uri: `${process.env.BASE_URL}/callback`,
		code
	});
	return fetch<TokenResponse>(
		battleNetURL('token', accessParams),
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${Buffer.from(`${process.env.BATTLENET_ID}:${process.env.BATTLENET_SECRET}`).toString('base64')}`
			}
		},
		FetchResultTypes.JSON
	);
}

/**
 * Gets the user's information from the Battle.net API.
 * @param accessToken The access token to use.
 * @returns The user's information.
 */
export function getUserInfo(accessToken: string) {
	return fetch<UserInfoResponse>(
		battleNetURL('userinfo'),
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		},
		FetchResultTypes.JSON
	);
}
