import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { container } from '@sapphire/framework';
import memoizee from 'memoizee';
import sharp from 'sharp';

export const getImage = memoizee((url: string) => fetch(url, FetchResultTypes.Buffer));

export async function getURL(buffer: Buffer) {
	const message = await container.imageChannel.send({ files: [buffer] });
	return message.attachments.first()!.url;
}

export function blackenImage(image: Buffer) {
	for (let i = 0; i < image.length; i += 4) {
		const ALPHA = i + 3;
		const RED = i;
		const GREEN = i + 1;
		const BLUE = i + 2;
		if (image[ALPHA] !== 0) {
			image[RED] = 0;
			image[GREEN] = 0;
			image[BLUE] = 0;
		}
	}
}

export async function getImageWithShadow(image: Buffer | Promise<Buffer>, width: number, height: number, scale: number) {
	const foreground = sharp(await image) //
		.resize(width * scale, height * scale, { fit: sharp.fit.inside })
		.png()
		.toBuffer();
	const raw = await sharp(await image)
		.raw()
		.toBuffer({ resolveWithObject: true });

	blackenImage(raw.data);
	const background = await sharp(raw.data, { raw: { width: raw.info.width, height: raw.info.height, channels: 4 } }) //
		.resize(width * scale, height * scale, { fit: sharp.fit.inside })
		.png()
		.toBuffer();

	const shadow = await sharp({
		create: { height, width, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
	})
		.composite([{ input: background, gravity: sharp.gravity.center }])
		.png()
		.toBuffer();

	return sharp(shadow) //
		.blur(10)
		.composite([{ input: await foreground, gravity: sharp.gravity.center }])
		.png()
		.toBuffer();
}
