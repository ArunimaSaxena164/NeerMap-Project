import React from "react";
import "./ResourceForm.css";
import {useTranslation} from "react-i18next";
const ResourceForm = ({ formData, setFormData }) => {
  const {t}=useTranslation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4 mx-5 res-inp" >
      {/* Resource Name */}
      <input
        type="text"
        name="name"
        placeholder={t("resname")}
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 rounded"
      />
  
      {/* City */}
      <input
        type="text"
        name="city"
        placeholder={t("city")}
        value={formData.city}
        onChange={handleChange}
        required
        className="w-full  p-2 rounded "
      />

      {/* Type of Water Resource */}
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full text-muted p-2 rounded "
      >
        <option value=""disabled selected hidden>{t("typ")}</option>
        <option value="Lake">{t("Lake")}</option>
        <option value="River">{t("River")}</option>
        <option value="Dam">{t("Dam")}</option>
        <option value="Stream">{t("Stream")}</option>
        <option value="Spring">{t("Spring")}</option>
        <option value="Pond">{t("Pond")}</option>
        <option value="Well">{t("Well")}</option>
        <option value="Borewell">{t("Borewell")}</option>
        <option value="Tubewell">{t("Tubewell")}</option>
        <option value="Canal">{t("Canal")}</option>
        <option value="Other">{t("Other")}</option>
      </select>

      {/* Nature */}
      <select
        name="nature"
        value={formData.nature}
        onChange={handleChange}
        className="w-full text-muted p-2 rounded "
      >
        <option value=""disabled selected hidden>{t("nat")}</option>
        <option value="Natural">{t("Natural")}</option>
        <option value="Man-made">{t("Man-made")}</option>
        <option value="Not Known">{t("Not Known")}</option>
      </select>

      {/* Suitability */}
      <select
        name="suitability"
        value={formData.suitability}
        onChange={handleChange}
        className="w-full p-2 rounded text-muted"
      >
        <option value=""disabled selected hidden>{t("suitch")}</option>
        <option value="Drinking">{t("Drinking")}</option>
        <option value="Irrigation">{t("Irrigation")}</option>
        <option value="Washing">{t("Washing")}</option>
        <option value="Recreation">{t("Recreation")}</option>
        <option value="Fishing">{t("Fishing")}</option>
        <option value="Not Suitable">{t("Not Suitable")}</option>
        <option value="Unknown">{t("Unknown")}</option>
      </select>
<br />
      {/* Description */}
      <textarea
        name="description"
        placeholder={t("descri")}
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="w-full border p-2 rounded"
      />
    </div>
  );
};

export default ResourceForm;
