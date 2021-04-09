import React, { useState, useEffect } from "react";
import Button from "../../LargeButton/LargeButton";
import "./guests.css";
import avatar from "../../../img/avatar.jpg";
import axios from "axios";

const Byguests = () => {
    const [editingText, seteditingText] = useState('')
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({name: ''})
    const [guestEditing, setguestEditing] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/guests/")
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
        // alert("submitted!")
        axios.post("/api/admin/guests/add", {name: guest})
            .then((res) => {
                if(res.data != null){
                    setGuests([...guests, guest])
                    setNewGuest({name: ''})
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const editGuest = (id) => {
        const updatedGueslist = [...guests].map((guest) => {
            if(guest._id === id) {
                guest.name = editingText
            }
            return guest
        })
        axios.put(`api/admin/guests/edit/${id}`, {name: editingText})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setGuests(updatedGueslist)
                        setguestEditing(null)
                        seteditingText('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteGuest = (id) => {
        console.log(id)
        axios.delete(`/api/admin/guests/delete/${id}`)
            .then(result => {
                console.log(result.data)
                if(result.data != null) {
                    // alert("Invité supprimé.");
                    setGuests(guests.filter(guest => guest._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }
    

    return(
        <div className="byguests container">
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
            <div className="byguests___block">
            {
                guests.length === 0 || null ? 
                (<div className="block"><span>Vos invités ici.</span></div>) : 
                (<ul className="get-guestlist">
                    {
                        guests.map((guest) => <li className="div-guest" key={guest._id} >
                        {guestEditing === guest._id ? 
                        (<input 
                            type="text" 
                            onChange={(e) => {seteditingText(e.target.value)}} 
                            value={editingText}
                            style={{width: "70%"}}
                        />) : 
                        (<span>{guest.name}</span>)}
                        
                        <div className="guest-picture">
                            <img alt="avatar" src={avatar}  />
                        </div>
                        <div className="menu___li-btns">
                            {guestEditing === guest._id ? 
                            (<Button handleClick={() => editGuest(guest._id)} title="Valider" />) : 
                            (<Button handleClick={() => setguestEditing(guest._id)} title="Modifier" />)}
                            
                            <button className="del-btn" onClick={() => {deleteGuest(guest._id)}}>
                                <i className="fas fa-trash"/>
                            </button>
                        </div>
                        </li>)
                    }
                </ul>)
            }
            </div>
        </div>
    )
}

export default Byguests;
