import React, { Component } from 'react';
import "./AddGuest.css"

export default class AddGuest extends Component {
    render() {
        return (
            <div className="add-guest-form">
                <div className="guest-form-label"><span>Nouvel.le invité.e</span></div>
                <select></select>
                <div className="add-guest-btn">
                    <button>Ajouter un nouvel invité</button>
                </div>
            </div>
        )
    }
}
