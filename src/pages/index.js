import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import styles from "../styles/home.module.css";
export async function getStaticProps() {
  const url =
    "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Farmers_Markets/FeatureServer/0/query?outFields=*&geometryType=esriGeometryPoint&outSR=4326&where=1%3D1&f=json";

  const res = await fetch(url);
  const locations = await res.json();

  return {
    props: {
      markets: locations.features,
    },
    revalidate: 60, // Revalidate the page every 60 seconds
  };
}

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function Home({ markets }) {
  // console.log(markets);
  return (
    <main className={styles.main}>
      <MapWithNoSSR markets={markets} />
    </main>
  );
}
