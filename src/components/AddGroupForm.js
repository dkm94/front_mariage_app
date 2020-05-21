import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "./Button";
// import axios from "axios";

class AddGroupForm extends Component {
        constructor(props) {
            super(props)
            this.state = {
                name: "",
                mail: ""
            }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        }

        handleChange(e) {
        const target = e.target; 
        const value = target.value; 
        let name = target.name;
        this.setState({[name]: value})
            // console.log("oui")
            console.log(name)
        }

        handleSubmit(e) {
            e.preventDefault();
            const token = localStorage.getItem("token")
            console.log("Submit ok");
        
            const { name, mail } = this.state;
        
            fetch('http://localhost:3050/admin/newGroup', 
            { method: 'POST', 
            body: JSON.stringify({
                name, mail}),
                headers: {Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token} })
            .then(res => res.json()) 
            .then(this.props.history.replace('/menuAdm'))
        }   
    
    render(){

        return (
            <div className="groupesBox" style={{display: this.props.visible ? 'flex' : 'none'}}>
                <form encType="application/x-www-form-urlencoded" method="post" onSubmit={this.handleSubmit}>
                    <label>Nom
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </label>

                    <label>Email
                    <input type="email" name="mail" value={this.state.mail} onChange={this.handleChange}/>
                    </label>
                    <Button />
                </form>
            </div>
        )
    }
}

export default withRouter(AddGroupForm);
