import { methods, Route } from '@sapphire/plugin-api';
import type { ApiRequest, ApiResponse } from '@sapphire/plugin-api';

export class ContactRoute extends Route {
	public constructor(context: Route.Context, options: Route.Options) {
		super(context, {
			...options,
			route: 'contact'
		});
	}

	public [methods.GET](_request: ApiRequest, response: ApiResponse) {
		return response.writeHead(302, { Location: 'mailto:dev@jeschek.eu' }).end();
	}
}
