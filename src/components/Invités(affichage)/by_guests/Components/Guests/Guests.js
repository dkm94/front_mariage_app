import React, { useState } from 'react';
import Modal from "../../../../Modals/Set_guest_picture";
import Form from "../Form/UpdateGuest";
import avatar from "../../../../../img/avatar.jpg";

const Guests = ({ guests, deleteGuest, updateGuest, editPicture, seteditPicture, upload, handleFile, searchValue }) => {

    const [isOpen, setisOpen] = useState(false)

    const [edit, setEdit] = useState({
        id: null,
        name: ''
    })

    const handleFileInput = (e) => {
        const fileValue = e.target.files[0];
        handleFile(fileValue)
    }

    const submitUpdate = name => {
        updateGuest(name);
        setEdit({
            id: null,
            name: ''
        });
    };

    return (
        <>
            {
                guests.length === 0 || null ? 
                (<div className="block"><span>Vos invités ici.</span></div>) : 
                (<ul className="get-guestlist">
                    {
                        guests
                        .filter((guest) => {
                            return guest.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
                          })
                        .map((guest) => <li className="div-guest" key={guest._id} >
                            <div className="div-guest___container">
                                <div className="guest-picture center-x">
                                    {guest.media === "" ? 
                                    (<img alt="avatar" src={avatar}  />) : 
                                    (<img alt="notre mariage" src={`http://backend-mywedding-app.herokuapp.com/api/admin/guests/media/${guest.media}`} />)}
                                </div>
                        
                                {edit.id === guest._id ? 
                                (<Form edit={edit} setEdit={setEdit} onSubmit={submitUpdate}/>) : 
                                (<div className="nameField">
                                    <span>{guest.name}</span>
                                </div>)}
                        
                                <div className="guests___li-btns center-x" >
                                    {editPicture === guest._id ?
                                    (<>
                                        <button 
                                            onClick={() => setEdit({
                                                id: guest._id, 
                                                name: guest.name
                                            })}
                                            className="shadow-none"
                                            >
                                            <i className="fas fa-pencil-alt"/>
                                        </button>
                                        <button  
                                            onClick={() => {setisOpen(!isOpen); seteditPicture(guest._id)}}
                                            className="shadow-none"
                                            >
                                        <i className="fas fa-camera"/>
                                        </button>
                                        <Modal open={isOpen} setOpen={setisOpen} guestId={editPicture} close={() => {setisOpen(false)}}>
                                            <form className="modal___picture" onSubmit={(e) => {upload(editPicture); e.preventDefault()}}>
                                                <label>Télécharger une photo (format: JPG/JPEG ou PNG)</label>
                                                <input 
                                                    type="file" 
                                                    name="media" 
                                                    onChange={handleFileInput}
                                                    />
                                                <button type="submit">Valider</button>
                                                <button type="button">Supprimer la photo</button>
                                            </form>
                                        </Modal>
                                    </>):
                                    (
                                    <>
                                    <button style={edit.id === guest._id ? {display: 'none'} : {display: 'flex'}}  onClick={() => setEdit({
                                        id: guest._id, 
                                        name: guest.name
                                    })}>
                                        <i className="fas fa-pencil-alt"/>
                                    </button>
                                    <button  onClick={() => {setisOpen(!isOpen); seteditPicture(guest._id)}}>
                                        <i className="fas fa-camera"/>
                                    </button>
                                    </>
                                    )}
                                    
                                    
                                </div>
                            </div>
                            <button className="del-btn" onClick={() => {deleteGuest(guest._id)}}>
                                <i className="fas fa-times"></i>
                            </button>
                        </li>)
                    }
                </ul>)
            }
        </>
    )
}

export default Guests;
