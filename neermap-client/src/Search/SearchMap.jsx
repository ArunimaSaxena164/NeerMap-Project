import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L, { marker } from "leaflet";
import redicon from "../assets/markers/marker-icon-red.png";
import blackicon from "../assets/markers/marker-icon-black.png";
import violeticon from "../assets/markers/marker-icon-violet.png";
import blueicon from "../assets/markers/marker-icon-blue.png";
import greenicon from "../assets/markers/marker-icon-green.png";
import goldicon from "../assets/markers/marker-icon-gold.png";
import orangeicon from "../assets/markers/marker-icon-orange.png";
import greyicon from "../assets/markers/marker-icon-grey.png";
import FlyToBounds from "./FlyToBound";
import "./SearchMap.css";
import Legend from "../Explore/legend.jsx";
// Custom red marker icon

const Iconloc=new L.Icon({
  iconUrl:blackicon,
  iconSize:[25,41],
  iconAnchor:[12,41],
  popupAnchor:[1,-34],
});
const iconDrinking = new L.Icon({ iconUrl: blueicon, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
const iconIrrigation = new L.Icon({ iconUrl: greenicon, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
const iconWashing = new L.Icon({ iconUrl: goldicon, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
const iconNotSuitable = new L.Icon({ iconUrl: redicon, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
const iconRecreation = new L.Icon({ iconUrl: violeticon, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
const iconFishing = new L.Icon({ iconUrl: orangeicon, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
const iconUnknown = new L.Icon({ iconUrl: greyicon, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });

const FlyToLocation = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 13, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [center, map]);

  return null;
};
const getIconForSuitability = (suitability) => {
  switch (suitability) {
    case "Drinking":
      return iconDrinking;
    case "Irrigation":
      return iconIrrigation;
    case "Washing":
      return iconWashing;
    case "Not Suitable":
      return iconNotSuitable;
    case "Recreation":
      return iconRecreation;
    case "Fishing":
      return iconFishing;
    default:
      return iconUnknown;
  }
};

const SearchMap = ({ center, resources, radius }) => {
  const [selectedLocation, setSelectedLocation] = useState(center); 
  const [radiusKm, setRadiusKm] = useState(radius); 
const cat_col = (res) => {
          if (res.suitability === "Drinking") return "#698fe0";
          else if (res.suitability === "Irrigation") return "#2aa869";
          else if (res.suitability === "Washing") return "#f5dd05";
          else if (res.suitability === "Not Suitable") return "#f05959";
          else if (res.suitability === "Recreation") return "#9557c2";
          else if (res.suitability === "Fishing") return "#eba236";
          else return "#8a8b91";
        };
  return (
    <div className="mapwrapper" style={{marginTop:"100px"}}><MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: "100%", }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>

      <FlyToLocation center={center} />

      <Circle
        center={[center.lat, center.lng]}
        radius={radius * 1000}
        pathOptions={{ color: "#032e56",fillOpacity:"0.1",opacity:"0.7" }}
      />

      {/* Selected location marker (center) */}
      <Marker position={[center.lat, center.lng]} icon={Iconloc}>
        
         <Popup>
              <div>
                <div style={{ backgroundColor: "black" }}>
                  <h6>Selected Location</h6>
                </div>
                <p>  Lat: {center.lat.toFixed(4)}, Lng: {center.lng.toFixed(4)}</p>
              </div>
            </Popup>
      </Marker>

      {/* Resource markers */}
      {resources.map((res) => (
        <Marker
          key={res._id}
          position={[res.geometry.coordinates[1], res.geometry.coordinates[0]]}
          icon={getIconForSuitability(res.suitability)}
        >
          
         
           <Popup>
              <div>
                <div style={{ backgroundColor: cat_col(res) }}>
                  <h6>{res.name}</h6>
                </div>
                <p>{res.description}</p>
              </div>
            </Popup>
        </Marker>
      ))}

      {/* Automatically zoom out to fit all resources and the selected location */}
      <FlyToBounds
        resources={resources}
        selectedLocation={selectedLocation}
        radiusKm={radiusKm}
      />
       <Legend />
    </MapContainer></div>
    
  );
};

export default SearchMap;
