import React from "react";
import axios from "axios";
import decode from "jwt-decode";
import { BrowserRouter as Router } from "react-router-dom";

import TopNav from "./components/Header/Top-Navbar";
import LoggedOutNavigation from "./components/Header/Navigation/Log_out";
import Sidebar from "./components/Header/Navigation/Sidebar";
import VerticalNavbar from "./components/Header/Navigation/Responsive/VerticalNavbar/VerticalNavbar";

const Layout = ({ children }) => {
  const token = localStorage.getItem("token");

  let user;
  if (token) {
    user = decode(token);
  }

  axios.defaults.baseURL = "https://my-wedding-backend.onrender.com/";
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  return (
    <Router>
      <div className="navigation-layout">
        {token ? <TopNav userInfos={user} /> : <LoggedOutNavigation />}
        <div className={token ? "body-content" : "body-content___home"}>
          {token && <Sidebar userInfos={user} />}
          {token && <VerticalNavbar userInfos={user} />}
          {children}
        </div>
      </div>
    </Router>
  );
};

export default Layout;
