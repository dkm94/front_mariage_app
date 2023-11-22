import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";

import TopNav from "./components/Header/Navigation/Top/NavbarWithUser.tsx";
import LoggedOutNavigation from "./components/Header/Navigation/Log_out.tsx";
import Sidebar from "./components/Header/Navigation/Sidebar.tsx";
import VerticalNavbar from "./components/Header/Navigation/Responsive/VerticalNavbar/VerticalNavbar.tsx";
import { UserType } from "../types/index.ts";

const Layout = ({ children }) => {
  const token: string | null = localStorage.getItem("token");

  let user: UserType;
  if (token) {
    user = decode(token);
  }

  axios.defaults.baseURL = "https://my-wedding-backend.onrender.com/";
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  return (
    <Router>
      <div className="navigation-layout">
        {token ? <TopNav /> : <LoggedOutNavigation />}
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
