import "./Home2.css";
import React from "react";
import { HomeCarousel, HomeGrid, HomeHeader, HomeSignup } from "./components";

const HomeAlt = () => {
    return(
        <div className="home-container">
            <HomeHeader />
            <HomeSignup />
            <HomeCarousel />
            <HomeGrid />
        </div>
    )
}
export default HomeAlt;