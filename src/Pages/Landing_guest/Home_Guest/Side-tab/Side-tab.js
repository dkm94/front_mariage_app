import React, { Component } from 'react';
import "./Side-tab.css";

export default class SideTab extends Component {
    render() {
        return (
            <div className="sidetab container">
                <div className="tab"><span>Invitation</span></div>
                <div className="tab"><span>Lieu</span></div>
                <div className="tab"><span>Infos complémentaires</span></div>
            </div>
        )
    }
}
