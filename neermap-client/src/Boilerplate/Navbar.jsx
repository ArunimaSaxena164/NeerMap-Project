import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Collapse } from "bootstrap";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const collapseRef = useRef(null);
  const bsCollapseRef = useRef(null); // save instance
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (collapseRef.current) {
      bsCollapseRef.current = new Collapse(collapseRef.current, {
        toggle: false,
      });
    }
  }, []);

  // Toggle collapse manually when hamburger is clicked
  const toggleNavbar = () => {
    if (bsCollapseRef.current) {
      if (collapseRef.current.classList.contains("show")) {
        bsCollapseRef.current.hide();
      } else {
        bsCollapseRef.current.show();
      }
    }
  };

  const closeNavbar = () => {
    if (collapseRef.current?.classList.contains("show")) {
      bsCollapseRef.current?.hide();
    }
  };

  const handleProtectedNav = (e, path) => {
    e.preventDefault();
    closeNavbar();
    if (!user) {
      navigate("/login", {
        state: { from: `/contribute` },
      });
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    closeNavbar();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg col-nav sticky-top">
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand title-back"
            onClick={closeNavbar}
          >
            {t("NeerMap")}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar} 
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            ref={collapseRef}
          >
            <ul className="navbar-nav ms-auto mx-5 mb-lg-0">
              <li className="nav-item mx-2">
                <Link
                  to="/explore"
                  className="active link-colors"
                  onClick={closeNavbar}
                >
                  {t("explore")}
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  to="/search"
                  className="active link-colors"
                  onClick={closeNavbar}
                >
                  {t("search")}
                </Link>
              </li>

              <li className="nav-item mx-2">
                <a
                  href="#"
                  className="active link-colors"
                  onClick={(e) => handleProtectedNav(e, "/contribute")}
                >
                  {t("contribute")}
                </a>
              </li>
              <li className="nav-item mx-2">
                <Link
                  to="/about"
                  className="active link-colors"
                  onClick={closeNavbar}
                >
                 {t("about")}
                </Link>
              </li>
              <li className="nav-item mx-2">
                {user ? (
                  <span
                    onClick={handleLogout}
                    className="active link-colors"
                    role="button"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    {t("logout")}
                  </span>
                ) : (
                  <Link
                    to="/login"
                    className="active link-colors"
                    onClick={closeNavbar}
                  >
                    {t("login")}
                  </Link>
                )}
              </li>
              <li className="nav-item mx-2">
                <span
                  role="button"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  className=" active link-colors"
                  onClick={() => i18n.changeLanguage("en")}
                >
                  English
                </span>
              </li>
              <li className="nav-item mx-2">
                <span
                  role="button"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  className=" active link-colors"
                  onClick={() => i18n.changeLanguage("hi")}
                >
                  हिंदी
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
