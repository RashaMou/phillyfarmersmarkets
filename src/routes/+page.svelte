<script>
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	let mapComponent;
	export let data;
	let markets = data.markets;

	let filters = [];

	const setFilter = (filter) => {
		filters = [...filters, filter];
	};

	$: filteredMarkets = markets.filter((market) => {
		return (
			(!filters.includes('ACCEPT_PHILLY_FOOD_BUCKS') ||
				(filters.includes('ACCEPT_PHILLY_FOOD_BUCKS') &&
					market.ACCEPT_PHILLY_FOOD_BUCKS == 'Yes')) &&
			(!filters.includes('ACCEPT_SNAP_ACCESS') ||
				(filters.includes('ACCEPT_SNAP_ACCESS') && market.ACCEPT_SNAP_ACCESS == 'Yes'))
		);
	});
	console.log('filteredMarkets', filteredMarkets);
	function onReady() {
		mapComponent.flyTo({ center: [-75.16586, 39.94833] });
	}
</script>

<div style="height:500px; width:700px">
	<Map
		accessToken={data.mapbox_api_key}
		bind:this={mapComponent}
		on:ready={onReady}
		style="mapbox://styles/mapbox/outdoors-v11"
		zoom="11"
	>
		{#each filteredMarkets as market}
			<Marker
				lat={market.Y}
				lng={market.X}
				color="red"
				label={market.NAME}
				popupClassName="class-name"
			/>
		{/each}
	</Map>
	<div>
		<button on:click={() => setFilter('ACCEPT_PHILLY_FOOD_BUCKS')}>food bucks</button>
		<button on:click={() => setFilter('ACCEPT_SNAP_ACCESS')}>snap</button>
	</div>
	{#each filteredMarkets as market}
		<div>
			<li>{market.NAME}</li>
			<li>Philly food bucks: {market.ACCEPT_PHILLY_FOOD_BUCKS}</li>
			<li>Snap: {market.ACCEPT_SNAP_ACCESS}</li>
		</div>
		<hr />
	{/each}
</div>
