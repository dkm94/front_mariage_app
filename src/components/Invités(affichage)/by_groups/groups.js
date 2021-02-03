import React, { useState, useEffect } from "react";
import axios from "axios";

const Bygroups = () => {
    const [groups, setGroups] = useState([]);
    // const [inputGuest, setInputGuest] = useState()
    // const [selectedGuest, setSelectedGuest] = useState({name:"", key: ""})

    useEffect(() => {
        const fetchData = async () => {
            console.log("coucou")
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/groups/", config)
            setGroups(result.data)
            // console.log("updated")
        }
        fetchData();
        // console.log("mounted")
    }, [])

    // const getGuestId = (e) => {
    //     e.preventDefault();
    //     setSelectedGuest(initialState)
    //     console.log(selectedGuest)
    // }

    // const deleteGuest = (id) => {
    //     useEffect(() => {
    //         const fetchData = async () => {
    //             console.log("coucou")
    //             const token = localStorage.getItem("token");
    //             const config = {
    //                 headers: { Authorization: 'Bearer '+ token }
    //               };
    //             const result = await axios.get("/api/admin/groups/", config)
    //             setGroups(result.data)
    //             // console.log("updated")
    //         }
    //         fetchData();
    //         // console.log("mounted")
    //     }, [])
    // }

    return(
        <div className="bygroups">
            <h1>Affichage par groupes</h1>
            {groups.map(({name, guestID}, i) => {
                return <div key={i} className="divGroup">
                    <div className="groupName"><h1>{name}</h1></div>
                
                    {guestID.map((guest, j) => {
                        return <div className="groupGuests"><p key={j} data-id={guest._id}>{guest.name}</p><button>v</button><button>x</button></div>
                    })}
                </div>
            })}
        </div>
    )
}

export default Bygroups;