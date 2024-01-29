import "../Header.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ISidebarProps, NavigationDataType } from "../../../../types/index";
import { NavigationData } from "./NavigationData";
import profilePicture from "../../../img/couple-img.jpg";

const Sidebar = ({ userInfos, loading }: ISidebarProps) => {
  const loggedInTabs = [
    {
      title: "Tableau de bord",
      pathname: "/tableau-de-bord",
    },
    {
      title: "Tâches",
      pathname: "/taches",
    },
    {
      title: "Invités",
      pathname: "/invites",
    },
    {
      title: "Tables",
      pathname: "/tables",
    },
    {
      title: "Budget",
      pathname: "/budget",
    },
    {
      title: "Réception",
      pathname: "/reception",
    },
    {
      title: "Paramètres",
      pathname: "/parametres",
    },
  ]

  const [selectedTab, setSelectedTab] = useState<string | undefined>(`/tableau-de-bord`);
  const tabs: NavigationDataType[] = NavigationData;
  
  const handleClick = (pathname: string) => {
    const selected = tabs.find((tab) => tab.pathname === pathname);
    setSelectedTab(selected?.pathname);
  }
  
  console.log("🚀 ~ useEffect ~ selectedTab:", selectedTab)
  
  useEffect(() => {
    const selected = tabs.find((tab) => tab.pathname === selectedTab);
    setSelectedTab(selected?.pathname);
    console.log("🚀 ~ useEffect ~ selectedTab:", selectedTab)
  }, [selectedTab, tabs]);

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
                to={`/mariage/${userInfos?.id}${val.pathname}`}
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
