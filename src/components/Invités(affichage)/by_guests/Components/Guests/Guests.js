import React, { useState } from 'react';
import Modal from "../../../../Modals/Set_guest_picture";
import Form from "../Form/UpdateGuest";
import avatar from "../../../../../img/avatar.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from '../../../../Dots/Dots';

const Guests = ({ guests, deleteGuest, updateGuest, editPicture, seteditPicture, upload, handleFile, searchValue, mariageID }) => {

    const [isOpen, setisOpen] = useState(false);
    const [edit, setEdit] = useState({
        id: null,
        name: ''
    })

    const handleFileInput = (e) => {
        const fileValue = e.target.files[0];
        handleFile(fileValue)
    }

    const submitUpdate = (props) => {
        updateGuest(props)
    };

    return (
        <>
            {
                guests.length === 0 || null ? 
                (<div className="block"><span>Vos invités ici.</span></div>) : 
                (<ul className="get-guestlist">
                    {
                        guests
                        .sort((a,b)=>{ return a.name > b.name ? 1 : - 1 })
                        .filter((guest) => {
                            return guest.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
                          })
                        .map((guest) => {
                        return <li className="div-guest" key={guest._id} >
                            <div className="custom-dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu size="sm" title="">
                                        {edit.id ? (<>
                                            {/* <Dropdown.Item onClick={() => {setisOpen(!isOpen); seteditPicture(guest._id)}}>Changer la photo</Dropdown.Item> */}
                                            {/* <Dropdown.Item>Supprimer la photo</Dropdown.Item> */}
                                            {/* <Dropdown.Item ><button form="update-form" type="submit" onClick={() => {submitUpdate(edit.name)}}>Valider</button></Dropdown.Item> */}
                                            <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                                        </>) : (<>
                                            <Dropdown.Item onClick={() => setEdit({
                                                id: guest._id, 
                                                name: guest.name
                                            })}>Modifier</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {deleteGuest(guest._id)}}>Supprimer l'invité</Dropdown.Item>
                                        </>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="div-guest___container">
                                <div className="guest-picture center-x">
                                    {guest.media === "" ? 
                                    (<img alt="avatar" src={avatar}  />) : 
                                    (<img alt="notre mariage" src={`http://backend-mywedding-app.herokuapp.com/api/admin/guests/media/${guest.media}`} />)}
                                    {edit.id === guest._id ? (<div><button  onClick={() => {setisOpen(!isOpen); seteditPicture(guest._id)}}>
                                        <i className="fas fa-camera"/>
                                    </button></div>) : null}
                                </div>
                        
                                {edit.id === guest._id ? 
                                (<>
                                    <Form 
                                    edit={edit} 
                                    setEdit={setEdit} 
                                    onSubmit={submitUpdate} 
                                    mariageID={mariageID}
                                    guestId={guest._id}
                                    guestFamily={guest.family}
                                    />
                                </>) : 
                                (<div className="nameField">
                                    <span>{guest.name}</span>
                                </div>)}
                                <Modal open={isOpen} setOpen={setisOpen} guestId={editPicture} close={() => {setisOpen(false)}}>
                                    <form className="modal___picture" onSubmit={(e) => {upload(editPicture); e.preventDefault()}}>
                                        <label>Télécharger une photo (format: JPG/JPEG ou PNG)</label>
                                        <input 
                                            type="file" 
                                            name="media" 
                                            onChange={handleFileInput}
                                            />
                                        <button type="submit">Valider</button>
                                    </form>
                                </Modal>
                        
                                {/* <div className="guests___li-btns center-x" >
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
                                    
                                    
                                </div> */}
                            </div>
                            {/* <button className="del-btn" onClick={() => {deleteGuest(guest._id)}}>
                                <i className="fas fa-times"></i>
                            </button> */}
                        </li>
                        })
                    }
                </ul>)
            }
        </>
    )
}

export default Guests;
