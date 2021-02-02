import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "../../LargeButton/LargeButton";
import "./AddGroup.css"
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

        handleSubmit = () => {
            console.log("triggered");
            this.props.onSubmit();
        }

        // handleSubmit(e) {
        //     e.preventDefault();
        //     const token = localStorage.getItem("token")
        //     console.log("Submit ok");
        
        //     const { name, mail } = this.state;
        
        //     fetch('https://backend-mywedding-app.herokuapp.com/admin/newGroup', 
        //     { method: 'POST', 
        //     body: JSON.stringify({
        //         name, mail}),
        //         headers: {Accept: "application/json",
        //         'Content-Type': 'application/json',
        //         Authorization: "Bearer " + token} })
        //     .then(res => res.json())
        //     .then(newGroup => {
        //         this.setState({name: "", mail: ""});
        //         console.log(newGroup)
        //     })
        //     .then(window.location.reload(false))
        // }
        
        // newInput(){
            
        // }
    
    render(){

        return (
            // <div className="groupesBox" style={{display: this.props.visible ? 'flex' : 'none'}}>
            <div className="add-group-form">
                <div className="group-form-label"><span>Nouveau groupe</span></div>
                <form encType="application/x-www-form-urlencoded" method="post" onSubmit={this.handleSubmit}>

                    <label>Nom du groupe<br />
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Exemple: Famille Durand" required/>
                    </label><br />

                    <label>Email <br />
                    <input type="email" name="mail" value={this.state.mail} onChange={this.handleChange} required/>
                    </label>
                    <Button title="Valider"/>
                </form>
            </div>
        )
    }
}

export default withRouter(AddGroupForm);
