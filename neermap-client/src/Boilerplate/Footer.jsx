import React from "react";
import {Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Footer.css';
import logo from "../assets/neermap.png";
function Footer() {
  const {t}=useTranslation();
  return (
    <div
      style={{
        background:
          "linear-gradient(to right, #EAF8FB, #97D4EA, #3D91B8, #032E56)",
      }}

    >
      <div className="container" style={{ padding: "0 80px" }}>
        <div className="row" style={{ height: "20px" }}></div>
        <div className="row mb-5 align-items-center text-center text-md-start">
          <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
            <img
              src={logo}
              width="90px"
              className="footer-logo"
              alt="logo"
            />
          </div>
          <div className="col-12 col-md-10">
            <p
             className="footer-tagline"
            >
             {t("tagline")}
            </p>
            <p className="footer-description">
          {t("footerdes")}
            </p>
          </div>
        </div>

        <div className="row mb-4 justify-content-between text-start" style={{marginLeft:"45px"}}>
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <Link className="link-footer d-block mb-2" to="/explore">
              {t("exploreSources")}
            </Link>
            <Link className="link-footer d-block mb-2" to="/search">
              {t("advancedSearch")}
            </Link>
           
            <Link className="link-footer d-block mb-2" to="/contribute">
              {t("contribute")}
            </Link>
             <Link className="link-footer d-block mb-2" to="/community">
             {t("ourComm")}
            </Link>
            <Link className="link-footer d-block mb-2" to="/about">
             {t("about")}
            </Link>
          </div>
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <Link className="link-footer d-block mb-2" to="/help">
             {t("help")}
            </Link>
            <Link className="link-footer d-block mb-2" to="/terms">
              {t("term")}
            </Link>
            <Link className="link-footer d-block mb-2" to="/privacy">
              {t("privacy")}
            </Link>
            <Link className="link-footer d-block mb-2" to="/report">
              {t("report")}
            </Link>
          </div>
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            
            <a className="link-footer d-block mb-2" href="https://www.linkedin.com/in/arunimasaxena164">
              {t("linkedin")} <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a className="link-footer d-block mb-2" href="https://github.com/ArunimaSaxena164/NeerMap-Project.git">
              {t("github")} <i className="fa-brands fa-github"></i>
            </a>
           
          </div>
        </div>
<div className="row">
  <p className="notedummy">
  {t("disclaimer")}
</p>

</div>
        <div className="row text-center mt-4">
          <p style={{ color: "#032e56" }}>
            {t("copyright")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
