import React, { Component } from 'react';
import "./Home_guest.css";
import FairePart from "./Home_Guest/Faire-part/Faire-part.js";
import SideTab from "./Home_Guest/Side-tab/Side-tab";

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
