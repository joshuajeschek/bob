import { PrismaClient } from '@prisma/client';
import { SapphireClient, container, type SapphireClientOptions } from '@sapphire/framework';
import type { ServerOptions } from '@sapphire/plugin-api';
import { GatewayIntentBits, type ClientOptions, ActivityType } from 'discord.js';

const OPTIONS: SapphireClientOptions & ServerOptions & ClientOptions = {
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
		super(OPTIONS);
	}
	public override async login(token?: string) {
		const prisma = new PrismaClient();
		container.db = prisma;
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
