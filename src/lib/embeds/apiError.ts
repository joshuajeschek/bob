import { EmbedBuilder } from 'discord.js';
import type { ResponseError } from '../overfast';

export default async function (error: ResponseError) {
	const reason = await error.response.json().then((json) => json?.error);
	const title = `${error.response.status} - ${reason ? reason : 'An error occured'}`;
	const status = error.response.status;
	const description = status === 404 ? 'Please check your input' : 'Please try again later';
	return new EmbedBuilder() //
		.setTitle(title)
		.setDescription(description)
		.setThumbnail(`https://http.cat/${error.response.status}`);
}
