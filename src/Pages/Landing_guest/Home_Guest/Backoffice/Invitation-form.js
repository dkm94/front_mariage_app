import React, { useState, useEffect } from "react";
// import Button from "../../../../components/LargeButton/LargeButton";
import "./Invitation-form.css";
import { Formik, Form, useFormik } from "formik";
import TextField from "../../../../components/Formik/TextField";
import * as Yup from "yup";
import axios from "axios";
import decode from "jwt-decode";

const Formulaire = () => {
  
    const invitationValues = {
        title: '', 
        firstPerson: '', 
        secondPerson: '',
        picture: '',
        places: '',
        date: '',
        infos: '',
    }

    const newEventValues = {
        eventTitle: '',
        eventPlace: '',
        eventTime: '',
        eventAddress: '',
    }

    const [invitation, setInvitation] = useState(null)
    const [eventForm, toggleEventForm] = useState(false)
    const [events, setEvents] = useState([])
    const [newEvent, setnewEvent] = useState(newEventValues)

    const [eventEditing, seteventEditing] = useState(null)
    const [editingTitle, seteditingTitle] = useState('')
    const [editingPlace, seteditingPlace] = useState('')
    const [editingTime, seteditingTime] = useState('')
    const [editingAddress, seteditingAddress] = useState('')
    
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            const user = decode(token)
            const result = await axios.get(`/api/admin/invitation/page/${user.invitationID}`)
            setInvitation(result.data)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/admin/invitation/events`)
            setEvents(result.data)
        }
        fetchData();
    }, [])

    const editEvent = (id) => {
        const updatedEvents = [...events].map((obj) => {
            if(obj._id === id) {
                obj.eventTitle = editingTitle
                obj.eventPlace = editingPlace
                obj.eventTime = editingTime
                obj.eventAddress = editingAddress
            }
            return obj
        })
        axios.post(`/api/admin/menu/maincourses/edit/${id}`, 
        {
            eventTitle: editingTitle,
            eventPlace: editingPlace,
            eventTime: editingTime,
            eventAddress: editingAddress
            
        })
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setEvents(updatedEvents)
                        seteventEditing(null)
                        seteditingTitle('')
                        seteditingPlace('')
                        seteditingTime('')
                        seteditingAddress('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteEvent = (id) => {
        console.log(id);
        axios.delete(`/api/admin/invitation/events/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setEvents(events.filter(event => event._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const invitationValidationSchema = Yup.object().shape({
        title: Yup.string()
            .max(100, 'Le titre du thème ne doit pas dépasser 100 caractères.'),
        firstPerson: Yup.string()
            .max(100, 'Le nom ne peut excéder 100 caractères.'),
        secondPerson: Yup.string()
            .max(100, 'Le nom ne peut excéder 100 caractères.'),
        picture: Yup.string(),
        date: Yup.string(),
        infos: Yup.string()
            .max(1000, 'Vous avez atteint le seuil maximal de caractères (1000).')
    })

    const eventValidationSchema = Yup.object().shape({
        places: Yup.array(),
        eventTitle: Yup.string()
            .max(50, 'Le titre ne peut dépasser 50 caractères')
            .required('Merci de remplir ce champ'),
        eventPlace: Yup.string()
            .max(100, 'Le titre ne peut dépasser 100 caractères.')
            .required('Merci de remplir ce champ'),
        eventTime: Yup.string(),
        eventAddress: Yup.string()
            .max(300, 'L\' adresse ne peut dépasser 300 caractères')
            .required('Merci de remplir ce champ')
    })

    const formik = useFormik({
        initialValues: invitation || invitationValues,
        onSubmit: async (values) => {
            const token = localStorage.getItem("token");
            const user = decode(token);
            let formData = new FormData()
            formData.append('title', values.title)
            formData.append('firstPerson', values.firstPerson)
            formData.append('secondPerson', values.secondPerson)
            formData.append('picture', values.picture)
            formData.append('date', values.date)
            formData.append('infos', values.infos)

            await axios.post(`/api/admin/invitation/edit/${user.invitationID}`,
            formData)
                .then((res) => {
                    if(res.data != null){
                        setTimeout(() => {
                            setInvitation(values)
                        }, 500);
                    }
                })
                .catch((err) => {
                    console.log(err)})
        },
        validationSchema: invitationValidationSchema,
        enableReinitialize: true
    })
    
    const event = events.map(obj => {return obj})
    console.log(event)

    const formikEvent = useFormik({
        initialValues: newEventValues,
        onSubmit: async (values) => {
            const token = localStorage.getItem("token");
            const user = decode(token);
            axios.post(`/api/admin/invitation/events/add/${user.invitationID}`,
            {
                eventTitle: values.eventTitle,
                eventPlace: values.eventPlace,
                eventTime: values.eventTime,
                eventAddress: values.eventAddress
            })
            .then((res) => {
                if(res.data != null){
                    setnewEvent(
                        newEvent
                    )
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err)})
        },
        validationSchema: eventValidationSchema,
        enableReinitialize: true,
    })

    const newEventForm = (e) => {
        e.preventDefault();
        toggleEventForm(!eventForm);
    }

    return(
        <div className="container invitation-form-container">
            <div className="title title-style">
                <span>Créez votre faire-part de mariage</span>
            </div>
            <div className="row invitation-form">
                <div className="col-lg-8 col-lg-offset-2 ">

                    <Formik>
                    
                        <Form className="row g-3" onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(formik.values)}} encType="multipart/form-data">

                            <div className="col-12">
                                <label>Thème du mariage</label>
                                <input
                                className="col-12 form-control"
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('title')}
                                />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="error">{formik.errors.title}</div>
                                ) : null}
                            </div>
                           
                            <div className="col-md-6 mt-30">
                                <label>Epoux.se 1</label>
                                <input
                                className="form-control"
                                name="firstPerson"
                                type="text"
                                value={formik.values.firstPerson}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('firstPerson')}
                                />
                                {formik.touched.firstPerson && formik.errors.firstPerson ? (
                                    <div className="error">{formik.errors.firstPerson}</div>
                                ) : null}
                            </div>
                            
                            <div className="col-md-6 mt-30">
                                <label>Epoux.se 2</label>
                                <input
                                className="form-control"
                                name="secondPerson"
                                type="text"
                                value={formik.values.secondPerson}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('secondPerson')}
                                />
                                {formik.touched.secondPerson && formik.errors.secondPerson ? (
                                    <div className="error">{formik.errors.secondPerson}</div>
                                ) : null}
                            </div>

                            <div className="mb-3 mt-30 plr-15">
                                <div>
                                    <label htmlFor="formFile" className="form-label">Photo de mariage</label>
                                    <input 
                                    className="form-control" 
                                    id="formFile" 
                                    type="file"
                                    name="picture"
                                    onChange={(event) => {
                                        formik.setFieldValue("picture", event.currentTarget.files[0])
                                        }}
                                    />
                                </div>
                                {/* <div className="overview">
                                    <span>Apercu:</span>
                                    <div>
                                        <img alt="aperçu" src={`http://backend-mywedding-app.herokuapp.com/api/admin/invitation/page/picture/${formik.values.picture}`} />
                                        <button>X</button>
                                    </div>
                                    
                                </div> */}
                            </div>

                            <div className="col-4 mt-30">
                                <label>Date de l'évènement</label>
                                <input
                                className="form-control"
                                name="date"
                                type="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('date')}
                                />
                                {formik.touched.date && formik.errors.date ? (
                                    <div className="error">{formik.errors.date}</div>
                                ) : null}
                            </div>

                            <div className="col-12">
                                <label>Informations complémentaires</label>
                                <textarea
                                rows="3"
                                className="form-control"
                                name="infos"
                                type="text"
                                value={formik.values.infos}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('infos')}
                                />
                                {formik.touched.infos && formik.errors.infos ? (
                                    <div className="error">{formik.errors.infos}</div>
                                ) : null}
                            </div>
                            
                            <div className="col-12 event-form___submit mt-30">
                                <button type="submit" disabled={formik.isSubmitting}>Valider</button>
                            </div>
                        </Form>
                           
                    </Formik>

                    <Formik>
                        
                       <div className="event-form" style={{ marginTop: "50px"}}>
                            <h3>Votre programme</h3>
                            <div className="event-form___add-btn mt-30">
                                <button onClick={newEventForm}>Ajouter un évènement</button>
                            </div> 
                            <Form className="row g-3" onSubmit={formikEvent.handleSubmit} style={{display: eventForm ? 'flex' : 'none'}}>
                                <TextField 
                                    size="col-md-6 mt-30"
                                    label="Evènement" 
                                    name="eventTitle" 
                                    type="text" 
                                    value={formikEvent.values.eventTitle} 
                                    onChange={formikEvent.handleChange}
                                    onBlur={formikEvent.handleBlur}
                                    className="form-control"
                                />
                                <TextField 
                                    size="col-md-6 mt-30"
                                    label="Lieu" 
                                    name="eventPlace" 
                                    type="text" 
                                    value={formikEvent.values.eventPlace} 
                                    onChange={formikEvent.handleChange}
                                    onBlur={formikEvent.handleBlur}
                                    className="form-control"
                                    placeholder="Exemple: Salle des fêtes de la ville"
                                />
                                <TextField 
                                    size="col-4 mt-30"
                                    label="Horaire" 
                                    name="eventTime" 
                                    type="datetime-local" 
                                    value={formikEvent.values.eventTime} 
                                    onChange={formikEvent.handleChange}
                                    onBlur={formikEvent.handleBlur}
                                    className="form-control"
                                />
                                <TextField 
                                    size="col-md-8 mt-30"
                                    label="Adresse" 
                                    name="eventAddress" 
                                    type="text" 
                                    value={formikEvent.values.eventAddress} 
                                    onChange={formikEvent.handleChange}
                                    onBlur={formikEvent.handleBlur}
                                    className="form-control"
                                />
                                <div className="col-12 event-form___submit mt-30">
                                    <button type="submit" disabled={formik.isSubmitting}>
                                        Valider
                                    </button>
                                </div>
                            </Form>
                        </div>
                                
                    </Formik>               
                
                    <div className="events-list">
                        <ul>
                        {
                            events.map((obj) => <li key={obj._id} >
                            {eventEditing === obj._id ? 
                            (<div className="events-list___inputs">
                                <input 
                                onBlur={true}
                                type="text"
                                onChange={(e) => {seteditingTitle(e.target.value)}}  
                                value={editingTitle} />

                                <input 
                                type="text" 
                                onChange={(e) => {seteditingPlace(e.target.value)}} 
                                value={editingPlace} />

                                <input 
                                type="datetime-local" 
                                onChange={(e) => {seteditingTime(e.target.value)}} 
                                value={editingTime} />

                                <input 
                                type="text" 
                                onChange={(e) => {seteditingAddress(e.target.value)}} 
                                value={editingAddress} />
                            </div>) : 
                            (<ul className="events-list___li">
                                <li>{obj.eventTitle}</li>
                                <li>{obj.eventPlace}</li>
                                <li>{obj.eventTime.replace('T', ' à ')}</li>
                                <li>{obj.eventAddress}</li>
                            </ul>)}

                            {/* <div style={{ marginTop: "10px", textAlign: "end"}}>
                                <button>Modifier</button>
                                <button onClick={() => {deleteEvent(obj._id)}}>Supprimer</button>
                                </div>
                            */}
                            <div style={{ marginTop: "10px", textAlign: "end"}}>
                                {eventEditing === obj._id ? 
                                (<>
                                <button onClick={() => {editEvent(obj._id)}}>
                                    <i className="fas fa-check"/>
                                </button>
                                <button onClick={() => seteventEditing(null)}><i class="fas fa-undo"></i></button>
                                </>
                                ) : 
                                (<button onClick={() => seteventEditing(obj._id)}>
                                    <i className="fas fa-pencil-alt"/>
                                </button>)}
                                
                                <button className="del-btn" onClick={() => {deleteEvent(obj._id)}}>
                                    <i className="fas fa-trash"/>
                                </button>
                            </div>
                        </li>)
                        }
                            
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Formulaire;