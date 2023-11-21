import "../Header.css";

import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

import { NavigationData } from "./NavigationData.ts";
import profilePicture from "../../../img/couple-img.jpg";

const Login = (props) => {
  const id = props.userInfos.mariageID;
  const [weddingId, setWeddingId] = useState({});

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

  const firstPerson = weddingId["firstPerson"];
  const secondPerson = weddingId["secondPerson"];

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
        {NavigationData.map((val, key) => {
          return (
            <li key={key} className="menu-row">
              <Link
                id={window.location.pathname === val.pathname ? "active" : ""}
                to={val?.pathname}
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
export default withRouter(Login);
