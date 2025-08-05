
import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapview.css";

import blueIcon from "../assets/markers/marker-icon-blue.png";
import greenIcon from "../assets/markers/marker-icon-green.png";
import goldIcon from "../assets/markers/marker-icon-gold.png";
import orangeIcon from "../assets/markers/marker-icon-orange.png";
import violetIcon from "../assets/markers/marker-icon-violet.png";
import redIcon from "../assets/markers/marker-icon-red.png";
import greyIcon from "../assets/markers/marker-icon-grey.png";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Legend from "./legend";

// Fix default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const defaultPosition = [22.9734, 78.6569]; // center of India

const iconMap = {
  Drinking: L.icon({
    iconUrl: blueIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Irrigation: L.icon({
    iconUrl: greenIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Washing: L.icon({
    iconUrl: goldIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Fishing: L.icon({
    iconUrl: orangeIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Recreation: L.icon({
    iconUrl: violetIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  "Not Suitable": L.icon({
    iconUrl: redIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Unknown: L.icon({
    iconUrl: greyIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};

const isValidCoordinates = (coords) =>
  Array.isArray(coords) &&
  coords.length === 2 &&
  typeof coords[0] === "number" &&
  typeof coords[1] === "number";

const FitBounds = ({ resources, selectedResource, filter }) => {
  const map = useMap();

  useEffect(() => {
    if ((filter||filter==="") && !selectedResource) {
      const bounds = L.latLngBounds(
        resources.map((res) => [
          res.geometry.coordinates[1],
          res.geometry.coordinates[0],
        ])
      );
      if (bounds.isValid()) {
        map.flyToBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [resources, filter, selectedResource, map]);

  return null;
};

const FlyToLocation = ({ coordinates, onFlyEnd }) => {
  const map = useMap();

  useEffect(() => {
    if (isValidCoordinates(coordinates)) {
      map.flyTo(coordinates, 17,{duration:3});
      map.once("moveend", () => {
        onFlyEnd();
      });
    }
  }, [coordinates, map, onFlyEnd]);

  return null;
};

const MapView = ({ resources, selectedResource, filter }) => {
const markerRef = useRef(null);

  const selectedCoords =
    selectedResource &&
    isValidCoordinates(selectedResource.geometry?.coordinates)
      ? [
          selectedResource.geometry.coordinates[1],
          selectedResource.geometry.coordinates[0],
        ]
      : defaultPosition;

  const mapZoom = selectedResource ? 13 : 5;

  const handleFlyEnd = () => {
   
      setTimeout(() => {
        if (markerRef.current) {
      markerRef.current.openPopup();}
      }, 100); 
    
  };

  return (
    <MapContainer
      center={selectedCoords}
      zoom={mapZoom}
      style={{ height: "100%", width: "100%" }}
    >
      <FitBounds
        resources={resources}
        selectedResource={selectedResource}
        filter={filter}
      />

      <TileLayer
        attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, Coded by  Arunima Saxena with &hearts; "
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {resources.map((res) => {
        if (!isValidCoordinates(res.geometry.coordinates)) {
          console.warn("Skipping resource due to invalid coordinates:", res);
          return null;
        }

        const [lng, lat] = res.geometry.coordinates;
        const coords = [lat, lng];
        const suitability = res.suitability || "Unknown";
        const markerIcon = iconMap[suitability] || iconMap["Unknown"];

        const cat_col = (res) => {
          if (res.suitability === "Drinking") return "#698fe0";
          else if (res.suitability === "Irrigation") return "#2aa869";
          else if (res.suitability === "Washing") return "#f5dd05";
          else if (res.suitability === "Not Suitable") return "#f05959";
          else if (res.suitability === "Recreation") return "#9557c2";
          else if (res.suitability === "Fishing") return "#eba236";
          else return "#8a8b91";
        };

        const isSelected =
          selectedResource && selectedResource._id === res._id;

        return (
          <Marker key={res._id} position={coords} icon={markerIcon}  ref={isSelected ? markerRef : null}>
            <Popup>
              <div>
                <div style={{ backgroundColor: cat_col(res) }}>
                  <h6>{res.name}</h6>
                </div>
                <p>{res.description}</p>
                <div className="detail-link">
                  <a href={`/find/${res._id}`}>View Details</a>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {selectedResource && (
        <FlyToLocation
          coordinates={[
            selectedResource.geometry.coordinates[1],
            selectedResource.geometry.coordinates[0],
          ]}
          onFlyEnd={handleFlyEnd}
        />
      )}

      <Legend />
    </MapContainer>
  );
};

export default MapView;

