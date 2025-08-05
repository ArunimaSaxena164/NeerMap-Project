import React from "react";
import "./FilterPanel.css";
import {useTranslation} from "react-i18next";
const suitabilityOptions = [
  "Drinking",
  "Irrigation",
  "Washing",
  "Fishing",
  "Recreation",
  "Unknown",
  "Not Suitable",
];
const natureOptions = ["Natural", "Man-made"];
const typeOptions = [
  "River",
  "Lake",
  "Well",
  "Dam",
  "Pond",
  "Spring",
  "Stream",
  "Borewell",
  "Tubewell",
  "Canal",
  "Other",
];

const FilterPanel = ({
  radius,
  setRadius,
  suitability,
  setSuitability,
  nature,
  setNature,
  type,
  setType,
  minRating,
  setMinRating,
  onSearch,
}) => {
  const {t}=useTranslation();
  const handleCheckboxChange = (setter, state) => (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setter([...state, value]);
    } else {
      setter(state.filter((item) => item !== value));
    }
  };

  return (
    <div className="container custcontainer">
      <h3 className="filter-heading">{t("filterhead")}</h3>

      <div className="input-group">
        <label className="labelcustom">{t("rad")}</label>
        <input
          type="number"
          min="1"
          max="50"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="border p-1 placeinp"
        />
      </div>
      <div><p className="labelcustom" style={{marginTop:"30px",marginBottom:"30px"}}>{t("default")}</p></div>
      <div className="filter-section">
        <label className="labelcustom">{t("suit")}:</label>
        <div className="checkbox-group">
          {suitabilityOptions.map((opt) => (
            <label key={opt} className="checkbox-label">
              <input
                type="checkbox"
                value={opt}
                checked={suitability.includes(opt)}
                onChange={handleCheckboxChange(setSuitability, suitability)}
              />
              <span>{t(opt)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="labelcustom">{t("nature")}:</label>
        <div className="checkbox-group">
          {natureOptions.map((opt) => (
            <label key={opt} className="checkbox-label">
              <input
                type="checkbox"
                value={opt}
                checked={nature.includes(opt)}
                onChange={handleCheckboxChange(setNature, nature)}
              />
              <span>{t(opt)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="labelcustom">{t("typeres")}</label>
        <div className="checkbox-group">
          {typeOptions.map((opt) => (
            <label key={opt} className="checkbox-label">
              <input
                type="checkbox"
                value={opt}
                checked={type.includes(opt)}
                onChange={handleCheckboxChange(setType, type)}
              />
              <span>{t(opt)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="labelcustom">{t("minrat")}:</label>
        <select
          className="border p-1 placeinp"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>{t("unr")}</option>
          <option value={1}>{t("s1")}</option>
          <option value={2}>{t("s2")}</option>
          <option value={3}>{t("s3")}</option>
          <option value={4}>{t("s4")}</option>
          <option value={5}>{t("s5")}</option>
        </select>
      </div>

      <div className="btn-hold">
        <button onClick={onSearch} className="custombutton">
          {t("search")}
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
