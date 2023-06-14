import { PrismaClient } from '@prisma/client';
import { SapphireClient, container } from '@sapphire/framework';
import { GatewayIntentBits, ActivityType } from 'discord.js';
import type { SapphireClientOptions } from '@sapphire/framework';
import type { ServerOptions } from '@sapphire/plugin-api';
import type { ClientOptions } from 'discord.js';

const SAPPHIRE_OPTIONS: SapphireClientOptions & ServerOptions & ClientOptions = {
	intents: [GatewayIntentBits.Guilds],
	listenOptions: {
		port: parseInt(process.env.PORT || '4000') ?? 4000
	},
	presence: {
		activities: [{ name: 'Overwatch 2', type: ActivityType.Playing }]
	}
};

export class BobClient extends SapphireClient {
	public constructor() {
		super(SAPPHIRE_OPTIONS);
	}
	public override async login(token?: string) {
		container.db = new PrismaClient();
		// reset all connectTokens on startup
		if (process.env.NODE_ENV === 'production') {
			container.db.user.updateMany({
				data: {
					connectToken: null
				}
			});
		}

		return super.login(token);
	}
	public override destroy() {
		container.db.$disconnect();
		this.logger.info('Disconnected from database.');
		return super.destroy();
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		db: PrismaClient;
	}
}
