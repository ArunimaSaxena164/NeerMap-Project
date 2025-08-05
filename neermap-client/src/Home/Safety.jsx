import React from "react";
import pic from "../assets/glass.png";
import { useTranslation } from "react-i18next";
import "./Safety.css";
function Safety() {
   const { t } = useTranslation();
  return (
    <div className="container">
      <div className="row">
        <h4 className="safety-head mb-5">
          {t("safetyhead")}
        </h4>
      </div>
      <div className="row mt-2 back-safe align-items-center">
  <div className="col-12 col-md-7 order-2 order-md-1">
    <p className="point-how">
      {t("safedes")}
    </p>

    <div>
      <p className="pointhead-safe">{t("safeh1")}</p>
      <p className="point-how">
       {t("safed1")}
      </p>

      <p className="pointhead-safe">{t("safeh2")}</p>
      <p className="point-how">
        {t("safed2")}
      </p>

      <p className="pointhead-safe">{t("safeh3")}</p>
      <p className="point-how">
        {t("safed3")}
      </p>

      <p className="pointhead-safe">{t("safeh4")}</p>
      <p className="point-how">
        {t("safed4")}
      </p>

      <p className="pointhead-safe mt-4 note-text">
      {t("safenote")}
      </p>
    </div>
  </div>

  <div className="col-12 col-md-5 order-1 order-md-2 text-center mb-4 mb-md-0">
    <img
      src={pic}
      alt="glass of water"
      className="img-fluid safe-img"
    />
  </div>
</div>


      <br />
      <br />
      <br />
      <br />
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
      <br /><br />
    </div>
  );
}

export default Safety;
