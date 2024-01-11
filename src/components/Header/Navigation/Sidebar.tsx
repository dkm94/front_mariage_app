import "../Header.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ISidebarProps, NavigationDataType } from "../../../../types/index";
import { NavigationData } from "./NavigationData";
import profilePicture from "../../../img/couple-img.jpg";

const Sidebar = ({ userInfos, loading }: ISidebarProps) => {

  const [selectedTab, setSelectedTab] = useState<string | undefined>(window.location.pathname === "/" ? "/tableau-de-bord" : window.location.pathname);
  const tabs: NavigationDataType[] = NavigationData;

  const handleClick = (pathname: string) => {
    const selected = tabs.find((tab) => tab.pathname === pathname);
    setSelectedTab(selected?.pathname);
  }

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
            className="menu-row"
            >
              <Link
                id={selectedTab === val.pathname ? "active" : ""}
                to={val?.pathname}
                onClick={() => handleClick(val.pathname)}
              >
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
