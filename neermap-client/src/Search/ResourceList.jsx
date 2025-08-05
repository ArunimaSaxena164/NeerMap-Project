import React from "react";
import { Link } from "react-router-dom";
import "./ResourceList.css";
import {useTranslation} from "react-i18next";
const ResourceList = ({ resources }) => {
  const {t}=useTranslation();
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 custom-head">
        {t("resfound")}:{resources.length}
      </h3>
      <br />
      {resources.map((res) => (
        <div key={res._id} className="cardcust">
          <h4 className="reshead">{res.name}</h4>
          <p className="rescontent">
            City: {res.city}, Nature: {res.nature}, Suitability:
            {Array.isArray(res.suitability)
              ? res.suitability.join(", ")
              : res.suitability}
          </p>
          <Link to={`/find/${res._id}`}>
            <button
              className="buttonview"
            >
              {t("view")}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;
