import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const FlyToBounds = ({ resources, selectedLocation, radiusKm }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !resources || resources.length === 0 || !selectedLocation) return;

    try {
      const bounds = new L.LatLngBounds(
        resources.map((res) => [
          res.geometry.coordinates[1],
          res.geometry.coordinates[0],
        ])
      );

      bounds.extend([selectedLocation.lat, selectedLocation.lng]);

      // Only zoom out if bounds are not completely in view
      if (!map.getBounds().contains(bounds)) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error("FlyToBounds error:", error);
    }
  }, [resources, selectedLocation, radiusKm, map]);

  return null;
};

export default FlyToBounds;
