import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api.js";
import MapView from "./MapView";
import {useTranslation} from "react-i18next";
import {toast} from"react-toastify";
import { toastSuccessOptions,toastErrorOptions } from "../toastUtils";
import "./EditResource.css";
const EditResource = () => {
  const {t}=useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    type: "",
    nature: "",
    suitability: "",
    description: "",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.get(`/api/find/${id}`)
      .then(res => {
        const data = res.data;
        setForm({
          name: data.name || "",
          city: data.city || "",
          type: data.type || "",
          nature: data.nature || "",
          suitability: data.suitability || "",
          description: data.description || "",
          geometry: data.geometry || {
            type: "Point",
            coordinates: [0, 0]
          }
        });
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.type) newErrors.type = "Please select a type.";
    if (!form.nature) newErrors.nature = "Please select a nature.";
    if (!form.suitability) newErrors.suitability = "Please select suitability.";
    if (
      !form.geometry.coordinates ||
      isNaN(form.geometry.coordinates[0]) ||
      isNaN(form.geometry.coordinates[1])
    ) {
      newErrors.geometry = "Valid coordinates must be selected on the map.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" })); 
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setForm(prev => ({
      ...prev,
      geometry: {
        ...prev.geometry,
        coordinates: [lng, lat]
      }
    }));
    setErrors(prev => ({ ...prev, geometry: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await API.put(`/api/find/edit/${id}`, form); 
      navigate(`/find/${id}`);
      toast.success("Resource updated successfully!",toastSuccessOptions);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed. Please try again.", toastErrorOptions);
    }
  };

  return (
    <div className="contribute-container">
      <h2 className="form-heading">{t("edithead")}</h2>
      <form className="resource-form" onSubmit={handleSubmit} noValidate>
        <div className="inp-wrap"><input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="inp-edit"
          placeholder="Resource Name"
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="inp-edit"
        />
        {errors.city && <p className="error-text">{errors.city}</p>}

        <select name="type" className="inp-edit" value={form.type} onChange={handleChange}>
          <option value="">{t("typ")}</option>
          <option value="Lake">{t("Lake")}</option>
          <option value="River">{t("River")}</option>
          <option value="Pond">{t("Pond")}</option>
          <option value="Well">{t("Well")}</option>
          <option value="Tubewell">{t("Tubewell")}</option>
          <option value="Borewell">{t("Borewell")}</option>
          <option value="Stream">{t("Stream")}</option>
          <option value="Spring">{t("Spring")}</option>
          <option value="Dam">{t("Dam")}</option>
          <option value="Canal">{t("Canal")}</option>
          <option value="Other">{t("Other")}</option>
        </select>
        {errors.type && <p className="error-text">{errors.type}</p>}

        <select name="nature" value={form.nature}  className="inp-edit" onChange={handleChange}>
          <option value="">{t("nat")}</option>
          <option value="Natural">{t("Natural")}</option>
          <option value="Man-made">{t("Man-made")}</option>
          <option value="Not Known">{t("Not Known")}</option>
        </select>
        {errors.nature && <p className="error-text">{errors.nature}</p>}

        <select name="suitability" value={form.suitability} className="inp-edit" onChange={handleChange}>
          <option value="">{t("suitch")}</option>
          <option value="Drinking">{t("Drinking")}</option>
          <option value="Irrigation">{t("Irrigation")}</option>
          <option value="Fishing">{t("Fishing")}</option>
          <option value="Washing">{t("Washing")}</option>
          <option value="Recreation">{t("Recreation")}</option>
          <option value="Not Suitable">{t("Not Suitable")}</option>
          <option value="Unknown">{t("Unknown")}</option>
        </select>
        {errors.suitability && <p className="error-text">{errors.suitability}</p>}

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          className="inp-edit"
        />
</div>
        <h3>{t("selmap")}</h3>
        <div className="map-wrapper">
          <MapView
            markerPosition={{
              lat: form.geometry.coordinates[1],
              lng: form.geometry.coordinates[0]
            }}
            onMapClick={handleMapClick}
          />
          
        </div>
        <div className="coordinate-display">
  <p>{t("lat")}: {form.geometry.coordinates[1].toFixed(6)}, {t("long")}: {form.geometry.coordinates[0].toFixed(6)}</p>
</div>

        {errors.geometry && <p className="error-text">{errors.geometry}</p>}

        <div className="wrapbutton"><button className="submit-button" type="submit">
          {t("upb")}
        </button></div>
      </form>
    </div>
  );
};

export default EditResource;
