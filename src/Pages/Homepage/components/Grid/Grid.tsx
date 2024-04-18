import "./style.css";

import React from 'react'

import dashboardCards from "../../data";
import Card from "../../Card";

import img from "../../../../img/home/mobile-browser.svg";

const HomeGrid = () => {
  return (
    <section className='presentation-section'>
        <div className='presentation-wrapper'>
          <div className="description-cards">
            <h2>Comment ça fonctionne</h2>
            <div className="title">
              <span>Triez vos listes d'amis, dépenses et bien d'autres</span>
            </div>
          </div>
          <div id="presentation-details">
            <div id="details-img">
              <img src={img} alt="mobile view" />
            </div>
            <div id="details-description">
              <div className="description-cards">
                <h2>Comment ça fonctionne</h2>
                <div className="title">
                  <span>Triez vos listes d'amis, dépenses et bien d'autres</span>
                </div>
              </div>
              <div className='cards-container'>
                {dashboardCards.map((card, i) => {
                  return (
                    <Card
                      index={i}
                      icon={card.icon}
                      title={card.title}
                      description={card.description}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HomeGrid;