import React from "react";
import './Hero.css';
import { useTranslation } from "react-i18next";
function Hero() {
  const {t}=useTranslation();
  return (
    <div className="container" style={{marginTop:"6em"}}>
      <div className="row mt-5">
        <h1 className="abouthead">{t("abouthead")}</h1>
        <div className="aboutpara">
          {" "}
          <p>
            {t("aboutp1")}
          </p>
          <p>
           {t("aboutp2")}
          </p>
          <p style={{ fontWeight: "600" }}>
            “{t("aboutp3")}”
          </p>
        </div>
      </div>
      <br/>
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
    </div>
  );
}

export default Hero;
