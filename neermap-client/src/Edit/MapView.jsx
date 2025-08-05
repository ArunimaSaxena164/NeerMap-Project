import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react"; 
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
// Dynamically sets map center when markerPosition changes
const SetMapCenter = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return null;
};

// Handles user click on the map
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e);
      }
    },
  });
  return null;
};

const MapView = ({ markerPosition, onMapClick }) => {
  const defaultPosition = markerPosition || { lat: 20.5937, lng: 78.9629 };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markerPosition && (
        <Marker
          position={markerPosition}
          icon={L.icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />
      )}

      {/* Center the map when markerPosition changes */}
      <SetMapCenter position={markerPosition} />

      {/* Handle user click to update coordinates */}
      {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
    </MapContainer>
  );
};

export default MapView;
