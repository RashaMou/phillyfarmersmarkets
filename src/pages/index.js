import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import styles from "../styles/home.module.css";
import { mungeMarkets } from "../utils/munge.js";
import React, { useState, useEffect } from 'react';
import { isOpen } from '../utils/isOpen.js';

export async function getStaticProps() {
  const url =
    "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Farmers_Markets/FeatureServer/0/query?outFields=*&geometryType=esriGeometryPoint&outSR=4326&where=1%3D1&f=json";

  const res = await fetch(url, { cache: 'force-cache', next: { revalidate: 86400 }});
  const locations = await res.json();
  const markets = mungeMarkets(locations.features);

  return {
    props: {
      markets: markets,
    },
    revalidate: 3600,
  };
}

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function Home({ markets }) {
  const [ogMarkets, setOgMarkets] = useState(markets);
  const [shownMarkets, setShownMarkets] = useState(markets);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const applyFilters = () => {
    let filteredMarkets = ogMarkets;

    if (isOpenFilter) {
      filteredMarkets = filteredMarkets.filter((market) => isOpen(market.attributes));
    }

    // add more filters here

    setShownMarkets(filteredMarkets);
  }

  useEffect(() => {
    applyFilters();
  }, [isOpenFilter]);

  return (
    <main className={styles.main}>
      <h2>Philly Farmers Markets</h2>
      <div>
        <h3>Filters</h3>
        <div>
          <label>
            Open today
          </label>
          <input
            type='checkbox'
            checked={isOpenFilter}
            onChange={(e) => setIsOpenFilter(e.target.checked)}
          />
        </div>
      </div>
      <MapWithNoSSR markets={shownMarkets} />
    </main>
  );
}
