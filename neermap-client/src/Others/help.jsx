import React from "react";
import "./help.css"; 
import {useTranslation} from "react-i18next";
const Help = () => {
  const {t}=useTranslation();
  return (
    <div className="help-container">
      <h1>{t("helphead")}</h1>

      <section>
        <h2>{t("helpq1")}</h2>
        <p>
         {t("helpans1")}
        </p>
      </section>

      <section>
        <h2>{t("helpq2")}</h2>
        <p>
          {t("helpans2")}
        </p>
      </section>

      <section>
        <h2>{t("helpq3")}</h2>
        <p>
         {t("helpans3")}
        </p>
      </section>

      <section>
        <h2>{t("helpq4")}</h2>
        <p>
          {t("helpans4")}
        </p>
      </section>

      <section>
        <h2>{t("helpq5")}</h2>
        <p>
          {t("helpans5")}
        </p>
      </section>
    </div>
  );
};

export default Help;
