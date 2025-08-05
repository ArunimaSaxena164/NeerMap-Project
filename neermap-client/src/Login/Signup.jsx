import React, { useState } from "react";
import { toast } from "react-toastify";
import { toastErrorOptions, toastSuccessOptions } from "../toastUtils.js";
import {useTranslation} from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Signup.css";
const Signup = () => {
  const {t}=useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await register(formData.username, formData.email, formData.password);
    await login(formData.username, formData.password);
    
    toast.success(`Signup successful! Welcome ${formData.username}`, toastSuccessOptions);
    navigate("/");
  } catch (err) {
    console.error(err);
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Signup failed";
      toast.error(message, toastErrorOptions);
  }
};

  return (
    <div className="container containsignup" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4 customhead">{t("signuphead")}</h2>
      <form onSubmit={handleSubmit}>
        

        <div className="mb-3 inputcustom">
          <label className="form-label customlabel">{t("username")}</label>
          <input
            required
            type="text"
            className="form-control"
            name="username"
            placeholder={t("pleaseuser")}
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>

        <div className="mb-3 inputcustom">
          <label className="form-label customlabel">{t("email")}</label>
          <input
            required
            type="email"
            className="form-control"
            name="email"
            placeholder={t("pleaseemail")}
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className="mb-3 inputcustom">
          <label className="form-label customlabel">{t("password")}</label>
          <input
            required
            type="password"
            className="form-control"
            name="password"
            placeholder={t("pleasepassword")}
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <div className="buttoncontainer">
          <button type="submit" className="custombutton w-50">
            {t("signup")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
