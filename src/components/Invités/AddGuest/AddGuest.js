import React, { Component } from 'react';
import "./AddGuest.css";
import Button from "../../LargeButton/LargeButton";

export default class AddGuest extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = () => {
        console.log("triggered");
        this.props.onSubmit();
    }
 
    render() {

        return (
            <div className="add-guest-form">
                <div className="guest-form-label"><span>Nouvel.le invité.e</span></div>
                {/* <select className="selectGroup" onChange={this.getGuests}>
                {groupName}
                </select> */}
                <div className="add-guest-btn">
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Séparez les noms par une virgule"></input><br />
                        <Button title="Valider"/>
                    </form>
                </div>
            </div>
        )
    }
}
