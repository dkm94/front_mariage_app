import React from "react";
import { useState } from "react"
import "./styles.css";
import { UserType } from "../../../../../../types";
import { NavigationData } from "../../NavigationData";
import { Logo } from "../../../../../img";
import profilePicture from "../../../../../img/couple-img.jpg";
import { NavLink } from "react-router-dom";

interface Sidebar1Props {
    userInfos?: UserType | null;
    loading: boolean;
  }
  
  export const Sidebar1 = (props: Sidebar1Props) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <aside className={`custom-sidebar ${isOpen ? "open" : ""}`}>
        <div className="custom-sidebar-inner">
          <header className={`custom-sidebar-header`} id={`${isOpen ? "block" : ""}`}>
            <button
              type="button"
              className="custom-sidebar-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
            {/* <img src={Logo} className="custom-sidebar-logo" /> */}
          </header>
          <div className="picture-wrapper">
            <div className={`picture ${isOpen ? "xs-picture" : ""} `}>
                <img alt="profile" src={profilePicture} className={isOpen ? "" : "xs-img"} />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{
                  marginTop: "15px",
                //   fontFamily: "Playfair Display, serif",
                  fontWeight: 500,
                  fontSize: "2.5rem",
                }}>
              {!props.loading && isOpen ? `${props.userInfos?.firstPerson} & ${props.userInfos?.secondPerson}` : ""}
            </span>
          </div>
          <nav className="custom-sidebar-menu">
            {NavigationData.map((item) => (
              <NavLink key={item.idx} type="button" className="custom-sidebar-button" to={`/mariage/${props.userInfos?.mariageID}${item.pathname}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
                <p>{item.title}</p>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    );
  };
  