import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { toast } from "react-toastify";
import { toastErrorOptions } from "../toastUtils";
import {useTranslation} from "react-i18next";
import "./MapPicker.css";
// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Bounding box for India (approx): [south, west, north, east]
const INDIA_BOUNDS = {
  south: 6.5,
  west: 68.0,
  north: 37.5,
  east: 97.5,
};

const isWithinIndia = (lat, lng) => {
  return (
    lat >= INDIA_BOUNDS.south &&
    lat <= INDIA_BOUNDS.north &&
    lng >= INDIA_BOUNDS.west &&
    lng <= INDIA_BOUNDS.east
  );
};

const LocationMarker = ({ setLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const map = useMap();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (!isWithinIndia(lat, lng)) {
 toast.error("Please select a location within India", toastErrorOptions);
        return;
      }

      setMarkerPosition([lat, lng]);
      setLocation({ lat, lng });

      // Zoom into selected point
      map.flyTo([lat, lng], 15);
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
};

const MapPicker = ({ location, setLocation }) => {
  const {t}=useTranslation();
  const defaultCenter = [20.5937, 78.9629]; // India center

  const center = location ? [location.lat, location.lng] : defaultCenter;
  const zoom = location ? 15 : 5;

  return (
    <div className="map-label">
      <label >{t("selmap")}</label>
      <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={zoom}
       style={{ height: "500px", width: "100%" }}

        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker setLocation={setLocation} />
        {location && <Marker position={[location.lat, location.lng]} />}
      </MapContainer>
</div>
      {location ? (
        <p className="map-instruct">
         {t("selcoord")}
          <strong>
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </strong>
        </p>
      ) : (
        <p className="map-instruct">
          {t("pleaseloc")}
        </p>
      )}
    </div>
  );
};

export default MapPicker;
