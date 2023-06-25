import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "../Header.css";
import { NavigationData } from "./NavigationData";
import profilePicture from "../../../img/couple-img.jpg";
import axios from "axios";

const Login = (props) => {
  const id = props.userInfos.mariageID;
  const [weddingId, setWeddingId] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/admin/wedding/${id}`, { withCredentials: true })
        .then((res) => {
          setWeddingId(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [id]);

  const firstPerson = weddingId["firstPerson"];
  const secondPerson = weddingId["secondPerson"];

  return (
    <nav className="sidebar">
      <div className="sidebar__greetings">
        <div className="profile-picture">
          <img alt="profile" src={profilePicture} />
        </div>
        <p className="names">{`${firstPerson} & ${secondPerson}`}</p>
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
