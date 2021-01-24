import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "./app.css";
import Layout from './components/Layout';

 
const App = ({ title }) =>
<Layout>
<div id="mapid">
    <MapContainer center={[39.952414, -75.146301]} zoom={14}>
         <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         />
      </MapContainer>
  </div>
</Layout>

export default App;