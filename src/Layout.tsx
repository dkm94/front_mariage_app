import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";

import TopNav from "./components/Header/Navigation/Top/NavbarWithUser";
import LoggedOutNavigation from "./components/Header/Navigation/Log_out";
import { SideNavigation } from "./components/Header/Navigation/Sidenav/Sidenavigation";

import { UserType } from "../types/index";

const Layout = ({ children }) => {
  let user:UserType;
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(true);
  const token: string | null = localStorage.getItem("token");
  
  if(token){
    user = decode(token);
  }

  useEffect(() => {
    if(user) setLoading(false);
  }, [user])


  axios.defaults.baseURL = "https://my-wedding-backend.onrender.com/";
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // axios.defaults.timeout = 4000;

  return (
    <Router>
      <div className="navigation-layout">
        {token ? <TopNav userInfos={user} /> : <LoggedOutNavigation />}
        <div className={`${token ? "body-content" : "body-content___home"} ${isOpen ? 'nav-open' : ''}`}>
          {token && <SideNavigation userInfos={user} loading={loading} setIsOpen={setIsOpen} isOpen={isOpen} />}
          {children}
        </div>
      </div>
    </Router>
  );
};

export default Layout;
