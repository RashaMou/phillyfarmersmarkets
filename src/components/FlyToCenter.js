import { useMap } from 'react-leaflet';

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
      className="absolute top-[10px] right-[10px] z-[9999] p-2 mr-10"
      onClick={flyToCenter}
    >
      <img src="aim.png" className="w-9" alt="center icon" />
    </button>
  );
};

export default FlyToCenter;
