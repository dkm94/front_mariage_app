import React from "react";
import { Route, Redirect } from "react-router-dom";

function Admin({ isAuth: role, component: Component, userInfos: user, scroll: scrollButton, ...rest}){

    return (
        <Route
        {...rest}
        render={(props) => {
            if(role === "admin") {
                return <Component userInfos={user} props={props} scroll={scrollButton}/>
            } else {
                return <Redirect to={{ pathname: "/", state: { from: props.location} }}/>
            }
        }}
        />
            
    )
}

export default Admin
