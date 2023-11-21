import "./VerticalNavbar.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { VerticalNavbarProps } from '../../../../../../types';
import { NavigationData } from "../../NavigationData.ts";
import profilePicture from "../../../../../img/couple-img.jpg";

const VerticalNavbar = ({ userInfos }: VerticalNavbarProps) => {

  const id: string | undefined = userInfos?.mariageID;
  const [weddingId, setWeddingId] = useState<string>("");

  const firstPerson: string = weddingId["firstPerson"];
  const secondPerson: string = weddingId["secondPerson"];

  const [isExpanded, setExpendState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
              style={{ display: !isExpanded ? "none" : "" }}
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
          {NavigationData?.map(({ title, icon: Icon, pathname }) => (
            <Link
              className={"menu-item"}
              to={pathname}
              key={title}
            >
              {<Icon />}
              {isExpanded && <p>{title}</p>}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;
