"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const Map = () => {
  return (
    <>
      <h2>Philly Farmers Markets</h2>
      <MapContainer
        center={[40.8054, -74.0241]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        mapbox://styles/rjmh/cknjodfve02vj17nxm4l7ozag
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/rjmh/ckkbqic0c4fzt17ntqcy6bc43/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        />
        <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
          <Popup>
            A pretty css popup <br /> Customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Map;
