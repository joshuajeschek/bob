import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { HttpCodes, methods, MimeTypes, Route } from '@sapphire/plugin-api';
import type { ApiRequest, ApiResponse } from '@sapphire/plugin-api';
import { readFileSync } from 'fs';

export class ConnectRoute extends Route {
	favicon: Buffer;
	public constructor(context: Route.Context, options: Route.Options) {
		super(context, {
			...options,
			route: 'favicon.ico'
		});
		this.favicon = readFileSync('./src/routes/pages/favicon.ico');
	}

	public async [methods.GET](_request: ApiRequest, response: ApiResponse) {
		const displayAvatarURL = this.container.client.user?.displayAvatarURL();
		if (displayAvatarURL) {
			this.favicon = await fetch(displayAvatarURL, FetchResultTypes.Buffer);
		}
		return response //
			.setContentType(MimeTypes.ImageXIcon)
			.status(HttpCodes.OK)
			.end(this.favicon);
	}
}
