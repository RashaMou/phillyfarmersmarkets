import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { mungeMarkets } from "../utils/munge.js";
import { isOpen } from "../utils/isOpen.js";
import Open from "../components/Open.js";
import Image from "next/image.js";

export async function getStaticProps() {
  const url =
    "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Farmers_Markets/FeatureServer/0/query?outFields=*&geometryType=esriGeometryPoint&outSR=4326&where=1%3D1&f=json";

  const res = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 86400 },
  });
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
  const [query, setQuery] = useState("");

  const applyFilters = useCallback(() => {
    let filteredMarkets = ogMarkets;

    if (isOpenFilter) {
      filteredMarkets = filteredMarkets.filter((market) =>
        isOpen(market.attributes),
      );
    }

    if (query) {
      filteredMarkets = filteredMarkets.filter((market) =>
        market.attributes.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setShownMarkets(filteredMarkets);
  }, [ogMarkets, isOpenFilter, query]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleInput = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    const filteredMarkets = ogMarkets.filter((market) =>
      market.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setShownMarkets(filteredMarkets);
  };

  return (
    <main className="w-fill h-screen flex flex-col items-center bg-[#FEF7F4]">
      <div className="flex flex-col sm:flex-row w-full justify-between p-4 sm:px-10 bg-[#ffa500]">
        <div className="w-60 sm:w-72 h-[4rem] sm:h-24 relative sm:mb-4 self-center sm:self-start">
          <Image
            src="/logoo.svg"
            alt="PhillyFarmersMarkets logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <div className="absolute top-1.5 bottom-0 left-0 sm:bottom-8 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            autoComplete="on"
            name="query"
            value={query}
            onChange={handleInput}
            placeholder="Search for market"
            className="block w-full p-2 pl-10 mt-2 sm:mt-6 sm:text-sm text-xs text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="sm:hidden w-full mt-2">
          <Open
            isOpenFilter={isOpenFilter}
            setIsOpenFilter={setIsOpenFilter}
            compact={true}
          />
        </div>
      </div>
      <div className="hidden sm:block ps-10 w-full">
        <Open
          isOpenFilter={isOpenFilter}
          setIsOpenFilter={setIsOpenFilter}
          compact={false}
        />
      </div>
      <div className="w-full flex-grow">
        <MapWithNoSSR markets={shownMarkets} />
      </div>
    </main>
  );
}
