import "../Header.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ISidebarProps, NavigationDataType, WeddingProps } from "../../../../types/index";
import { NavigationData } from "./NavigationData";
import profilePicture from "../../../img/couple-img.jpg";

const Sidebar = ({ userInfos }: ISidebarProps) => {

  const id: string | undefined = userInfos?.mariageID;
  const [wedding, setWedding] = useState<WeddingProps>(undefined);
  const [selectedTab, setSelectedTab] = useState<string | undefined>(window.location.pathname);
  const tabs: NavigationDataType[] = NavigationData;

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`/api/admin/wedding/${id}`, { withCredentials: true })
        .then((res) => {
          setWedding(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [id]);

  const firstPerson = wedding?.["firstPerson"];
  const secondPerson = wedding?.["secondPerson"];

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
          {loading ? "" : `${firstPerson} & ${secondPerson}`}
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
