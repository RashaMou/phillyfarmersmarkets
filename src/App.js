import axios from "axios";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Layout from "./components/Layout";

const marketIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [45, 45],
});

const App = ({ title }) => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  useEffect(() => {
    const getMarkets = () => {
      axios({
        method: "post",
        url:
          "https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/Farmers_Markets/FeatureServer/0/query",
        data: qs.stringify({
          f: "json",
          where: "1=1",
          outSr: "4326",
          outFields: "*",
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then((res) => {
          setMarkets(res.data.features);
          console.log(res.data.features);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMarkets();
  }, []);

  return (
    <Layout markets={markets}>
      <div id="mapid">
        <MapContainer center={[39.952414, -75.146301]} zoom={12}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/rjmh/ckkbqic0c4fzt17ntqcy6bc43/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmptaCIsImEiOiJja2ticWgyYngwZWduMndwY2RjZmhtMjltIn0.QOeHWiCR4DqKvx-l5nzUvQ"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {markets.map((market, idx) => {
            return (
              <Marker
                position={[market.geometry.y, market.geometry.x]}
                key={idx}
                icon={marketIcon}
              >
                <Popup>
                  <div className="popup">
                    <h2 className="popup-title">{market.attributes.NAME}</h2>
                    <h3 className="popup-subtitle">Address</h3>
                    <p>{market.attributes.ADDRESS}</p>
                    <p>{market.attributes.ZIP}</p>
                    <h3 className="popup-subtitle">Neighborhood</h3>
                    <p>{market.attributes.NEIGHBORHOOD}</p>
                    <h3 className="popup-subtitle">Months Open</h3>
                    <p>{market.attributes.MONTHS}</p>
                    <h3 className="popup-subtitle">Day and time</h3>
                    <p>{market.attributes.DAY}</p>
                    <p>{market.attributes.TIME}</p>
                    {market.attributes.ACCEPT_FMNP === "Y" ||
                    market.attributes.ACCEPT_PHILLY_FOOD_BUCKS_ ||
                    market.attributes.ACCEPT_SNAP_ACCESS === "Y" ? (
                      <h3 className="popup-subtitle">Food Assistance</h3>
                    ) : null}
                    {market.attributes.ACCEPT_FMNP === "Y" && (
                      <p>Farmers Market Nutrition Program</p>
                    )}
                    {market.attributes.ACCEPT_PHILLY_FOOD_BUCKS_ === "Y" && (
                      <p>Philly Food Bucks</p>
                    )}
                    {market.attributes.ACCEPT_SNAP_ACCESS === "Y" && (
                      <p>SNAP</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </Layout>
  );
};
export default App;
