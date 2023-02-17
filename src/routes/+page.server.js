import { error } from '@sveltejs/kit';
import { MAPBOX_API_KEY } from '$env/static/private';

export async function load() {
	if (MAPBOX_API_KEY) {
		console.log('from server:', MAPBOX_API_KEY);
		return {
			mapbox_api_key: MAPBOX_API_KEY
		};
	}
	throw error(404, 'something went sideways');
}
