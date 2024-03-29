import "../Header.css";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ISidebarProps, NavigationDataType } from "../../../../types/index";
import { NavigationData } from "./NavigationData";

import profilePicture from "../../../img/couple-img.jpg";

const Sidebar = ({ userInfos, loading }: ISidebarProps) => {
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<string | undefined>(location.pathname);
  const tabs: NavigationDataType[] = NavigationData;
  
  useEffect(() => {
    const path = location.pathname;
    setSelectedTab(path);
  }, [location]);
  
  const isTabActive = (tabName: string) => selectedTab?.includes(tabName);

  return (
    <nav className="sidebar" style={{ animation: "fadeIn 2s", opacity: 1 }}>
      <div className="sidebar__greetings">
        <div className="profile-picture">
          <img alt="profile" src={profilePicture} />
        </div>
        <p className="names">
          {loading ? "" : `${userInfos?.firstPerson} & ${userInfos?.secondPerson}`}
        </p>
      </div>
      <ul className="sidebarList">
        {tabs.map((val, key) => {
          return (
            <li 
            key={key} 
            className={`menu-row ${isTabActive(`/mariage/${userInfos?.mariageID}${val.pathname}`) ? "active" : ""}`}
            >
              <Link to={`/mariage/${userInfos?.mariageID}${val.pathname}`}>
                {val?.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Sidebar;
