import React from "react";
import {Link} from "react-router-dom";
import logo from "../assets/neermap.png";
import { useTranslation } from "react-i18next";
import './Hero.css'
function Hero() {
    const { t } = useTranslation();
  return (
    <div className="hero-container container-fluid mt-5 ">
      <div className="hero-wrapper d-flex flex-wrap justify-content-center align-items-center">
        <div className="logo-container text-center mb-4 mb-lg-0">
          <Link to="/about">
            <img src={logo} className="logo-style" />
          </Link>
        </div>
        <div className="hero-text text-center">
          <h4>"{t("tagline")}"</h4>
          <p>{t("subtag")}</p>
          <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
            <Link to="/explore"> <button className="hero-btn">{t("exploreSources")}</button></Link>
           <Link to="/search">
            <button className="hero-btn">{t("advancedSearch")}</button>
            </Link>
          </div>
        </div>
      </div>
      <br /><br />
      <hr
        className="mt-5"
        style={{
          width: "75%",
          backgroundColor: "#97d4ea",
          height: "2px",
          margin: "0 auto",
          border: "none",
        }}
      />
    </div>
  );
}

export default Hero;
