import React from "react";
import { Link } from "react-router-dom";
import "./Community.css"; 
import {useTranslation} from "react-i18next";
const Community= () => {
  const {t}=useTranslation();
  return (
    <div className="container">
      <h1 className="headcomm">{t("commhead")}</h1>
      <p className="intro">
       {t("commintro")}
      </p>

      <div className="guidelines">
       <div> <h2>{t("commguid")}</h2>
        <ul>
          <li>✅ {t("commguid1")}</li>
          <li>💬 {t("commguid2")}</li>
          <li>🚫 {t("commguid3")}</li>
          <li>🚩 {t("commguid4")}</li>
        </ul></div>
      </div>
 <hr
        className="mb-5"
        style={{
          width: "75%",
          backgroundColor: "#97d4ea",
          height: "2px",
          margin: "0 auto",
          border: "none",
        }}
      ></hr>
      <div className="contribute">
        <h2>{t("commcontri")}</h2>
        <p>
          {t("commconint")}
        </p>
        <Link to="/contribute"><button className="buttoncontribute">{t("contrinew")}</button></Link>
      </div>
 <hr
        className="mb-5"
        style={{
          width: "75%",
          backgroundColor: "#97d4ea",
          height: "2px",
          margin: "0 auto",
          border: "none",
        }}
      ></hr>
      <div className="future-features">
        <div><h2>{t("commsoon")}</h2>
        <ul>
          <li>🗣️ {t("comms1")}</li>
          <li>🚩 {t("comms2")}</li>
          <li>🏆 {t("comms3")}</li>
          <li>🌐 {t("comms4")}</li>
        </ul></div>
      </div>
    </div>
  );
};

export default Community;
