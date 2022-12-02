import React, { useState, useEffect } from "react";
import "./Faire-part.css";
import "../../Home_Guest/Faire-part/Faire-part.css";
import axios from "axios";
import couple from "../../../../img/couple.jpg";
import heart from "../../../../img/heart.png";

const Card = ({ userInfos }) => {

    const invitationId = userInfos.invitationID;
    
    const initialState = {
        title: '', 
        firstPerson: '', 
        secondPerson: '', 
        picture: '', 
        date: '',
        rsvp: '',
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
            <div className="wedding-infos container">
                <div className="fp container">
                    <div className="fp-photo">
                    {invitation.picture ? 
                    <img alt="notre mariage" src={`https://my-wedding-backend.onrender.com/api/admin/invitation/page/picture/${invitation.picture}`} />
                        :
                    // setTimeout(() => {
                    // }, 10000) :
                    // <img alt="notre mariage" src={`/public/${invitation.picture}`}/>
                    setTimeout(() => {
                        <img alt="notre mariage" src={couple}/>
                    }, 500)
                    }
                    </div>
                    <div className="fp-text">
                        <span className="name">{invitation.firstPerson_firstName} & {invitation.secondPerson_firstName}</span>
                    </div>
                </div>
            
                <div className="wedding-details">
                    <div className="wedding-details___card">
                        <div className="wedding-details___card-container___content" >
                            <div className="content___intro">Vous êtes cordialement invité.e.s au mariage de</div>
                            <div className="content___names">{invitation.firstPerson_firstName} {invitation.firstPerson_lastName} & {invitation.secondPerson_firstName} {invitation.secondPerson_lastName}</div>
                            <div className="content___date">{invitation.date}</div>
                            <div className="content___programme">{schedule}</div>
                            <div className="content___add-info">{invitation.infos}</div>
                            <div className="content___rsvp">Merci de réserver avant le {invitation.rsvp}</div>
                            <div className="content___drawing"><img alt="heart" src={heart}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;