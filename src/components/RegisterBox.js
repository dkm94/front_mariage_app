import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from './Button';
// import decode from "jwt-decode"; // permet de decoder un token directement sur le front


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
    
        fetch('http://localhost:3050/auth/register', {
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
            localStorage.setItem("token", res.token);
            this.props.history.replace("/menuAdm");
        });
      }

    render(){

        return (
            <div className="registerBox">
                <h1>Inscription</h1>

                <form onSubmit={this.handleSubmit}>

                    <div className="reg-input input-title dims-input">
                    <label>Title of event</label>
                    <input
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Choose a title for your event"
                    />
                    </div>

                    <section>
                    <div className="reg-input input-person dims-input w-input">
                        <label>First Person</label>
                        <input
                        name="firstPerson"
                        type="text"
                        value={this.state.firstPerson}
                        onChange={this.handleChange}
                        placeholder="Enter a name"
                        />
                    </div>

                    
                    <div className="reg-input input-person dims-input w-input">
                        <label>Second Person</label>
                        <input
                        name="secondPerson"
                        type="text"
                        value={this.state.secondPerson}
                        onChange={this.handleChange}
                        placeholder="Enter a name"
                        />
                    </div>
                    </section>

                    <section>
                    <div className="reg-input input-mail dims-input w-input">
                        <label>Email address</label>
                        <input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter an email"
                        />
                    </div>

                    <div className="reg-input input-password dims-input w-input">
                        <label>Password</label>
                        <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Enter a password"
                        />
                    </div>
                    </section>
                    <Button />
            </form>
            </div>
        )
    }
}

export default withRouter(RegisterBox);
