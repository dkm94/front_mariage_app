import React, { useState, useEffect } from "react";
import "./Faire-part.css";
import axios from "axios";
import decode from "jwt-decode";
import couple from "../../../../img/couple.jpg";

const Card = () => {
    
    const initialState = {
        title: '', firstPerson: '', secondPerson: '', picture: '', date: '', eventsID: [], infos: ''
    }
    const [weddingImg, setweddingImg] = useState({})
    const [invitation, setinvitation] = useState(initialState);
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const decoded = decode(token);
            const invitationID = decoded.invitationID;
            // const config = {
            //     headers: {

            //         'Authorization': `Bearer ${token}`
            //       //   Authorization: `Bearer ${token}`
            //       }
            // }
            const result = await axios.get(`/api/admin/invitation/page/${invitationID}`);
            // const image = await axios({
            //     method: 'get',
            //     url: `/api/admin/invitation/page/picture/`,
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     },
            //     params: {
            //         filename: result.data.picture
            //     }
            // })
            const image = await axios.get(`/api/admin/invitation/page/picture/${result.data.picture}`)
             .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
              console.log(image)
            //   console.log(result)
            setinvitation(result.data)
            // console.log(image.config.url)
            setweddingImg(image)
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const img = await axios({
    //             method: 'get',
    //             url: `https://backend-mywedding-app.herokuapp.com/api/admin/invitation/page/picture/${invitation.picture}` ,
    //             responseType: 'stream'
    //           })
    //             .then(res => {
    //             //   res.data.pipe(fs.createWriteStream(invitation.picture))
    //             })
    //             .catch(err => console.log(err))
    //         setweddingImg(img)
    //         console.log(img);
    //     }
    //     fetchData();
    // }, [])


    const schedule = events.map((obj, i) => {
        // console.log(events)
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
    
    console.log(weddingImg)
    return(
        <>
        <div className="wedding-img">
            {invitation.picture === "" ? 
            <img alt="notre mariage" src={couple}/> :
            // <img alt="notre mariage" src={`/public/${invitation.picture}`}/>
            
            <img alt="notre mariage" src={`http://backend-mywedding-app.herokuapp.com${weddingImg}`} />
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