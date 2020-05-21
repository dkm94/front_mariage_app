import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from './Button';
// import decode from "jwt-decode"; // permet de decoder un token directement sur le front


class LoginBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
}

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Login Submitted");
    
        const { email, password } = this.state;
    
        fetch('http://localhost:3050/auth/adminLogin', {
          headers : {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            email,
            password
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
            <div className="loginForm">
                <h1>Connexion</h1>

                <form onSubmit={this.handleSubmit}>
                   
                    <div className="reg-input input-mail">
                        <label>Email:</label><br />
                        <input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter an email"
                        />
                    </div>

                    <div className="reg-input input-password">
                        <label>Password:</label><br />
                        <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Enter a password"
                        />
                    </div>
                    <Button />
            </form>
            </div>
        )
    }
}

export default withRouter(LoginBox);
