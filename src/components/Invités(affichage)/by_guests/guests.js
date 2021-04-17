import React, { useState, useEffect } from "react";
// import Button from "../../LargeButton/LargeButton";
import Modal from "../../Modals/Set_guest_picture";
import "./guests.css";
import avatar from "../../../img/avatar.jpg";
import axios from "axios";

const Byguests = () => {
    const [editingText, seteditingText] = useState('')
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({name: ''})
    const [guestEditing, setguestEditing] = useState(null)
    const [editPicture, seteditPicture] = useState(null)
    const [isOpen, setisOpen] = useState(false)
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
        // alert("submitted!")
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

    const handleFile = (e) => {
        console.log(e)
        const fileValue = e.target.files[0];
        console.log(fileValue)
        setFile(fileValue)
        // setTimeout(() => {
        //     console.log(file)
        // }, 3000);
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
                    // alert("Invité supprimé.");
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
                            required
                        />) : 
                        (<span>{guest.name}</span>)}
                        
                        <div className="guest-picture">
                            {guest.media === "" ? 
                            (<img alt="avatar" src={avatar}  />) : 
                            (<img alt="notre mariage" src={`http://backend-mywedding-app.herokuapp.com/api/admin/guests/media/${guest.media}`} />)}
                        </div>
                        <div className="menu___li-btns" >
                            {editPicture === guest._id ?
                            (<>
                                <button  onClick={() => {setisOpen(true); seteditPicture(guest._id)}}>
                                <i className="fas fa-camera"/>
                                </button>
                                <Modal open={isOpen} guestId={editPicture} close={() => {setisOpen(false)}}>
                                    <form className="modal___picture" onSubmit={(e) => {uploadPicture(editPicture, e); e.preventDefault()}}>
                                        <label>Télécharger une photo (format: JPG/JPEG ou PNG)</label>
                                        <input 
                                            type="file" 
                                            name="media" 
                                            onChange={(e) => handleFile(e)}
                                            />
                                        <button type="submit">Valider</button>
                                    </form>
                                </Modal>
                            </>):
                            (<button  onClick={() => {setisOpen(true); seteditPicture(guest._id)}}>
                            <i className="fas fa-camera"/>
                            </button>)}

                            {guestEditing === guest._id ? 
                            (<button onClick={() => editGuest(guest._id)}>Valider</button>) : 
                            (<button onClick={() => setguestEditing(guest._id)}>
                                <i className="fas fa-pencil-alt"/>
                            </button>)}
                            
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
