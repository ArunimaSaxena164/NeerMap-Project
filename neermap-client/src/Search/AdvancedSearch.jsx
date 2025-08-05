import React, { useEffect, useState ,useRef} from "react";
import LocationSelector from "./LocationSelector";
import FilterPanel from "./FilterPanel";
import SearchMap from "./SearchMap";
import ResourceList from "./ResourceList";
import {useTranslation} from "react-i18next";
import { toast } from "react-toastify";
import { toastErrorOptions, toastSuccessOptions } from "../toastUtils.js";
import API from "../api.js";

const AdvancedSearch = () => {
  const {t}=useTranslation();
  const [useGPS, setUseGPS] = useState(true);
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const [suitability, setSuitability] = useState([]);
  const [nature, setNature] = useState([]);
  const [type, setType] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [resources, setResources] = useState([]);

  const locationErrorShown = useRef(false); 

  useEffect(() => {
    if (useGPS) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          console.log("Accurate location fetched:", pos.coords);
          console.log("Accuracy:", pos.coords.accuracy, "meters");
          locationErrorShown.current = false; // reset if successful
        },
        (err) => {
          console.error("Geolocation error:", err);
          if (!locationErrorShown.current) {
            toast.error("Failed to get current location. Turn on location or select manually.", toastErrorOptions);
            locationErrorShown.current = true;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, [useGPS]);
  const handleSearch = async () => {
    if (!location) {
      toast.error("Location is not set.",toastErrorOptions);
      return;
    }

    try {
      const params = {
        latitude: location.lat,
        longitude: location.lng,
        radiusKm: radius,
        suitability: suitability.join(","),
        nature: nature.join(","),
        type: type.join(","),
        minRating, 
      };

      const response = await API.get("/api/searchres/nearby", {
        params,
        withCredentials: true,
      });
      toast.success(`${response.data.length} Resource(s) found`,toastSuccessOptions);
      console.log("Resources found:", response.data);
      setResources(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="p-4">
      <h2
        style={{
          color: "#032e56",
          fontWeight: "700",
          textAlign: "center",
          marginTop: "40px",
          fontSize: "2.1em",
          marginBottom: "50px",
          opacity: "0.8",
        }}
      >
       {t("searchhead")}
      </h2>

      <LocationSelector
        useGPS={useGPS}
        setUseGPS={setUseGPS}
        location={location}
        setLocation={setLocation}
      />

      <FilterPanel
        radius={radius}
        setRadius={setRadius}
        suitability={suitability}
        setSuitability={setSuitability}
        nature={nature}
        setNature={setNature}
        type={type}
        setType={setType}
        minRating={minRating}
        setMinRating={setMinRating}
        onSearch={handleSearch}
      />

      {location && (
        <SearchMap
          key={`${location.lat}-${location.lng}`}
          center={location}
          resources={resources}
          radius={radius}
        />
      )}

      <ResourceList resources={resources} />
    </div>
  );
};

export default AdvancedSearch;
