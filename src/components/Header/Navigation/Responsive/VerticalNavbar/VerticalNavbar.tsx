import "./VerticalNavbar.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { UserType } from '../../../../../../types';
import { NavigationData } from "../../NavigationData";
import profilePicture from "../../../../../img/couple-img.jpg";

interface VerticalNavbarProps {
  userInfos?: UserType | null;
  loading: boolean;
}

const VerticalNavbar = (props: VerticalNavbarProps) => {
  const { userInfos, loading } = props;

  const [isExpanded, setExpendState] = useState<boolean>(false);

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
          {userInfos && (
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
                {loading ? "" : `${userInfos?.firstPerson} & ${userInfos?.secondPerson}`}
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
