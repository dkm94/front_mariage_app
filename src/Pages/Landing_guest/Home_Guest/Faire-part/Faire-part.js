import React, { Component } from 'react';
import "./Faire-part.css";
import couple from "../../../../img/couple.jpg"

export default class FairePart extends Component {
    render() {
        return (
            <div className="fp container">
                <div className="fp-photo">
                    <img alt="by StockSnap from Pixabay" src={couple} />
                </div>
                <div className="fp-text">
                    <p className="announcement">Vous êtes cordialement invité.e au mariage de</p>
                    <p className="name">Julie</p>
                    <p className="and">&</p>
                    <p className="name">Martin</p>
                </div>
            </div>
        )
    }
}
