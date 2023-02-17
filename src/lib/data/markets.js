import qs from 'qs';
import axios from 'axios';

export async function getMarkets() {
	const res = await fetch(
		'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Farmers_Markets/FeatureServer/0/query?outFields=*&where=1%3D1&f=json',
		{ method: 'post' }
	);
	const json = await res.json();
	const markets = json.features;
	return markets;
}
