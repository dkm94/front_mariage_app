import React from "react";
import { Route, Redirect } from "react-router-dom";

import { ProtectedRouteProps } from "../../types";

function ProtectedRoute({ isAuth, component: Component, ...rest}: ProtectedRouteProps){
    
    return (
        <Route
        {...rest}
        render={(props) => {
            if(isAuth === "admin") {
                return <Component isAuth={isAuth} props={props}/>
            } else {
                return <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
            }
        }}
        />
            
    )
}

export default ProtectedRoute;
