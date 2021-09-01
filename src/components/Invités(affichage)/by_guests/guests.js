import React, { useState, useEffect, useContext } from "react";
// import Button from "../../LargeButton/LargeButton";
import { ScrollButtonContext } from "../../../App";
import GuestList from "./Components/Guests/Guests";
import "./guests.css";
import axios from "axios";

const Byguests = () => {
    
    const scrollBtn = useContext(ScrollButtonContext)

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
    }, [guests]) 

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
        let formData = new FormData();
        formData.append('media', file)
        axios.post(`/api/admin/guests/edit/${id}`, formData)
            .then(result => {
                if(result.data != null) {
                    setFile(null)
                    window.location.reload()
                }
                console.log(result)
            })
            .catch((err) => {
                console.log(err)})
    }
    
    const button_wrapper_style = {
        position: 'relative',
        zIndex: 1
    }

    return(
        <div className="guest-container" style={button_wrapper_style}>
            <div className="guests___bgimage">
                {/* <img /> */}
            </div>
            <div className="guests___title">
                <div className="guests___title_style" >
                    {scrollBtn}
                    <h2>Les invités</h2>
                </div>
            </div>
            <div className="guests___list">
                <div className="guest-form input-group mb-3">
                    <form onSubmit={handleSubmit} className="input-group mb-3">
                        <div>
                            <input
                            type="text"
                            className="form-control shadow-none"
                            name="name"
                            placeholder="Nouvel invité"
                            value={newGuest.name} 
                            onChange={handleChange}
                            required
                            />
                            <button 
                            type="submit"
                            className="btn shadow-none"
                            id="button-addon2"
                            ><i className="fas fa-check" /></button>
                        </div>
                    </form>
                </div>
                <div className="byguests___block container">
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
        </div>
    )
}

export default Byguests;
