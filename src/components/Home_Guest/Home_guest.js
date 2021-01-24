import React, { Component } from 'react';
import "./Home_guest.css";
import FairePart from "./Faire-part/Faire-part.js";
import SideTab from "./Side-tab/Side-tab";

export default class Home_guest extends Component {
    render() {
        return (
            <div className="home-guest">
                <FairePart />
                <SideTab />
            </div>
        )
    }
}
