"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ markets }) => {
  const url =
    "https://api.mapbox.com/styles/v1/rjmh/ckkbqic0c4fzt17ntqcy6bc43/tiles/256/{z}/{x}/{y}@2x?access_token=";
  return (
    <>
      <h2>Philly Farmers Markets</h2>
      <MapContainer
        center={[39.952583, -75.165222]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={`${url}${process.env.MAPBOX_ACCESS_TOKEN}`} />
        {markets.map((market) => {
          return (
            <Marker
              key={market.attributes.objectid}
              position={[market.geometry.y, market.geometry.x]}
            >
              <Popup>{market.attributes.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default Map;
