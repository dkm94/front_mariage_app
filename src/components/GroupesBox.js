import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AddGroupForm from "./AddGroupForm";
import axios from "axios";

class GroupesBox extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            visible: false,
            value: " ",
            group: []
        };
      
        this.showForm = this.showForm.bind(this)
    }

    showForm = () => {

        this.setState({
            visible : true
        })
        
    }

    render(){
        const group = axios.get("http://wwww.localhost:3050/getAllGroups")
        .then(group => group.data)
        .then(a => {if (a) {
            this.setState({group: a})
        }}
             )
        const groupName = this.state.group.map(item => <option value={item.id}>{item.name}</option>)
        // console.log(group)
        // .then(b => console.log(b.name))
        return (
            <div className="groupesBox">
                <h1>Mes groupes</h1>
                {/* {group} */}
                <div className="divSelectGroup">
                <label>Sélectionner un groupe</label><br/>
                <select className="selectGroup">
                {groupName}
                {/* <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option> */}
                </select>
                <button type="button" onClick={this.showForm}>+</button>
                </div>
                
                <AddGroupForm visible={this.state.visible}/>
            </div>
        )
    }
}

export default withRouter(GroupesBox);
