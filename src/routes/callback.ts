import { readFileSync } from 'fs';
import { HttpCodes, methods, Route } from '@sapphire/plugin-api';
import { getAccessToken, getUserInfo } from '../lib/battlenet';
import { getProfile } from '../lib/overwatch';
import type { ApiRequest, ApiResponse } from '@sapphire/plugin-api';

export class BattlenetRoute extends Route {
	success: string;
	error: string;
	public constructor(context: Route.Context, options: Route.Options) {
		super(context, {
			...options,
			route: 'callback'
		});
		this.success = readFileSync('./src/routes/pages/callback.html', 'utf8');
		this.error = readFileSync('./src/routes/pages/error.html', 'utf8');
	}

	public async [methods.GET](request: ApiRequest, response: ApiResponse) {
		const code = request.query.code?.toString() || null;
		const connectToken = request.query.state?.toString() || null;
		if (!code || !connectToken) {
			return response.html(
				HttpCodes.BadRequest,
				this.error //
					.replaceAll('{{errorInformation}}', 'The authentication did not complete correctly')
			);
		}

		let battletag;
		try {
			const { access_token } = await getAccessToken(code);
			const userInfo = await getUserInfo(access_token);
			battletag = userInfo.battletag;
		} catch (error) {
			this.container.logger.error(error);
		}

		if (!battletag) {
			return response.html(
				HttpCodes.BadRequest,
				this.error //
					.replaceAll('{{errorInformation}}', 'An error occured while fetching your battletag')
			);
		}

		const user = await this.container.db.user
			.update({
				data: {
					battleTag: battletag,
					connectToken: null
				},
				where: {
					connectToken
				}
			})
			.catch(() => null);

		if (!user) {
			return response.html(
				HttpCodes.BadRequest,
				this.error //
					.replaceAll('{{errorInformation}}', 'The authentication did not complete correctly - maybe you used an expired connection link?')
			);
		}

		const discordUser = await this.container.client.users.fetch(user.id);
		const overwatchProfile = await getProfile(battletag, 'pc', 'us');

		return response.html(
			HttpCodes.OK,
			this.success //
				.replaceAll('{{battleTag}}', battletag)
				.replaceAll('{{username}}', discordUser.username)
				.replaceAll('{{discordAvatarURL}}', discordUser.displayAvatarURL())
				.replaceAll('{{overwatchAvatarURL}}', overwatchProfile.portrait)
		);
	}
}
