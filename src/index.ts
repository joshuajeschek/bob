import './lib/setup';
import { BobClient } from './BobClient';

const client = new BobClient();

(async () => {
	try {
		client.logger.info('Logging in...');
		await client.login(process.env.DISCORD_TOKEN);
		client.logger.info('Successfully logged in.');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
})();
