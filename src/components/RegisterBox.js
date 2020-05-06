import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from './Button';
import decode from "jwt-decode"; // permet de decoder un token directement sur le front


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

    
  getToken() {
    return localStorage.getItem("token");
  }

  loggedIn() {
    const token = this.getToken(); 
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      console.log(" decoded ", decoded);
      if (decoded.exp < Date.now() / 1000) {
        // on check la date d'expiration qui est dans le token 
        return true; // token expiré
      } else return false;
    } catch (err) {
      return false;
    }
  }

  componentDidMount() {
    if (this.loggedIn()) {
      this.props.history.replace("/menuAdm");
    }
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
            localStorage.setItem("token", res.token);
            this.props.history.replace("/menuAdm");
        });
      }

    render(){

        return (
            <div className="registerBox">
                <h1>Inscription</h1>

                <form onSubmit={this.handleSubmit}>

                    <div className="reg-input input-title">
                    <label>Title of event</label><br />
                    <input
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Choose a title for your event"
                    />
                    </div>
                
                    <div className="reg-input input-person">
                        <label>First Person</label><br />
                        <input
                        name="firstPerson"
                        type="text"
                        value={this.state.firstPerson}
                        onChange={this.handleChange}
                        placeholder="Enter a name"
                        />
                    </div>

                    
                    <div className="reg-input input-person">
                        <label>Second Person</label><br />
                        <input
                        name="secondPerson"
                        type="text"
                        value={this.state.secondPerson}
                        onChange={this.handleChange}
                        placeholder="Enter a name"
                        />
                    </div>

                    <div className="reg-input input-mail">
                        <label>Email address</label><br />
                        <input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter an email"
                        />
                    </div>

                    <div className="reg-input input-password">
                        <label>Password</label><br />
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

export default withRouter(RegisterBox);
