import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import "./Home_guest.css";
import Card from "../Landing_guest/Home_Guest/Carte/Faire-part";
import Form from "../Landing_guest/Home_Guest/Backoffice/Invitation-form";

const Landing = () => {
    const [selectedSection, setSelectedSection] = useState("");

    const selectSection = (e) => {
        setSelectedSection(e.target.value)
    }

    let section;
    if (selectedSection ===  "invitation"){
        section = <Card/>
    } else
        section = <Form/>

        return (
            <div className="invitation">
                <div className="select-section">
                    {/* <label htmlFor="affichage-select">Affichage par:</label> */}
                    <select name="affichage" onChange={selectSection}>
                        <option value="form">Modifier l'invitation</option>
                        <option value="invitation">Voir aperçu</option>
                    </select>
                </div>
                <div className="section">
                    {section}
                </div>
            </div>
        )
}

export default withRouter(Landing);
