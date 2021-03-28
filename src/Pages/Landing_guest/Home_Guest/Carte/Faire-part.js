import React, { useState, useEffect } from "react";
import "./Faire-part.css";
import axios from "axios";
import decode from "jwt-decode";
import couple from "../../../../img/couple.jpg";

const Card = () => {
    
    const initialState = {
        title: '', firstPerson: '', secondPerson: '', picture: '', date: '', eventsID: [], infos: ''
    }
    const [weddingImg, setweddingImg] = useState()
    const [invitation, setinvitation] = useState(initialState);
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const decoded = decode(token);
            const invitationID = decoded.invitationID;
            const result = await axios.get(`/api/admin/invitation/page/${invitationID}`);
            // const image = await axios.get(`/api/admin/invitation/page/picture/${result.data.picture}`);
            setinvitation(result.data)
            // console.log(result.data.picture)
            // setweddingImg(image)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/admin/invitation/events`);
            setEvents(result.data)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const img = await axios.get(`/api/admin/invitation/page/picture/e2e54970a3d6d2b6edb450354298f4ff.jpg`);
            setweddingImg(img)
            console.log(img);
        }
        fetchData();
    }, [])


    const schedule = events.map((obj, i) => {
        console.log(events)
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
    
    return(
        <>
        <div className="wedding-img">
            {invitation.picture === "" ? 
            <img alt="notre mariage" src={couple}/> :
            // <img alt="notre mariage" src={`/public/${invitation.picture}`}/>
            
            <img alt="notre mariage" src={`https://backend-mywedding-app.herokuapp.com/api/admin/invitation/page/picture/${weddingImg}`} />
        }
        </div>
        <div className="wedding-infos">
            <div className="wedding-intro info">
                <h3>Invitation</h3>
                <div className="wedding-card">
                    <span>Vous êtes cordialement invité.e.s au mariage de</span><br />
                    <span className="wedding-card___name">{invitation.firstPerson}</span>
                    <span className="wedding-card___and">&</span>s
                    <span className="wedding-card___name">{invitation.secondPerson}</span><br />
                    <span>qui aura lieu le</span><br />
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
            <div className="additionnal-info info">
                <h3>Informations complémentaires</h3>
                <p>{invitation.infos}</p>
            </div>
        </div>
        </>
    )
}

export default Card;