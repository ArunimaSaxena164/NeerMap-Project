import React, { useState } from "react";
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next";
import { toastErrorOptions, toastSuccessOptions } from "../toastUtils.js";
import { useNavigate,useLocation, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Login.css";
const Login = () => {
  const {t}=useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const location = useLocation();
const from = location.state?.from || "/";

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);  
         toast.success(`Welcome ${username}!`, toastSuccessOptions);

      navigate(from); 
    } catch (err) {
       const message = err.response?.data?.error||err.response?.data?.message || "Login failed";
   
      toast.error(message, toastErrorOptions);
    }
  };
  

  return (
    <div className="container containlogin" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center customhead">{t("loghead")}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 inputcustom">
          <label className="form-label customlabel">{t("username")}</label>
          <input
            type="text"
            className="form-control"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("pleaseuser")}
          />
        </div>

        <div className="mb-3 inputcustom">
          <label className="form-label customlabel">{t("password")}</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("pleasepassword")}
          />
        </div>

        <div className="buttoncontainer"><button type="submit" className="w-50 custombutton">
          {t("login")}
        </button></div>
      </form>
      <div className="mt-3 text-center lastline">
        {t("pleasesign")} <Link to="/signup">{t("signup")}</Link>
      </div>
    </div>
  );
};

export default Login;
