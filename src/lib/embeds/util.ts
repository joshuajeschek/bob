import memoizee from 'memoizee';
import Vibrant from 'node-vibrant';

async function getAccentColorFromURL(url: string) {
	const palette = await Vibrant.from(url)
		.getPalette()
		.catch(() => null);
	if (!palette) return null;
	return palette.Vibrant?.hex ? parseInt(palette.Vibrant?.hex.replaceAll(/[^0-9a-fA-f]/g, ''), 16) : null;
}

export const getAccentColor = memoizee(getAccentColorFromURL);
