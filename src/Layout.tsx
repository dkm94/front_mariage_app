import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";

import TopNav from "./components/Header/Navigation/Top/NavbarWithUser";
import LoggedOutNavigation from "./components/Header/Navigation/Log_out";
import Sidebar from "./components/Header/Navigation/Sidebar";
import VerticalNavbar from "./components/Header/Navigation/Responsive/VerticalNavbar/VerticalNavbar";
import { UserType } from "../types/index";

const Layout = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token: string | null = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      setUser(decode(token));
      setLoading(false);
    }
  }, [token])

  axios.defaults.baseURL = "https://my-wedding-backend.onrender.com/";
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  return (
    <Router>
      <div className="navigation-layout">
        {token ? <TopNav /> : <LoggedOutNavigation />}
        <div className={token ? "body-content" : "body-content___home"}>
          {token && <Sidebar userInfos={user} loading={loading} />}
          {token && <VerticalNavbar userInfos={user} loading={loading} />}
          {children}
        </div>
      </div>
    </Router>
  );
};

export default Layout;
