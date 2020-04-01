import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class RegisterBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            firstPerson: "",
            secondPerson: "",
            email: "",
            password: "",
            mariageID: "",
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
}

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Register Submitted");
    
        const { title, firstPerson, secondPerson, password, email, mariageID} = this.state;
    
        fetch(`http://localhost:3050/auth/register`, {
          headers : {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            title,
            firstPerson,
            secondPerson,
            email,
            password,
            mariageID
          })
        })
        .then(res => res.json())
        .then(res => {
          console.log("resultat du fetch : ", res);
        //   localStorage.setItem("token", res.token);
        });
      }

    render(){

        return (
            <div className="registerBox">
                <h1>SIGN UP</h1>

                <form onSubmit={this.handleSubmit}>

                    <div className="input-title">
                    <label>Title of event</label><br />
                    <input
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Choose a title for your event"
                    />
                    </div>
                
                    <div className="input-person">
                        <label>First Person</label><br />
                        <input
                        name="firstPerson"
                        type="text"
                        value={this.state.firstPerson}
                        onChange={this.handleChange}
                        placeholder="Enter a name"
                        />
                    </div>

                    
                    <div className="input-person">
                        <label>Second Person</label><br />
                        <input
                        name="secondPerson"
                        type="text"
                        value={this.state.secondPerson}
                        onChange={this.handleChange}
                        placeholder="Enter a name"
                        />
                    </div>

                    <div className="input-mail">
                        <label>Email address</label><br />
                        <input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter an email"
                        />
                    </div>

                    <div className="input-password">
                        <label>Password</label><br />
                        <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Enter a password"
                        />
                    </div>
            
                <button type="submit">Submit</button>
            </form>
            </div>
        )
    }
}

export default withRouter(RegisterBox);
