import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Button from "../../../../components/LargeButton/LargeButton";
import "../../../components/LargeButton/LargeButton.css";
import axios from "axios";


const Login = props => {

    const history = useHistory();
    
    const [admin, setAdmin] = useState({email: '', password: ''})

    const handleChange = (e) => {
        const {value, name} = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(admin)
        alert("submitted!")
        axios.post("/api/auth/adminLogin", admin)
            .then((res) => {
                console.log(res.data)
                if(res.data != null){
                    alert("Bienvenue.")
                    localStorage.setItem("token", res.data.token)
                    const token = localStorage.getItem('token')
                    console.log(token)
                    if(token){
                        setTimeout(() => {
                            window.location.reload();
                            history.push("/menuAdm");
                        }, 1500);
                    }
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                   
                   <div className="reg-input input-mail">
                       <label htmlFor="floatingInput">Adresse e-mail</label>
                       <input
                       className="form-control"
                       // id="floatingInput"
                       name="email"
                       type="email"
                       value={admin.email}
                       onChange={handleChange}
                       placeholder="name@example.com"
                       autoComplete="email"
                       />
                   </div>

                   <div className="reg-input input-password">
                       <label>Mot de passe</label>
                       <input
                       name="password"
                       type="password"
                       value={admin.password}
                       onChange={handleChange}
                       placeholder="Password"
                       autoComplete="current-password"
                       />
                   </div>
                   <div className="center-x">
                       <Button title="Valider"><Link to={"/menuAdm"}></Link></Button>
                   </div>
           </form>
        </div>
    )
}
export default withRouter(Login)