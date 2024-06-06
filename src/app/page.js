import dynamic from "next/dynamic";
import styles from "./page.module.css";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("./map"), { ssr: false });

  return (
    <main className={styles.main}>
      <MapWithNoSSR />
    </main>
  );
}
