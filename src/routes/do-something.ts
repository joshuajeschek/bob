import { methods, Route, type ApiRequest, type ApiResponse } from '@sapphire/plugin-api';

export class DoSomethingRoute extends Route {
	public constructor(context: Route.Context, options: Route.Options) {
		super(context, {
			...options,
			route: 'do-something'
		});
	}

	public [methods.GET](_request: ApiRequest, response: ApiResponse) {
		response.json({ did: 'something' });
	}

	public [methods.POST](_request: ApiRequest, response: ApiResponse) {
		response.json({ did: 'something' });
	}
}
