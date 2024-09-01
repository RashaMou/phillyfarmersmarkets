"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents, useMap } from "react-leaflet";
import { FlyToCenter } from './FlyToCenter.js';
import PopupData from "../components/PopupData.js";
import { useState } from "react";
import { Icon } from 'leaflet';

const Center = [40.0111, -75.165222];

function MapEventHandler({ onPopupClose }) {
  const map = useMap();
  useMapEvents({
    popupclose: () => {
      onPopupClose();
      map.panTo(Center)
    },
  });
}

const Map = ({ markets }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePopupClose = () => {
    setIsExpanded(false);
  }

  const url =
    "https://api.mapbox.com/styles/v1/rjmh/ckkbqic0c4fzt17ntqcy6bc43/tiles/256/{z}/{x}/{y}@2x?access_token=";


  const MarkerIcon = new Icon({
    iconUrl: 'marker.png',
    iconSize: [50, 50], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  })

  const bounds = markets.map(market => [market.geometry.y, market.geometry.x]);

  return (
    <>
      <MapContainer
        center={Center}
        zoom={12}
        zoomSnap={0.5}
        zoomControl={false}
        style={{ height: "100%", width: "100%", boxShadow: "0 -2px 5px #ccc" }}
        bounds={bounds}
      >
        <MapEventHandler onPopupClose={handlePopupClose} />
        <TileLayer url={`${url}${process.env.MAPBOX_ACCESS_TOKEN}`} />
        {markets.map((market) => {
          return (
            <Marker
              icon={MarkerIcon}
              key={market.attributes.objectid}
              position={[market.geometry.y, market.geometry.x]}
            >
              <Popup
                autopan={true}
                autoPanPadding={[50, 50]}
                onClose={() => console.log("closed closed")}>
                <PopupData
                  market={market.attributes}
                  coords={market.geometry}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setIsExpanded(!isExpanded)}
                />
              </Popup>
            </Marker>
          );
        })}
        <FlyToCenter center={Center} />
        <ZoomControl />
      </MapContainer>
    </>
  );
};

export default Map;
