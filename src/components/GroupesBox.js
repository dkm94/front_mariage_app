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
      
        this.showForm = this.showForm.bind(this);
        this.getGroup = this.getGroup.bind(this);
    }

    showForm = () => {

        this.setState({
            visible : true
        })
        
    }

    getGroup = () => {
        const token = localStorage.getItem("token")
        console.log(token)
        axios.get("http://127.0.0.1:3050/groups",
        {headers: {Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token} })
          .then(res => {
            return res.data
          })
          .then(group => {
            // const groups = res.data;
            this.setState({ group });
            console.log(group)
          })
          .catch((err)=>console.log('err:' + err));
      }

    componentDidMount(){
        this.getGroup()
    }
    
    render(){
    
        const groupName = this.state.group.map(item => <option value={item.id}>{item.name}</option>)
        console.log(this.state.group)
      
        return (
            <div className="groupesBox">
                <h1>Mes groupes</h1>
                {/* {group} */}
                <div className="divSelectGroup">
                <label>Sélectionner un groupe</label><br/>
                <select className="selectGroup" onClick={this.getGroup}>
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
