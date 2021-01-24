import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AddGroupForm from "./AddGroup/AddGroupForm";
import AddGuestForm from "./AddGuest/AddGuest";
import jwt from "jwt-decode";
import "./Invités.css"
// import axios from "axios";

class Invités extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            visible: false,
            groups: []
            // guests: []
        };
    }


    componentDidMount(){
        const token = localStorage.getItem("token")
        const user = jwt(token);
        console.log(token)
        console.log(user)
        fetch("https://backend-mywedding-app.herokuapp.com/groups/" + user.mariageID,
        {headers: {Accept: "application/json",
                Authorization: "Bearer " + token},
        method: "GET" })
          .then(res => {
              return res.json()
          })
          .then(groups => {
            this.setState({ groups });
            console.log(groups)
          })
          .catch((err)=>console.log('err:' + err));
    }


    // showForm = () => {

    //     this.setState(prevState => ({
    //         visible: !prevState.visible
    //     })
    //     )

    // }

    openProfile = (e) => {
        const token = localStorage.getItem("token")
        var guest = e.target
        console.log(guest)
        var guestID = guest.getAttribute('data-id');
        console.log(guestID)  

         fetch("https://backend-mywedding-app.herokuapp.com/guest/" + guestID,
         {headers: {Accept: "application/json",
                 Authorization: "Bearer " + token},
         method: "GET" })
           .then(res => {
               return res.json()
           })
           .then(groups => {
            this.props.history.replace("/profil");
           })
           .catch((err)=>console.log('err:' + err));
    }

    render(){
    
        const randomColor = Math.floor(Math.random()*16777215).toString(16);

        return (
            <div className="guests container-fluid">
            
                {/* <label>Sélectionner un groupe</label><br/>

                <select className="selectGroup" onChange={this.getGuests}>
                {groupName}
                </select> */}
                <section className="guest-form">
                    
                    {/* <div className="addGroupBtn">
                        <button type="button" onClick={this.showForm}>Ajouter un nouveau groupe+</button>
                    </div> */}

                    {/* <AddGroupForm visible={this.state.visible}/> */}
                    <AddGroupForm/>
                    <AddGuestForm />
                </section>
                

                <section className="guest-list">
                    <span>List</span>
                    <div className="divGroupbox">
                        {this.state.groups.map(({name, guestID}, i) => {
                            return <div key={i} className="divGroup">
                                <div className="groupName" style={{backgroundColor: "#" + randomColor}}><h1>{name}</h1></div>
                            
                                {guestID.map((guest, j) => {
                                    return <div className="groupGuests"><p key={j} onClick={this.openProfile} data-id={guest._id}>{guest.name}</p></div>
                                })}
                                <p>Modifier</p>
                            </div>
                        })}
                    </div>
                </section>
                
            </div>
        )
    }
}

export default withRouter(Invités);
