import React from 'react';
import { withRouter } from 'react-router-dom';
import "../Header.css";
import { NavigationData } from "./NavigationData";

const Login = () => {
    
        return (

            <nav className="sidebar">
                <ul className="sidebarList">
                    {NavigationData.map((val, key) => {
                        return(
                            <li 
                                key={key}
                                className="menu-row"
                                id={window.location.pathname === val.pathname ? "active" : ""}
                                onClick={() => {window.location.pathname = val.pathname}}
                            >
                                <div id="icon">{val.icon}</div>
                                <div id="title">{val.title}</div>
                            </li>
                        )
                    })}
                </ul>
                    
            </nav>

        )
}
export default withRouter(Login);
