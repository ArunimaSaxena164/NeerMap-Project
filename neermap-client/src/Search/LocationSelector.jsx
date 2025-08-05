import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import blackIcon from "../assets/markers/marker-icon-black.png";
import "leaflet/dist/leaflet.css";
import {useTranslation} from "react-i18next";
import L from "leaflet";
import "./LocationSelector.css";
// Fix default icon issue in some setups
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
const customMarker = new L.Icon({
  iconUrl: blackIcon, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
 
});

const LocationSelector = ({ useGPS, setUseGPS, location, setLocation }) => {
  const {t}=useTranslation();
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <div className="my-4 mx-4 space-y-4">
      <div style={{ textAlign: "center" }}>
        <label className="labelcustom">
          <input
            type="radio"
            checked={useGPS}
            onChange={() => setUseGPS(true)}
          />{" "}
          &nbsp;{t("myloc")}
        </label>{" "}
        &nbsp; &nbsp;
        <label className="ml-4 labelcustom">
          <input
            type="radio"
            checked={!useGPS}
            onChange={() => setUseGPS(false)}
          />{" "}
          &nbsp;{t("locman")}
        </label>
      </div>
      <br />
      <br />
      {!useGPS && (
        <>
          <div className="map-wrapper">
            <MapContainer
              center={location ? [location.lat, location.lng] : [20.59, 78.96]}
              zoom={location ? 13 : 5}
              style={{ height: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapClickHandler />
              {location && (
                <Marker
                  position={[location.lat, location.lng]}
                  icon={customMarker}
                />
              )}
            </MapContainer>
          </div>
          <br />
          {location && (
            <div
              className="text-sm mt-2  labelcustom"
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              {t("selcoord")}
              <span className="font-mono text-blue-700">
                ({location.lat.toFixed(5)}, {location.lng.toFixed(5)})
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSelector;
