import { error } from '@sveltejs/kit';
import { MAPBOX_API_KEY } from '$env/static/private';
import { getMarkets } from '$lib/data/markets';

export async function load() {
	const markets = await getMarkets();

	if (MAPBOX_API_KEY) {
		return {
			mapbox_api_key: MAPBOX_API_KEY,
			markets
		};
	}
	throw error(404, 'something went sideways');
}
