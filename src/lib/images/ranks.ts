import sharp from 'sharp';
import type { PlayerSummary, SummaryCompetitivePlatform, SummaryCompetitiveRoleRank, SummaryCompetitiveRoleRankFull } from '../overfast';
import { getImage, getImageWithShadow, getURL } from './util';

const BADGE_SIZE = 200;
const ROLE_ICON_SIZE = 150;
const RANK_ICON_SIZE = 180;
const CARD_WIDTH = 1273;
const CARD_HEIGHT = 255;

export async function ranks(summary: PlayerSummary, platform: 'pc' | 'console') {
	let namecard;
	if (summary?.namecard) {
		namecard = getImage(summary.namecard);
	} else {
		namecard = sharp({
			create: {
				width: CARD_WIDTH,
				height: CARD_HEIGHT,
				channels: 4,
				background: '#28354F'
			}
		})
			.png()
			.toBuffer();
	}

	const badges = [getImageWithShadow(getImage(summary.endorsement.frame), BADGE_SIZE, BADGE_SIZE, 0.9)];

	if (summary?.competitive && Object.hasOwn(summary.competitive, platform)) {
		const competitiveRanks = summary.competitive[platform] as SummaryCompetitivePlatform;
		const rankBadges = Object.values(competitiveRanks)
			.filter((rank: SummaryCompetitiveRoleRankFull) => {
				return typeof rank === 'object' && rank?.roleIcon && rank?.rankIcon;
			})
			.map(async (rank: SummaryCompetitiveRoleRank) => {
				const roleIconBuffer = getImage(rank.roleIcon);
				const roleIcon = getImageWithShadow(roleIconBuffer, ROLE_ICON_SIZE, ROLE_ICON_SIZE, 0.9);
				const rankIconBuffer = getImage(rank.rankIcon);
				const rankIcon = getImageWithShadow(rankIconBuffer, RANK_ICON_SIZE, RANK_ICON_SIZE, 0.9);

				return await sharp({
					create: {
						height: BADGE_SIZE,
						width: BADGE_SIZE,
						channels: 4,
						background: { r: 0, g: 0, b: 0, alpha: 0 }
					}
				})
					.composite([
						{ input: await roleIcon, gravity: 'northwest' },
						{ input: await rankIcon, gravity: 'southeast' }
					])
					.png()
					.toBuffer();
			});
		badges.push(...rankBadges);
	}

	const left = Math.round(1273 / badges.length);
	const offset = (left - BADGE_SIZE) / 2;
	const top = Math.round((CARD_HEIGHT - BADGE_SIZE) / 2);
	const wip = sharp(await namecard) //
		.composite((await Promise.all(badges)).map((badge, index) => ({ input: badge, left: Math.round(offset + left * index), top })));

	return getURL(await wip.png().toBuffer());
}
