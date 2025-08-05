import React from "react";
import "./ResourceCard.css";

const ResourceCard = ({ resource, onClick, selected }) => {
  return (
    <div
      className={`card mb-4  divcard`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body bodycard">
        <h6 className="card-title headingcard">{resource.name}</h6>
        <p className="card-text small paracard">{resource.city} | {resource.description}</p>
        <span className="badge colorbadg">{resource.suitability}</span>
      </div>
    </div>
  );
};

export default ResourceCard;
