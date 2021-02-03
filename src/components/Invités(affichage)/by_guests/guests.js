import React, { useState, useEffect } from "react";
import axios from "axios";

const Byguests = () => {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("coucou")
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/guests/", config)
            setGuests(result.data)
            // console.log("updated")
        }
        fetchData();
        // console.log("mounted")
    }, []) 

    return(
        <div className="byguests">
            <h1>Affichage par invités</h1>
            {guests.map(({name}, i) => {
                return <div key={i} className="divGroup">
                    <div className="groupName"><h1>{name}</h1></div>
                </div>
            })}
        </div>
    )
}

export default Byguests;