import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// import Button from "./Button";
// import axios from "axios";

class GroupID extends Component {
        constructor(props) {
            super(props)
            this.state = {
                guestID: ""
            }
        this.openProfile = this.openProfile.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        }


        openProfile() {
            const token = localStorage.getItem("token")
            console.log("openProfile:");
        
            const { guestID } = this.state;
        
            fetch('https://backend-mywedding-app.herokuapp.com/guest/:id', 
            { method: 'POST', 
            body: JSON.stringify({
                guestID}),
                headers: {Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token} })
            .then(res => res.data)
            this.props.history.push("/EspacePerso")
        }   
    
    render(){
        const guest = this.props.guestID.map((guest, i) => <p key={i}>{guest}</p>)
        return (
            // <div className="groupID" {...this.props.value}>    
            //         <p onClick={this.openProfile}>{this.props.guestID}</p>
            // </div>
            <div>{guest}</div>
        )
    }
}

export default withRouter(GroupID);
