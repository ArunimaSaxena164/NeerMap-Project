import React, { useState } from "react";
import ResourceForm from "./ResourceForm";
import MapPicker from "./MapPicker"; 
import API from "../api.js";
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next";
import { toastErrorOptions, toastSuccessOptions } from "../toastUtils.js";
import "./Contribute.css";
const Contribute = () => {
  const {t}=useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    type: "",
    nature: "",
    suitability: "",
    description: "",
  });

  const [location, setLocation] = useState(null); // { lat, lng }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      geometry: {
        type: "Point",
        coordinates: location ? [location.lng, location.lat] : [],
      },
    };

    
    try {
  const res = await API.post("/api/saveres", payload);
  toast.success("Resource Submitted Successfully",toastSuccessOptions);
} catch (error) {
  if (error.response?.status === 401) {
     toast.error("Please login to submit a resource",toastErrorOptions);
  } else if (error.response?.status === 400) {
     toast.error(`Validation Error: ${error.response.data.message}`,toastErrorOptions);
  } else {
     toast.error("Something went wrong. Please try again",toastErrorOptions);
  }
  console.log("Error submitting resource:", error.response || error);
}

  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold contrihead">{t("contrinew")}</h2>

      <ResourceForm formData={formData} setFormData={setFormData} />

      <MapPicker location={location} setLocation={setLocation} />

      <div className="div-button">
        <button
        type="submit"
        className="cust-button"
      >
        {t("submit")}
      </button>
      </div>
    </form>
  );
};

export default Contribute;
