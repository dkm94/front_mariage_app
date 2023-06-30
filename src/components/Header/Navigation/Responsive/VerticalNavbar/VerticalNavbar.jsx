import React, { useState, useEffect } from "react";
import { NavigationData } from "../../NavigationData";
import "./VerticalNavbar.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import profilePicture from "../../../../../img/couple-img.jpg";
import axios from "axios";

const VerticalNavbar = (props) => {
  const id = props.userInfos.mariageID;
  const [weddingId, setWeddingId] = useState({});

  const firstPerson = weddingId["firstPerson"];
  const secondPerson = weddingId["secondPerson"];

  const [isExpanded, setExpendState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`/api/admin/wedding/${id}`, { withCredentials: true })
        .then((res) => {
          setWeddingId(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [id]);

  return (
    <nav
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
      style={{ animation: "fadeIn 2s", opacity: 1 }}
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {weddingId && (
            <div
              style={{ display: !isExpanded && "none" }}
              className="nav-brand"
            >
              <div className="picture">
                <img alt="profile" src={profilePicture} />
              </div>
              <span
                style={{
                  textAlign: "center",
                  marginLeft: "35px",
                  marginTop: "15px",
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 500,
                  fontSize: "1.2rem",
                }}
              >
                {loading ? "" : `${firstPerson} & ${secondPerson}`}
              </span>
            </div>
          )}
          {isExpanded ? (
            <IconButton onClick={() => setExpendState(!isExpanded)}>
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setExpendState(!isExpanded)}
              style={{ marginLeft: "14px" }}
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <div className="nav-menu">
          {NavigationData.map(({ title, icon, pathname }) => (
            <Link
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              to={pathname}
            >
              {icon}
              {isExpanded && <p>{title}</p>}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;
