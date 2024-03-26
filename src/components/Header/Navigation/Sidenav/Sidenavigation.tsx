import "./styles.css";  

import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { UserType } from "../../../../../types";
import { NavigationData } from "../NavigationData";
import profilePicture from "../../../../img/couple-img.jpg";

interface SideNavigationProps {
    userInfos?: UserType | null;
    loading: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
  }
  
  export const SideNavigation = (props: SideNavigationProps) => {
    const { isOpen, setIsOpen } = props;
    // handle open state when path changes

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
          </header>
          <div className="picture-wrapper">
            <div className={`picture ${isOpen ? "xs-picture" : ""} `}>
                <img alt="profile" src={profilePicture} className={isOpen ? "" : "xs-img"} />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{
                  marginTop: "15px",
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
  