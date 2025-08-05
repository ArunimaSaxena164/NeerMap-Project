import React, { useState } from "react";
import { toast } from "react-toastify";
import {toastSuccessOptions,toastErrorOptions} from "../toastUtils.js";
import "./ReportIssue.css";
import API from "../api.js";
import {useTranslation} from "react-i18next";
const ReportIssue = () => {
  const {t}=useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) {
    toast.error("Please fill in all fields.", toastErrorOptions);
    return;
  }

  try {
    const res = await API.post("/api/report", formData);
    toast.success("Issue reported successfully!", toastSuccessOptions);
    setFormData({ name: "", email: "", message: "" });
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong.", toastErrorOptions);
  }
};


  return (
    <div className="report-container">
      <h2>{t("report")}</h2>
      <form className="report-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t("rname")}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={t("remail")}
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder={t("rdes")}
          rows="6"
          value={formData.message}
          onChange={handleChange}
        />
        <button type="submit">{t("rsubmit")}</button>
      </form>
    </div>
  );
};

export default ReportIssue;
