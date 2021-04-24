import React, { useState, useEffect } from "react";
// import Button from "../../LargeButton/LargeButton";
import GuestList from "./Components/Guests/Guests";
import "./guests.css";
import axios from "axios";

const Byguests = () => {
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({name: ''})
    const [editPicture, seteditPicture] = useState(null)
    const [file, setFile] = useState(null)

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/admin/guests/add", newGuest)
            .then((res) => {
                if(res.data != null){
                    setGuests([...guests, newGuest])
                    setNewGuest({name: ''})
                    window.location.reload(false);
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const editGuest = updatedGuest => {
        const updatedGueslist = [...guests].map((guest) => {
            if(guest._id === updatedGuest.id) {
                guest.name = updatedGuest.name
            }
            return guest
        })
        axios.post(`api/admin/guests/edit/${updatedGuest.id}`, {name: updatedGuest.name})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setGuests(updatedGueslist)
                    }, 1500);
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
                if(result.data != null) {
                    setGuests(guests.filter(guest => guest._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const handleFile = file => {
        console.log(file)
        setFile(file)
    }

    const uploadPicture = (id) => {
        console.log(id)
        console.log(file)
        let formData = new FormData();
        formData.append('media', file)
        axios.post(`/api/admin/guests/edit/${id}`, formData)
            .then(result => {
                console.log(result.data)
                if(result.data != null) {
                    setFile(null)
                }
            })
            .catch((err) => {
                console.log(err)})
    }
    
    const button_wrapper_style = {
        position: 'relative',
        zIndex: 1
    }

    return(
        <div className="byguests container" style={button_wrapper_style}>
            {/* <h1>Affichage par invités</h1> */}
            <div className="guest-form">
                <form onSubmit={handleSubmit}>
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
                <GuestList 
                guests={guests}
                deleteGuest={deleteGuest}
                updateGuest={editGuest}
                editPicture={editPicture}
                seteditPicture={seteditPicture}
                upload={uploadPicture}
                handleFile={handleFile}
                />
            </div>
        </div>
    )
}

export default Byguests;
