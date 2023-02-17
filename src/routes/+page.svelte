<script>
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	let mapComponent;
	export let data;

	function onReady() {
		mapComponent.flyTo({ center: [-75.16586, 39.94833] });
	}
</script>

<div style="height:500px; width:700px">
	<Map accessToken={data.mapbox_api_key} bind:this={mapComponent} on:ready={onReady}>
		<Marker lat="-39.94833" lng="75.16586" label="Philly" />
	</Map>
</div>
