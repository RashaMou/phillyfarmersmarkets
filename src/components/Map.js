"use client";
import { useState, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FlyToCenter } from './FlyToCenter.js';

const Map = ({ markets }) => {
  const url =
    "https://api.mapbox.com/styles/v1/rjmh/clxausug304gz01qm18i7c0la/tiles/256/{z}/{x}/{y}@2x?access_token=";

  const center = [39.992583, -75.165222];

  // uncomment once Clark Park Market coordinates are fixed
  // const bounds = [];
  // for (const market of markets) {
  //   for (const key in market.geometry) {
  //     if (market.attributes.name == "Clark Park Farmers Market") {
  //       continue;
  //     }
  //     bounds.push([market.geometry.y, market.geometry.x])
  //   }
  // }
  return (
    <>
      <MapContainer
        center={center}
        zoom={12.25}
        zoomSnap={0.25}
        style={{ height: "90%", width: "100%" }}
        // bounds={bounds}
        // maxBounds={bounds}
        // boundsOptions={{padding: [300, 100]}}
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
        <FlyToCenter center={center} />
      </MapContainer>
    </>
  );
};

export default Map;
