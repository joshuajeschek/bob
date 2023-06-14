import type { Platform, Region } from '@prisma/client';
// CommonJS import
import * as api from 'overwatch-api';
import { promisify } from 'util';

function sanitizeBattleTag(battleTag: string) {
	const arr = battleTag.split('');
	const lastHash = arr.lastIndexOf('#');
	if (lastHash !== -1) {
		arr[lastHash] = '-';
	}
	return arr.join('');
}

/**
 * Gets the profile of a user.
 * @param battleTag The battle tag of the user.
 * @param platform The platform of the user.
 * @param region The region of the user.
 * @returns The profile of the user.
 */
export function getProfile(battleTag: string, platform?: Platform, region?: Region) {
	platform ??= 'pc';
	region ??= 'us';
	return promisify(api.getProfile)(platform, region, sanitizeBattleTag(battleTag));
}

/**
 * Gets the stats of a user.
 * @param battleTag The battle tag of the user.
 * @param platform The platform of the user.
 * @param region The region of the user.
 * @returns The stats of the user.
 */
export function getStats(battleTag: string, platform?: Platform, region?: Region) {
	platform ??= 'pc';
	region ??= 'us';
	return promisify(api.getStats)(platform, region, sanitizeBattleTag(battleTag));
}
