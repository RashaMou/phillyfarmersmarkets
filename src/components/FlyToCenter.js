import { useMap } from "react-leaflet";
import Image from "next/image";

export const FlyToCenter = ({ center }) => {
  const map = useMap();

  const flyToCenter = () => {
    map.flyTo(center, 12, {
      animate: true,
      duration: 0.75,
    });
  };

  return (
    <button
      type="button"
      className="absolute top-[10px] right-[10px] sm:right-[60px] z-[9999] p-2"
      onClick={flyToCenter}
    >
      <Image src="/aim.png" width={36} height={36} alt="center icon" />
    </button>
  );
};

export default FlyToCenter;
