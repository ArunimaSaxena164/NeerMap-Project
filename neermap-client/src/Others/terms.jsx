import React from "react";
import "./terms.css"; 
import {useTranslation} from "react-i18next";
const Terms = () => {
  const {t}=useTranslation();
  return (
    <div className="terms-container">
      <h1>{t("termhead")}</h1>

      <section>
        <h2>{t("th1")}</h2>
        <p>
          {t("td1")}
        </p>
      </section>

      <section>
        <h2>{t("th2")}</h2>
        <p>
         {t("td2")}
        </p>
      </section>

      <section>
        <h2>{t("th3")}</h2>
        <p>
        {t("td3")}
        </p>
      </section>

      <section>
        <h2>{t("th4")}</h2>
        <p>
          {t("td4")}
        </p>
      </section>

      <section>
        <h2>{t("th5")}</h2>
        <p>
          {t("td5")}
        </p>
      </section>
    </div>
  );
};

export default Terms;
