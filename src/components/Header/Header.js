import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import "./Header.css";
import Login from "../Navigation/Log_in";
import Logout from "../Navigation/Log_out";

const Header = ({ userInfos: { invitationID } }) => {
    console.log(userInfos, "!!!!")
    console.log("hey")

    const token = localStorage.getItem("token");
        let navigation;
        if(token === null) {
            navigation =  <Logout />
        } else 
            navigation =  <Login invitationId={invitationID}/>
    return (
        <div className="header">
            {navigation}
        </div>
    )
}


export default withRouter(Header);
