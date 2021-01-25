import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import "./app.css";
import Layout from './components/Layout';


 
const App = ({ title }) => {

  const [markets, setMarkets] = useState([])

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
      iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
      shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' ),
    });
  }, []);

  useEffect(() => {
    const getMarkets = () => {
      axios({
        method: 'post',
        url:
          'https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/Farmers_Markets/FeatureServer/0/query',
        data: qs.stringify({
          f: 'json',
          where: '1=1',
          outSr: '4326',
          outFields: '*'
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then(res => {
          setMarkets(res.data.features)

        })
        .catch(err => {
          console.log(err);
        });
    };

    getMarkets()
  }, [])

  function MyComponent() {
    const map = useMapEvent('click', () => {
      map.setCenter([50.5, 30.5])
    })
    return null
  }

return (
<Layout>
<div id="mapid" >
    <MapContainer   center={[39.952414, -75.146301]} zoom={14}>
    <MyComponent />
         <TileLayer
            url="https://api.mapbox.com/styles/v1/rjmh/ckkbqic0c4fzt17ntqcy6bc43/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmptaCIsImEiOiJja2ticWgyYngwZWduMndwY2RjZmhtMjltIn0.QOeHWiCR4DqKvx-l5nzUvQ"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery © <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
         />
         <Marker position={[39.952335, -75.1635112]} >
         <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
         </Marker>
      </MapContainer>
  </div>
</Layout>
)
}
export default App;