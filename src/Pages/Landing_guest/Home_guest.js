import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import "./Home_guest.css";
import Card from "../Landing_guest/Home_Guest/Carte/Faire-part";
import Form from "../Landing_guest/Home_Guest/Backoffice/Invitation-form";

const Landing = ({ userInfos }) => {
    console.log(userInfos)
    const [selectedSection, setSelectedSection] = useState("");

    const selectSection = (e) => {
        setSelectedSection(e.target.value)
    }

    let section;
    if (selectedSection ===  "invitation"){
        section = <Card userInfos={userInfos}/>
    } else
        section = <Form/>

        
        const changeBackground = () => {
            if(section.type.name === 'Card'){
                document.getElementById("invitation__").classList.add("invitation-bg")
            } else
                document.getElementById("invitation__").classList.remove("invitation-bg")
        }

        return (
            <div className="invitation" id="invitation__" onClick={changeBackground}>
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
