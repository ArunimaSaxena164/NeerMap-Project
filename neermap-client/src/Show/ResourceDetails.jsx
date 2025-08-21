import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./ResourceDetails.css";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { toastErrorOptions, toastSuccessOptions } from "../toastUtils";
import {useTranslation} from "react-i18next";

import redicon from "../assets/markers/marker-icon-red.png";
import violeticon from "../assets/markers/marker-icon-violet.png";
import blueicon from "../assets/markers/marker-icon-blue.png";
import greenicon from "../assets/markers/marker-icon-green.png";
import goldicon from "../assets/markers/marker-icon-gold.png";
import orangeicon from "../assets/markers/marker-icon-orange.png";
import greyicon from "../assets/markers/marker-icon-grey.png";

const iconDrinking = new L.Icon({
  iconUrl: blueicon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const iconIrrigation = new L.Icon({
  iconUrl: greenicon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const iconWashing = new L.Icon({
  iconUrl: goldicon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const iconNotSuitable = new L.Icon({
  iconUrl: redicon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const iconRecreation = new L.Icon({
  iconUrl: violeticon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const iconFishing = new L.Icon({
  iconUrl: orangeicon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const iconUnknown = new L.Icon({
  iconUrl: greyicon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const getIconForSuitability = (suitability) => {
  switch (suitability) {
    case "Drinking":
      return iconDrinking;
    case "Irrigation":
      return iconIrrigation;
    case "Washing":
      return iconWashing;
    case "Not Suitable":
      return iconNotSuitable;
    case "Recreation":
      return iconRecreation;
    case "Fishing":
      return iconFishing;
    default:
      return iconUnknown;
  }
};

const ResourceDetails = () => {
  const {t}=useTranslation();
  const { id } = useParams(); // id = resource._id
  const [resource, setResource] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(1);
  const [newComment, setNewComment] = useState("");
  const { user: currUser } = useAuth();
  const navigate = useNavigate();

  const fetchResource = async () => {
    try {
      const res = await API.get(`/api/find/${id}`);
      setResource(res.data);
    } catch (err) {
      console.error("Resource fetch failed", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Review fetch failed", err);
    }
  };

  useEffect(() => {
    fetchResource();
    fetchReviews();
  }, [id]);

  if (!resource) {
    return (
      <p
        style={{
          height: "50vh",
          color: "#032e56",
          textAlign: "center",
          marginTop: "25vh",
          fontWeight: "500",
          fontSize: "40px",
        }}
      >
        Loading...
      </p>
    );
  }

  const position = [
    resource.geometry.coordinates[1],
    resource.geometry.coordinates[0],
  ];

  const handleDeleteResource = async () => {
    try {
      await API.delete(`/api/find/${resource._id}`, {
        withCredentials: true,
      });
      navigate("/explore");
      toast.success("Resource Deleted Successfully!", toastSuccessOptions);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await API.delete(`/api/reviews/delete/${reviewId}`, {
        withCredentials: true,
      });

      // Refresh both resource and reviews after deletion
      await fetchReviews();
      await fetchResource();
      toast.success("Review Deleted Successfully!", toastSuccessOptions);
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  const handleEditResource = () => {
    navigate(`/edit/${resource._id}`);
  };

  const customMarker = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
const handleFlag = async (resourceId) => {
  try {
    const response = await API.post(`/api/find/${resourceId}/flag`);
    toast.success("Resource flagged for review.",toastSuccessOptions);
  } catch (err) {
    toast.error("Failed to flag resource. Please try again.",toastErrorOptions);
  }
};
  return (
    <div className="resource-container">
      {/* Row 1: Details and Map */}
      <div
        className="resource-row row-1 "
        style={{ display: "flex", gap: "2rem" }}
      >
        <div className="details-column " style={{ flex: 1 }}>
          <h2>{resource.name}</h2>
          <p>
            <strong>{t("city")}:</strong> {resource.city}
          </p>
          <p>
            <strong>{t("typ")}:</strong> {resource.type}
          </p>
          <p>
            <strong>{t("nat")}:</strong> {resource.nature}
          </p>
          <p>
            <strong>{t("suitch")}:</strong>{" "}
            {Array.isArray(resource.suitability)
              ? resource.suitability.join(", ")
              : resource.suitability}
          </p>
          <p>
            <strong>{t("showdescrip")}:</strong>{" "}
            {resource.description || "No description"}
          </p>
          <p>
            <strong>{t("selcoord")}</strong> {position[0]}, {position[1]}
          </p>
        </div>

        <div className="map-column" style={{ flex: 1 }}>
          <div className="custom-map "><MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={position}
              icon={getIconForSuitability(resource.suitability)}
            ></Marker>
          </MapContainer></div>
        </div>
      </div>

      {/* Row 2: Edit/Delete (Only for owner) */}
      {currUser && resource.addedBy?._id === currUser._id && (
        <div className="resource-row row-2" style={{ marginTop: "1rem" }}>
          <div className="edit-delete-section">
            <button onClick={handleEditResource}>{t("showedit")}</button>
            <button onClick={handleDeleteResource}>{t("showdelete")}</button>
          </div>
        </div>
      )}
 <hr
        className="mb-5"
        style={{
          width: "75%",
          backgroundColor: "#97d4ea",
          height: "2px",
          margin: "0 auto",
          border: "none",
          marginTop:"2em"
        }}
      ></hr>
      {/* Row 3: Reviews and Add Review */}
      <div className="resource-row row-3" style={{ marginTop: "2rem" }}>
        <h3>{t("reviews")}</h3>

        {resource.averageRating > 0 ? (
          <p className="avgrating">
            <strong>{t("avgrat")}</strong> ⭐ {resource.averageRating} / 5
          </p>
        ) : (
          <p className="norating">{t("norat")}</p>
        )}

       <div className="review-wrap"> {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="review-box"
              style={{
                borderBottom: "1px solid #ccc",
                paddingBottom: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p className="nameuser">
                <strong>{rev.user?.username || "Anonymous"}</strong> rated it{" "}
                {rev.rating}⭐
              </p>
              <p className="reviewuser">{rev.comment}</p>
              {currUser && rev.user?._id === currUser._id && (
                <button onClick={() => handleDeleteReview(rev._id)}>
                  {t("showdelete")}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="addnewrevcon"><p className="addnewrev">{t("guidadd")}</p></div>
        )}</div>

        <div className="addwrapper">
          <button className="addreview"
          onClick={() => {
            if (!currUser) {
              navigate("/login", {
                state: { from: `/find/${resource._id}` }, // you can add an anchor to scroll to form
              });
            } else {
              setShowForm(!showForm);
            }
          }}
        >
          {showForm ? t("cancel") : t("addrev")}
        </button>
        </div>

        {showForm && (
         <div className="formaddwrap"> <form className="formadd"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await API.post(
                  `/api/reviews/add/${id}`,
                  {
                    resource: id,
                    rating: newRating,
                    comment: newComment,
                  },
                  { withCredentials: true }
                );

                await fetchReviews();
                await fetchResource();
                toast.success(
                  "Review added successfully!",
                  toastSuccessOptions
                );
                setNewRating(1);
                setNewComment("");
                setShowForm(false);
              } catch (err) {
                console.error("Failed to submit review", err);
              }
            }}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <label className="labelform" style={{marginTop:"30px"}}>
              {t("formaddrat")}
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                required
                className="selrat"
                style={{ marginLeft: "0.5rem" }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </label>

            <br />
            <br />

            <label className="labelform">
              {t("comment")}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                placeholder={t("commentplace")}
                className="textform"
                style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
              />
            </label>

            <br />
           <div className="buttonformwrap"> <button className="form-button" type="submit">{t("revsub")}</button></div>
          </form></div>
        )}
      </div>
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
 {/* flag button */}
      <div className="flagbutton"><button onClick={() => handleFlag(resource._id)}>{t("flag")}</button>
</div>
      {/* Row 4: Back Navigation */}
      <div className="redirect">
        <Link to="/explore" className="back-link">
         <button>{t("exploreSources")}</button>
        </Link>
        <Link to="/search" className="back-link">
          <button>{t("advancedSearch")}</button>
        </Link>
      </div>
     
    </div>
  );
};

export default ResourceDetails;
