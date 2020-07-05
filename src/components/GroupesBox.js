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


    // getGuests(e) {
    //     const token = localStorage.getItem("token")
    //     const id = e.currentTarget
    //     console.log(id)


    //     // const children = id.childNodes[1].value
    //     // console.log(children)
    //     // const node = this.myRef.current
    //     // const id = node.value
    //     // console.log(id)
    
    //     // const id = node.getAttribute('value')

    //     axios.get("http://127.0.0.1:3050/group/" + id,
    //     {headers: {Accept: "application/json",
    //             'Content-Type': 'application/json',
    //             Authorization: "Bearer " + token} },
    //     {params: id})
    //       .then(res => {
    //         return res.data
    //       })
    //       .then(guests => {
    //         const guestsID = this.state.guests.map((guest) => guest.name);
    //         console.log(guestsID)
    //         this.setState({ guests });
    //         // console.log(group[0].guestID[0].name)
    //         console.log(this.state.guests)
    //       })
    //       .catch((err)=>console.log('err:' + err));
    // }

    render(){
    
        // const groupName = this.state.groups.map((item, i) => (<option key={item._id} value={item._id}>{item.name}</option>))
        // console.log(groupName)


        return (
            <div className="groupesBox">
                <h1>Mes groupes</h1>
                <div className="divSelectGroup">

                {/* <label>Sélectionner un groupe</label><br/>

                <select className="selectGroup" onChange={this.getGuests}>
                {groupName}
                </select> */}
                <button type="button" onClick={this.showForm}>Ajouter un nouveau groupe+</button>
                </div>

                <div>
                    {this.state.groups.map(({name, guestID}, i) => {
                        return <div key={i}>
                            <div>
                            <h1>{name}</h1>
                            {guestID.map((guest, j) => {
                                return <p key={j}>{guest.name}</p>
                            })}
                            </div>
                    </div>
                    })}
                </div>
                <AddGroupForm visible={this.state.visible}/>
                
            </div>
        )
    }
}

export default withRouter(GroupesBox);
