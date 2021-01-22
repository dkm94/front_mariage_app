import React, { Component } from 'react';
import { withRouter} from "react-router-dom";
import Button from "../LargeButton/LargeButton";
import "../LargeButton/LargeButton.css";

// import axios from 'axios';
// import decode from "jwt-decode"; // permet de decoder un token directement sur le front


class LoginForm extends Component {

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
        
        const { email, password } = this.state;
        console.log("Login Submitted");
    
        // fetch('https://backend-mywedding-app.herokuapp.com/auth/adminLogin', {
        // mode: 'no-cors',
        // credentials: 'include',  
        // headers : {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   method: "POST",
        //   body: JSON.stringify({
        //     email,
        //     password
        //   })
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //   console.log(data);
        // })
        fetch('https://backend-mywedding-app.herokuapp.com/auth/adminLogin', {
            crossDomain:true,
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              email,
              password
          })
        })
        .then(res => res.json())
        .then(response => {
          console.log("resultat du fetch : ", response);
            localStorage.setItem("token", response.token);
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
                    <div className="center-x">
                        <Button title="Valider"/>
                    </div>
            </form>
            {/* <Link to={"/register"}>Vous n'avez pas encore de compte ? Inscrivez-vous.</Link> */}
            </div>
        )
    }
}

export default withRouter(LoginForm);
