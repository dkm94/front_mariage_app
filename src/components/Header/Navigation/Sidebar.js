import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import "../Header.css";
import { UserContext } from "../../../App";
import { NavigationData } from "./NavigationData";
import axios from "axios";

const Login = (props) => {
    const id = props.userInfos.id;

    const [account, setaccount] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/api/admin/admin/myAccount/${id}`, {withCredentials: true})
                .then(res => {
                    setaccount(res.data)
                })
                .catch(err => console.log(err))
        }
        fetchData()}, [id])
    
    const firstPerson = account["firstPerson"];
    const secondPerson = account["secondPerson"];
    
        return (

            <nav className="sidebar">
                <div className="sidebar__greetings">
                    <p className="greetings">Bienvenue</p>
                    <p className="names">{firstPerson} & {secondPerson}</p>
                
                </div>
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
