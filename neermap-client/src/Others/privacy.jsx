import React from "react";
import "./privacy.css"; 
import {useTranslation} from "react-i18next";
const Privacy = () => {
  const {t}=useTranslation();
  return (
    <div className="privacy-container">
      <h1>{t("privacyhead")}</h1>

      <section>
        <h2>{t("prih1")}</h2>
        <p>
          {t("prid1")}
        </p>
      </section>

      <section>
        <h2>{t("prih2")}</h2>
        <p>
         {t("prid2")}
        </p>
      </section>

      <section>
        <h2>{t("prih3")}</h2>
        <p>
          {t("prid3")}
        </p>
      </section>

      <section>
        <h2>{t("prih4")}</h2>
        <p>
          {t("prid4")}
        </p>
      </section>

      <section>
        <h2>{t("prih5")}</h2>
        <p>
          {t("prid5")}
        </p>
      </section>

      <section>
        <h2>{t("prih6")}</h2>
        <p>
          {t("prid6")}
        </p>
      </section>
    </div>
  );
};

export default Privacy;
