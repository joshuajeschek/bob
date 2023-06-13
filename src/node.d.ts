declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		readonly DISCORD_TOKEN: string;
		readonly DATABASE_URL: string;
		readonly PORT?: string;
	}
}
