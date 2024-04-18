import "./style.css";

import React from 'react';

import desktopScreen from "../../../../img/home/ios-browser-svg.svg";

const HomeCarousel = () => {
  return (
    <div id="home-screens-wrapper">
      <div className="description-screens">
        <h2>Planifiez votre mariage</h2>
        <div className="title">
          <span>Emportez votre carnet de préparatifs partout avec vous</span>
        </div>
      </div>
      <div id="home-screens">
        <img src={desktopScreen} alt="desktop view" />
        {/* <img src={tabletScreen} alt="tablet view" /> */}
        {/* <img src={mobileScreen} alt="mobile view" /> */}
      </div>
    </div>
  )
}

export default HomeCarousel;