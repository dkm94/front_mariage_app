import React from "react";
import { Route, Redirect } from "react-router-dom";

function Admin({ isAuth: role, component: Component, ...rest}){
    // console.log(role)
    return (
        <Route
        {...rest}
        render={(props) => {
            if(role === "admin") {
                return <Component />
            } else {
                return <Redirect to={{ pathname: "/", state: { from: props.location} }}/>
            }
        }}
        />
            
    )
}

export default Admin
