import "./styles.css";  

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
    const { isOpen, setIsOpen, userInfos } = props;
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState<string | undefined>(location.pathname);

    useEffect(() => {
      const path = location.pathname;
      setSelectedTab(path);
    }, [location]);
    
    const isTabActive = (tabName: string) => selectedTab?.includes(tabName);
    // TODO: handle open state when path changes

    //TODO: image loading

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
          <div style={{ textAlign: "center", paddingLeft: "10px", paddingRight: "10px" }}>
            <span style={{
                  marginTop: "15px",
                  fontWeight: 500,
                  fontSize: "2.5rem",
                  fontFamily: "'Playfair Display', serif"
                }}>
              {!props.loading && isOpen ? `${props.userInfos?.firstPerson} & ${props.userInfos?.secondPerson}` : ""}
            </span>
          </div>
          <nav className="custom-sidebar-menu">
            {NavigationData.map((item) => (
              <NavLink key={item.idx} type="button" className={`custom-sidebar-button ${isTabActive(`/mariage/${userInfos?.mariageID}${item.pathname}`) ? "active" : ""}`} to={`/mariage/${props.userInfos?.mariageID}${item.pathname}`}>
                <span className={`material-symbols-outlined ${isTabActive(`/mariage/${userInfos?.mariageID}${item.pathname}`) ? "active" : ""}`} >{item.icon}</span>
                <p>{item.title}</p>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    );
  };
  