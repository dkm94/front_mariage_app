import "./PriceCard.css";

import React from 'react';

interface PriceCardProps {
    total: string;
    }

const PriceCard = (props: PriceCardProps) => {
    const { total } = props;

  return (
    <div className="card" style={{ backgroundColor: "#fff" }}>
        <div className="g-0">
            <div className="card-pd">
                <div className="card-body">
                    <h5 className="card-title">Dépenses</h5>
                    <span>{total}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PriceCard