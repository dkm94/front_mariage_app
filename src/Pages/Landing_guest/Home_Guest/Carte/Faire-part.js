import React, { useState, useEffect } from "react";
import "./Faire-part.css";
import axios from "axios";
import decode from "jwt-decode";

const Card = () => {
    
    const initialState = {
        title: '', firstPerson: '', secondPerson: '', date: '', eventsID: [], infos: ''
    }
    const [invitation, setinvitation] = useState(initialState);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const decoded = decode(token);
            const invitationID = decoded.invitationID;
            const result = await axios.get(`/api/admin/invitation/${invitationID}`);
            setinvitation(result.data)
        }
        fetchData();
    }, [])

    return(
        <>
        <div className="wedding-img"></div>
        <div className="wedding-infos">
            <div className="wedding-intro info">
                <h3>Invitation</h3>
                <div className="intro">
                    <span>Vous êtes cordialement invité.e.s au mariage de</span><br />
                    <span className="name">{invitation.firstPerson}</span>
                    <span className="and">&</span>
                    <span className="name">{invitation.secondPerson}</span><br />
                    <span>qui aura lieu le</span><br />
                    <span className="manuscrit">{invitation.date}</span><br />
                    <span>sur le thème</span><br />
                    <span className="manuscrit">{invitation.title}</span>
                </div>
            </div>
            <div>
                {invitation.eventsID}
            </div>
            <div className="where-when info">
                <h3>Programme</h3>
                <div className="where-when-cols">
                    <div className="where-when-col">
                        <h4>Eglise</h4>
                        <p>Eglise de Chateau-Thierry</p>
                        <p>Lundi 12 Novembre</p>
                        <p>11h00</p>
                        <p>60 Rond-Point de la Madeleine, 68900</p>
                    </div>
                    <div className="where-when-col">
                        <h4>Réception</h4>
                        <p>Salle des Fêtes Louise Michel</p>
                        <p>Lundi 12 Novembre</p>
                        <p>13h00</p>
                        <p>60 Rond-Point de la Madeleine, 68900</p>
                    </div>
                    <div className="where-when-col">
                    <h4>Soirée</h4>
                        <p>Salle des Fêtes Louise Michel</p>
                        <p>Lundi 12 Novembre</p>
                        <p>20h00</p>
                        <p>60 Rond-Point de la Madeleine, 68900</p>
                    </div>
                </div>
            </div>
            <div className="additionnal-info info">
                <h3>Informations complémentaires</h3>
                <p>{invitation.infos}</p>
            </div>
        </div>
        </>
    )
}

export default Card;