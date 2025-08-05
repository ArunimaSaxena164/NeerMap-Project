import React from "react";
import ResourceCard from "./ResourceCard";
import "./ResourceList.css";
import { useTranslation } from "react-i18next";
const ResourceList = ({ resources, onSelect, selectedResource, setFilter }) => {
  const {t}=useTranslation();
  return (
    <div className="p-3">
      <h4 className="headinghero mt-3 mb-4">{t("waterres")}</h4>

      {/* Dropdown */}
      <div className="mb-3">
        <select
          className="form-select drop mt-3 mb-4"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className="optionstyle" value="">{t("selectsuit")}</option>
          <option className="optionstyle" value="">{t("all")}</option>
          <option className="optionstyle" value="Drinking">{t("Drinking")}</option>
          <option className="optionstyle" value="Irrigation">{t("Irrigation")}</option>
          <option className="optionstyle" value="Washing">{t("Washing")}</option>
           <option className="optionstyle" value="Fishing">{t("Fishing")}</option>
            <option className="optionstyle" value="Recreation">{t("Recreation")}</option>
            <option className="optionstyle" value="Unknown">{t("Unknown")}</option>
             <option className="optionstyle" value="Not Suitable">{t("Not Suitable")}</option>
        </select>
      </div>

      {/* Cards List */}
      <div>
        {resources.map((res) => (
          <ResourceCard
            key={res._id}
            resource={res}
            onClick={() => onSelect(res)}
            selected={selectedResource?._id === res._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
