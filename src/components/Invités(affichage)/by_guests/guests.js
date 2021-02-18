import React, { useState, useEffect } from "react";
import Button from "../../LargeButton/LargeButton";
import "./guests.css";
import axios from "axios";

const Byguests = () => {
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({name: ''})

    useEffect(() => {
        const fetchData = async () => {
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
                    setGuests([...guests].concat(guest))
                    setNewGuest({name: ''})
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteGuest = (id) => {
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
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div className="byguests">
            {/* <h1>Affichage par invités</h1> */}
            <div className="guest-form">
                <form onSubmit={() => handleSubmit(newGuest.name)}>
                    <label>Ajouter un nouvel invité</label><br />
                    <input
                    type="text"
                    name="name" 
                    value={newGuest.name} 
                    onChange={handleChange}/>
                    <button type="submit">OK</button>
                </form>
            </div>
            <div className="grid-container-guest">
            {guests.map(({_id, name, media}, i) => {
                return <div key={i} className="div-guest">
                    <div className="guest-name">
                        <span>{name}</span>
                    </div>
                    <div className="guest-picture">
                        <img alt="avatar" src={require("../../../img/"+ media)}  />
                    </div>
                    <div className="del-guest">
                        <Button handleClick={() => {deleteGuest(_id)}} title="Supprimer"/>
                    </div>
                </div>
            })}
            </div>
        </div>
    )
}

export default Byguests;