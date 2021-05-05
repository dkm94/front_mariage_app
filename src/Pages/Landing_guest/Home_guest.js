import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import "./Home_guest.css";
import Card from "../Landing_guest/Home_Guest/Carte/Faire-part";
import Form from "../Landing_guest/Home_Guest/Backoffice/Invitation-form";

const Landing = ({ userInfos }) => {

    const [selectedSection, setSelectedSection] = useState("");

    const selectSection = (e) => {
        setSelectedSection(e.target.value)
    }

    let section;
    if (selectedSection ===  "invitation"){
        section = <Card userInfos={userInfos}/>
    } else
        section = <Form userInfos={userInfos}/>

        
        const changeBackground = () => {
            if(section.type.name === 'Card'){
                document.getElementById("invitation__").classList.add("invitation-bg")
            } else
                document.getElementById("invitation__").classList.remove("invitation-bg")
        }

        const selectButtonStyle = () => {
            if(section.type.name === 'Card'){
                document.getElementById("select-style").classList.add("select-btn-card")
            } else
                document.getElementById("select-style").classList.remove("select-btn-card")
        }

        const changeStyle = () => {
            changeBackground();
            selectButtonStyle();
        }

        return (
            <div className="invitation" id="invitation__" onClick={changeStyle}>
                <div className="select-section" id="select-style">
                    {/* <label htmlFor="affichage-select">Affichage par:</label> */}
                    <select name="affichage" onChange={selectSection}>
                        <option value="form">Modifier l'invitation</option>
                        <option value="invitation">Voir aperçu</option>
                    </select>
                    <div className="section">
                        {section}
                    </div>
                </div>
            </div>
        )
}

export default withRouter(Landing);
