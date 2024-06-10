import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import styles from "../styles/home.module.css";
import { mungeMarkets } from "../utils/munge.js";
import React, { useState, useEffect } from 'react';
import { isOpen } from '../utils/isOpen.js';

export async function getStaticProps() {
  const url =
    "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Farmers_Markets/FeatureServer/0/query?outFields=*&geometryType=esriGeometryPoint&outSR=4326&where=1%3D1&f=json";

  const res = await fetch(url, { cache: 'force-cache', next: { revalidate: 86400 } });
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

    if (query) {
      filteredMarkets = filteredMarkets.filter((market) => market.attributes.name == query);
    }

    // add more filters here

    setShownMarkets(filteredMarkets);
  }

  useEffect(() => {
    applyFilters();
  }, [isOpenFilter]);

  const handleInput = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    const filteredMarkets = ogMarkets.filter((market) =>
      market.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setShownMarkets(filteredMarkets);
  };

  return (
    <main className="w-fill h-screen flex flex-col items-center bg-[#FEF7F4]">
      <div className="flex flex-row w-full justify-between px-10">
        <Image
          src="/logoo.svg"
          alt="PhillyFarmersMarkets logo"
          width={300}
          height={10}
          priority
        />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            autoComplete="on"
            name="query"
            value={query}
            onChange={handleInput}
            placeholder="Search for market"
            className="block w-full p-2 pl-10 mt-6 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search.."
        />
      </div>
      <MapWithNoSSR markets={shownMarkets} />
    </main >
  );
}
