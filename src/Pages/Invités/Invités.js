import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Byguests from "../../components/Invités(affichage)/by_guests/guests";
import Bygroups from "../../components/Invités(affichage)/by_groups/groups";
import "./Invités.css";
import axios from "axios";

const Guests = () => {
    const [selectedSection, setSelectedSection] = useState("");
    const [newGroup, setNewGroup] = useState({name: '', email: ''})

    const handleChange = (e) => {
        const {value, name} = e.target;
        setNewGroup(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        alert("submitted!")
        e.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.post("/api/admin/groups/add", newGroup, config)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)})
    }

    const selectSection = (e) => {
        setSelectedSection(e.target.value)
    }

    let section;
    if (selectedSection ===  "guests"){
        section = <Byguests/>
    } else
        section = <Bygroups/>
 
    return(
        <div className="guest-component">
            <div className="guest-form">
                <form onSubmit={handleSubmit}>
                    <label>Ajouter un groupe</label>
                    <input
                    type="text"
                    name="name" 
                    value={newGroup.name} 
                    onChange={handleChange}/>
                    <input
                    type="email"
                    name="email" 
                    value={newGroup.email} 
                    onChange={handleChange}/>
                    <button type="submit">OK</button>
                </form>
            </div>
            <div className="select-section">
                <label htmlFor="affichage-select">Affichage par:</label>
                <select name="affichage" onChange={selectSection}>
                    <option value="groups">groupes</option>
                    <option value="guests">invités</option>
                </select>
            </div>
            <div className="section">
                {section}
            </div>
        </div>
    )
}

export default withRouter(Guests)