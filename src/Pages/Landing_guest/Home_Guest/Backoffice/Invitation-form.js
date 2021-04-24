import React, { useState, useEffect } from "react";
// import Button from "../../../../components/LargeButton/LargeButton";
import Events from "../Events/Events";
import "./Invitation-form.css";
import { Formik, Form, useFormik } from "formik";
import TextField from "../../../../components/Formik/TextField";
import * as Yup from "yup";
import axios from "axios";

const Formulaire = ({ userInfos }) => {
  
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
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/admin/invitation/page/${userInfos.invitationID}`)
            setInvitation(result.data)
        }
        fetchData();
    }, [userInfos.invitationID])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/admin/invitation/events`)
            setEvents(result.data)
        }
        fetchData();
    }, [])

    const editEvent = (updatedEvent) => {
        const updatedEvents = [...events].map((obj) => {
            if(obj._id === updatedEvent.id) {
                obj.eventTitle = updatedEvent.event.eventTitle
                obj.eventPlace = updatedEvent.event.eventPlace
                obj.eventTime = updatedEvent.event.eventTime
                obj.eventAddress = updatedEvent.event.eventAddress
            }
            return obj
        })
        axios.post(`/api/admin/invitation/events/edit/${updatedEvent.id}`, updatedEvent.event)
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setEvents(updatedEvents)
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
            let formData = new FormData()
            formData.append('title', values.title)
            formData.append('firstPerson', values.firstPerson)
            formData.append('secondPerson', values.secondPerson)
            formData.append('picture', values.picture)
            formData.append('date', values.date)
            formData.append('infos', values.infos)

            await axios.post(`/api/admin/invitation/edit/${userInfos.invitationID}`,
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
    
    const formikEvent = useFormik({
        initialValues: newEventValues,
        onSubmit: async (values) => {
            axios.post(`/api/admin/invitation/events/add/${userInfos.invitationID}`,
            {
                eventTitle: values.eventTitle,
                eventPlace: values.eventPlace,
                eventTime: values.eventTime,
                eventAddress: values.eventAddress
            })
            .then((res) => {
                if(res.data != null){
                    setnewEvent(newEvent)
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
                
                    <Events 
                    events={events}
                    deleteEvent={deleteEvent}
                    updateEvent={editEvent}
                    />
                    
                </div>
            </div>
        </div>
    )
}

export default Formulaire;