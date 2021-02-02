import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AddGroupForm from "./AddGroup/AddGroupForm";
import AddGuestForm from "./AddGuest/AddGuest";
import decode from "jwt-decode";
import "./Invités.css"
import axios from "axios";

class Invités extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            groups: [],
            visible: false,
            groupName: "",
            mail: "",
            guests: [],
            guestName: "",
            selectedGroup: ""
        };
    }


    componentDidMount(){
        const token = localStorage.getItem("token")
        const admin = decode(token);
        console.log(token)
        console.log(admin)
        fetch("https://backend-mywedding-app.herokuapp.com/groups/" + admin.mariageID,
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

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    splitKeywords = () => {
        const guestArray = this.state.guests.split(','); 
        this.setState({ 
            guests: guestArray
        }); 
    }

    submitNewGroup = () => {
        alert("TRIGGERED");
        const token = localStorage.getItem("token")
        const admin = decode(token);
        console.log(token)
        console.log(admin)
        fetch("https://backend-mywedding-app.herokuapp.com/admin/newGroup/",
        {headers: {Accept: "application/json",
                Authorization: "Bearer " + token},
        method: "POST" })
          .then(res => {
              return res.json()
          })
          .then(groups => {
            this.setState({ groups });
            console.log(groups)
          })
          .catch((err)=>console.log('err:' + err));
    }

    submitNewGuests = () => {
        alert("TRIGGERED");

        const token = localStorage.getItem("token");
        // const admin = decode(token);
        // const mariageID = admin.mariageID
    
        const guest = {
            name: this.state.guestName,
            groupID: this.state.selectedGroup
        }

        const config = {
            headers: { Authorization: 'Bearer '+ token }
        };

        axios.post("https://backend-mywedding-app.herokuapp.com/admin/newGuest/" + guest.groupID, guest , config)
        .then(res => {
            console.log("success:", res.status)
            console.log(res.data)
            this.setState(this.state)
            // window.location.reload(false);
         })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        })
  
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

        return (
            <div className="guests container-fluid">
                <section className="guest-form">
                    <AddGroupForm onSubmit={this.submitNewGroup}/>
                    <AddGuestForm groups={this.state.groups} onSubmit={this.submitNewGuests}/>
                </section>
                

                <section className="guest-list">
                    <span>List</span>
                    <div className="divGroupbox">
                        {this.state.groups.map(({name, guestID}, i) => {
                            return <div key={i} className="divGroup">
                                <div className="groupName"><h1>{name}</h1></div>
                            
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
