import React, { useState, useEffect } from "react";
import "./Faire-part.css";
import "../../Home_Guest/Faire-part/Faire-part.css";
import axios from "axios";
import decode from "jwt-decode";
import couple from "../../../../img/couple.jpg";

const Card = () => {
    
    const initialState = {
        title: '', 
        firstPerson: '', 
        secondPerson: '', 
        picture: '', 
        date: '', 
        eventsID: [], 
        infos: ''
    }
  
    const [invitation, setinvitation] = useState(initialState);
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const decoded = decode(token);
            const invitationID = decoded.invitationID;
            const result = await axios.get(`/api/admin/invitation/page/${invitationID}`, {withCredentials: true});
            setinvitation(result.data)
        }
        fetchData()}, [])
       

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/admin/invitation/events`);
            setEvents(result.data)
        }
        fetchData();
    }, [])

    const schedule = events.map((obj, i) => {
        return(
            <li key={i} data-id={obj._id}>
                <h4>{obj.eventTitle}</h4>
                <p>{obj.eventPlace}</p>
                <p>{obj.eventTime}</p>
                <p>{obj.eventTime}</p>
                <p>{obj.eventAddress}</p>
            </li>
        )
    })
    console.log(invitation)
    
    return(
        <>
        <div className="wedding-infos">
            <div className="fp container">
                <div className="fp-photo">
                {!invitation.picture ? 
                    <img alt="notre mariage" src={couple}/>:
                // setTimeout(() => {
                // }, 10000) :
                // <img alt="notre mariage" src={`/public/${invitation.picture}`}/>
                
                <img alt="notre mariage" src={`http://backend-mywedding-app.herokuapp.com/api/admin/invitation/page/picture/${invitation.picture}`} />
                }
                </div>
                <div className="fp-text">
                    <span className="name">{invitation.firstPerson} & {invitation.secondPerson}</span>
                    
                    <p className="announcement">Vous êtes cordialement invité.e au mariage qui se tiendra le</p>
                    <span className="wedding-card___date">{invitation.date}</span><br />
                    <span>sur le thème</span><br />
                    <span className="wedding-card___title">{invitation.title}</span>

                </div>
            </div>
            <div className="schedule info">
                <h3>Programme</h3>
                <ul className="schedule-cols">
                    {schedule}
                </ul>
            </div>
            <div className="additionnal-info info container">
                <h3>Informations complémentaires</h3>
                <p>{invitation.infos}</p>
            </div>
        </div>
        </>
    )
}

export default Card;