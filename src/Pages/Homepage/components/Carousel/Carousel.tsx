import "./style.css";

import React from 'react';

import desktopScreen from "../../../../img/home/iMac 24_ - Silver.png";
import mobileScreen from "../../../../img/home/iPhone 14 - Purple.png";
import tabletScreen from "../../../../img/home/iPad-frame.png";

const HomeCarousel = () => {
  return (
    <div id="home-screens-wrapper">
      <div id="home-screens">
        <img src={desktopScreen} alt="desktop view" />
        <img src={tabletScreen} alt="tablet view" />
        <img src={mobileScreen} alt="mobile view" />
      </div>
    </div>
  )
}

export default HomeCarousel;