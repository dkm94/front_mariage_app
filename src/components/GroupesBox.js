import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AddGroupForm from "./AddGroupForm";
import jwt from "jwt-decode";
// import GroupID from "./GroupID";
// import axios from "axios";

class GroupesBox extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            visible: false,
            groups: []
            // guests: []
        };
        // this.myRef = React.createRef();
        // this.getGuests = this.getGuests.bind(this)
    }

    

    componentDidMount(){
        const token = localStorage.getItem("token")
        const user = jwt(token);
        console.log(token)
        console.log(user)
        fetch("http://localhost:3050/groups/" + user.mariageID,
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


    showForm = () => {

        this.setState(prevState => ({
            visible: !prevState.visible
        })
        )

    }

    openProfile = (e) => {
        const token = localStorage.getItem("token")
        var guest = e.target
        console.log(guest)
        var guestID = guest.getAttribute('data-id');
        console.log(guestID)  

         fetch("http://localhost:3050/guest/" + guestID,
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
    
        // const groupName = this.state.groups.map((item, i) => (<option key={item._id} value={item._id}>{item.name}</option>))
        // console.log(groupName)


        return (
            <div className="groupesBox">
                <h1>Mes groupes</h1>
            
                {/* <label>Sélectionner un groupe</label><br/>

                <select className="selectGroup" onChange={this.getGuests}>
                {groupName}
                </select> */}
                <button type="button" onClick={this.showForm}>Ajouter un nouveau groupe+</button>

                <AddGroupForm visible={this.state.visible}/>

                <div className="divGroupbox">
                    {this.state.groups.map(({name, guestID}, i) => {
                        return <div key={i} className="divGroup">
                            <h1>{name}</h1>
                            {guestID.map((guest, j) => {
                                return <p key={j} onClick={this.openProfile} data-id={guest._id}>{guest.name}</p>
                            })}
                            <p>Modifier</p>
                    </div>
                    })}
                </div>
                
            </div>
        )
    }
}

export default withRouter(GroupesBox);
