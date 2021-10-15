import React from "react";
import axios from "axios";
import decode from "jwt-decode";
import { BrowserRouter as Router } from "react-router-dom";
import TopNav from "../src/components/Header/Top-Navbar";
import LoggedOutNavigation from "../src/components/Header/Navigation/Log_out";
import Sidebar from "./components/Header/Navigation/Sidebar";

const Layout = ({ children }) => {

    const token = localStorage.getItem("token");

    let user;
    if(token){
        user = decode(token)
    }

    axios.defaults.baseURL = 'https://backend-mywedding-app.herokuapp.com';
    // axios.defaults.baseURL = 'http://localhost:3050';
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
    
        return(
        <Router>
            <div className="navigation-layout">
                {token ? <TopNav userInfos={user}/> : <LoggedOutNavigation />}
                <div className={token ? "body-content" : "body-content___home"}>
                    {token ? <Sidebar userInfos={user}/> : null}
                    {children}
                </div>
            </div>
        </Router>
    )
}


export default Layout;