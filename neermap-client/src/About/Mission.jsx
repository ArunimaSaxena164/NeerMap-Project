import React from "react";
import handpump from "../assets/handpump.png";
import { useTranslation } from "react-i18next";
import './Mission.css';
function Mission() {
  const {t}=useTranslation();
  return (
    <div className="container">
      <div className="row">
        <h1 className="abouthead mb-5 mt-3 text-center">{t("missionh")}</h1>
      </div>
      <div className="row backmission mt-3 align-items-center">
        <div className="col-12 col-md-6 ">
          <div className="mission">
            <ul>
              <p>{t("missionp")}</p>
              <li>{t("missionl1")}</li>
              <li>{t("missionl2")}</li>
              <li>
                {t("missionl3")}
              </li>
              <li>{t("missionl4")}</li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-6  text-center">
          <img src={handpump} width="85%" className="img-fluid mission-img"  alt="people filling water"></img>
        </div>
      </div>
      <br/><br /><br /><br/>
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

export default Mission;
