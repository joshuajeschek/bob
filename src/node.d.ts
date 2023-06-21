declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		readonly DISCORD_TOKEN: string;
		readonly DATABASE_URL: string;
		readonly BATTLENET_ID: string;
		readonly BATTLENET_SECRET: string;
		readonly BASE_URL: string;
		readonly IMAGE_CHANNEL_ID: string;
		readonly PORT?: string;
	}
}
