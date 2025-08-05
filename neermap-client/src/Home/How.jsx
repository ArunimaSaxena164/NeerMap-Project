import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import './How.css';
function How() {
   const { t } = useTranslation();
  return (
    <div className="container" style={{marginTop:"40px"}}>
      <div className="row" style={{marginBottom:"45px"}}><h4 className="title-how">{t("how")}</h4></div>
      <div className="row">
  <div className="col-12">
    <div className="how-cards">
      {[
  {
    title: t("head1"),
    icon: "fa-location-dot",
    desc:t("des1"),
    path: "/explore", 
  },
  {
    title: t("head2"),
    icon: "fa-droplet",
    desc: t("des2"),
    path: "/search",
  },
  {
    title: t("head3"),
    icon: "fa-solid fa-circle-plus",
    desc:t("des3"),
    path: "/contribute",
  },
  {
    title: t("head4"),
    icon: "fa-users",
    desc: t("des4"),
    path: "/community",
  },
  {
    title:t("head5"),
    icon:"fa-solid fa-circle-question",
    desc:t("des5"),
    path:"/about",
  },
].map((item, idx) => (
  <Link to={item.path} key={idx} className="text-decoration-none">
    <div className="back-how">
      <h4 className="head-how">
        {item.title} <i className={`fa-solid ${item.icon}`}></i>
      </h4>
      <p className="point-how">{item.desc}</p>
    </div>
  </Link>
))}

    </div>
  </div>
</div>

      <br /><br /><br />
      <hr style={{width:"75%",backgroundColor:"#97d4ea",height:"2px",margin:"0 auto",border:"none"}}></hr>
      <br />
    </div>
  );
}

export default How;
