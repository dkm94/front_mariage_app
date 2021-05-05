import React, { useState, useEffect } from "react";
import "./Faire-part.css";
import "../../Home_Guest/Faire-part/Faire-part.css";
import axios from "axios";
import couple from "../../../../img/couple.jpg";

const Card = ({ userInfos }) => {

    const invitationId = userInfos.invitationID;
    
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
            const result = await axios.get(`/api/admin/invitation/page/${invitationId}`, {withCredentials: true});
            setinvitation(result.data)
        }
        fetchData()}, [invitationId])
       

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
                <p>{obj.eventTime.replace('T', ' à ')}</p>
                <p>{obj.eventAddress}</p>
            </li>
        )
    })
    
    return(
        <>
        <div className="wedding-infos">
            <div className="fp container">
                <div className="fp-photo">
                {invitation.picture ? 
                <img alt="notre mariage" src={`http://backend-mywedding-app.herokuapp.com/api/admin/invitation/page/picture/${invitation.picture}`} />
                    :
                // setTimeout(() => {
                // }, 10000) :
                // <img alt="notre mariage" src={`/public/${invitation.picture}`}/>
                setTimeout(() => {
                    <img alt="notre mariage" src={couple}/>
                }, 2500)
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