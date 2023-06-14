import { randomBytes } from 'crypto';
import { container } from '@sapphire/framework';
import { TimerManager } from '@sapphire/timer-manager';

function newToken() {
	return randomBytes(32).toString('hex');
}

export async function createConnectToken(userId: string) {
	let connectToken = newToken();
	while (await container.db.user.findUnique({ where: { connectToken } })) {
		container.logger.info('Wow, we got a duplicate connectToken! Generating a new one...');
		connectToken = newToken();
	}
	await container.db.user.upsert({
		create: {
			id: userId,
			connectToken
		},
		update: {
			battleTag: null,
			connectToken
		},
		where: {
			id: userId
		}
	});
	return connectToken;
}

export function generateAuthURL(connectToken: string) {
	const authParams = new URLSearchParams({
		client_id: process.env.BATTLENET_ID,
		scope: 'openid',
		state: connectToken,
		redirect_uri: `${process.env.BASE_URL}/callback`,
		response_type: 'code'
	});
	return `https://us.battle.net/oauth/authorize?${authParams.toString()}`;
}

/**
 * Sets a timeout to remove the connectToken from the user's database entry.
 * @param connectToken The connectToken to remove.
 * @param delay The delay in milliseconds.
 * @returns The date when the connectToken will be removed.
 */
export function setTokenExpiration(connectToken: string, delay: number) {
	TimerManager.setTimeout(() => {
		container.db.user
			.update({
				data: {
					connectToken: null
				},
				where: {
					connectToken
				}
			})
			.catch(container.logger.error);
	}, delay);
	return new Date(Date.now() + delay);
}
