import React, { useState, useEffect } from "react";
import axios from "axios";

const Byguests = () => {
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({name: ''})

    useEffect(() => {
        const fetchData = async () => {
            console.log("coucou")
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/guests/", config)
            setGuests(result.data)
        }
        fetchData();
    }, []) 

    const handleChange = (e) => {
        const {value, name} = e.target;
        setNewGuest(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (guest) => {
        alert("submitted!")
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.post("/api/admin/guests/add", {name: guest}, config)
            .then((res) => {
                console.log(res.data)
                if(res.data != null){
                    const updatedGuestsList = [newGuest, ...guests]
                    setGuests(updatedGuestsList)
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteGuest = (id) => {
        alert("submitted !")
        console.log(id)
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
        };
        axios.delete(`/api/admin/guests/delete/${id}`, config)
            .then(result => {
                console.log(result.data)
                if(result.data != null) {
                    alert("Invité supprimé.");
                    setGuests(guests.filter(guest => guest._id !== id))
                }
            })
    }

    return(
        <div className="byguests">
            <h1>Affichage par invités</h1>
            <div className="guest-form">
                <form onSubmit={() => handleSubmit(newGuest.name)}>
                    <label>Ajouter un groupe</label>
                    <input
                    type="text"
                    name="name" 
                    value={newGuest.name} 
                    onChange={handleChange}/>
                    <button type="submit">OK</button>
                </form>
            </div>
            <div>
            {guests.map(({name, _id}, i) => {
                return <div key={i} className="divGuest">
                    <div className="guestName">
                        <h1>{name}</h1>
                        <button onClick={() => {deleteGuest(_id)}}>x</button>
                    </div>
                </div>
            })}
            </div>
        </div>
    )
}

export default Byguests;