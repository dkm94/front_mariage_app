import "./style.css";

import React from 'react'
import { Container } from "@mui/material";

import dashboardCards from "../../data";
import Card from "../../Card";


const HomeGrid = () => {
  return (
    <section className='presentation-section'>
        <Container className='container'>
          <div className="section-2___titre">
            <h2>Comment ça fonctionne</h2>
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
        </Container>
      </section>
  )
}

export default HomeGrid;