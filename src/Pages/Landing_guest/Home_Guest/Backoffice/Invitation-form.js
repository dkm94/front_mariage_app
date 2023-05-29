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
        firstPerson_firstName: '',
        firstPerson_lastName: '',
        secondPerson_firstName: '',
        secondPerson_lastName: '',
        picture: '',
        places: '',
        date: '',
        rsvp: '',
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

    const editEvent = async (updatedEvent) => {
        const updatedEvents = [...events].map((obj) => {
            if(obj._id === updatedEvent.id) {
                obj.eventTitle = updatedEvent.event.eventTitle
                obj.eventPlace = updatedEvent.event.eventPlace
                obj.eventTime = updatedEvent.event.eventTime
                obj.eventAddress = updatedEvent.event.eventAddress
            }
            return obj
        })
        await axios.post(`/api/admin/invitation/events/edit/${updatedEvent.id}`, updatedEvent.event)
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

    const deleteEvent = async (id) => {
        await axios.delete(`/api/admin/invitation/events/delete/${id}`)
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
        firstPerson_firstName: Yup.string()
            .max(50, 'Le prénom ne peut excéder 50 caractères.'),
        firstPerson_lastName: Yup.string()
            .max(50, 'Le nom ne peut excéder 50 caractères.'),
        secondPerson_firstName: Yup.string()
        .max(50, 'Le prénom ne peut excéder 50 caractères.'),
        secondPerson_lastName: Yup.string()
        .max(50, 'Le nom ne peut excéder 50 caractères.'),
        picture: Yup.string(),
        date: Yup.string(),
        rsvp: Yup.string(),
        infos: Yup.string()
            .max(300, 'Vous avez atteint le seuil maximal de caractères (300).')
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
            formData.append('firstPerson_firstName', values.firstPerson_firstName)
            formData.append('firstPerson_lastName', values.firstPerson_lastName)
            formData.append('secondPerson_firstName', values.secondPerson_firstName)
            formData.append('secondPerson_lastName', values.secondPerson_lastName)
            formData.append('picture', values.picture)
            formData.append('date', values.date)
            formData.append('rsvp', values.rsvp)
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
        <div className="invitation-form-container">
            <div className="invitation___bgimage" />
            <div className="invitation___title">
                <div className="invitation___title_style">
                    <h1>Faire-part</h1>
                </div>
            </div>
            <div className="row invitation-form">
                <div className="col invitation-form___col-1">
                    <div className="center-x">
                        <div className="invitation-form-col">
                            <h2>Invitation</h2>
                        </div>
                    </div>
                    <Formik>
                        <Form className="row g-3 invitation-form___style" onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(formik.values)}} encType="multipart/form-data">

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
                                <label>Prénom (Époux.se 1)</label>
                                <input
                                className="form-control"
                                name="firstPerson_firstName"
                                type="text"
                                value={formik.values.firstPerson_firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('firstPerson_firstName')}
                                />
                                {formik.touched.firstPerson_firstName && formik.errors.firstPerson_firstName ? (
                                    <div className="error">{formik.errors.firstPerson_firstName}</div>
                                ) : null}
                            </div>
                            
                            <div className="col-md-6 mt-30">
                                <label>Nom (Époux.se 1)</label>
                                <input
                                className="form-control"
                                name="firstPerson_lastName"
                                type="text"
                                value={formik.values.firstPerson_lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('firstPerson_lastName')}
                                />
                                {formik.touched.firstPerson_lastName && formik.errors.firstPerson_lastName ? (
                                    <div className="error">{formik.errors.firstPerson_lastName}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6 mt-30">
                                <label>Prénom (Époux.se 2)</label>
                                <input
                                className="form-control"
                                name="secondPerson_firstName"
                                type="text"
                                value={formik.values.secondPerson_firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('secondPerson_firstName')}
                                />
                                {formik.touched.secondPerson_firstName && formik.errors.secondPerson_firstName ? (
                                    <div className="error">{formik.errors.secondPerson_firstName}</div>
                                ) : null}
                            </div>
                            
                            <div className="col-md-6 mt-30">
                                <label>Nom (Époux.se 2)</label>
                                <input
                                className="form-control"
                                name="secondPerson_lastName"
                                type="text"
                                value={formik.values.secondPerson_lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('secondPerson_lastName')}
                                />
                                {formik.touched.secondPerson_lastName && formik.errors.secondPerson_lastName ? (
                                    <div className="error">{formik.errors.secondPerson_lastName}</div>
                                ) : null}
                            </div>

                            <div className="mt-30 plr-15">
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

                            <div className="col-4 mt-30">
                                <label>Date limite de confirmation</label>
                                <input
                                className="form-control"
                                name="rsvp"
                                type="date"
                                value={formik.values.rsvp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                {...formik.getFieldProps('rsvp')}
                                />
                                {formik.touched.rsvp && formik.errors.rsvp ? (
                                    <div className="error">{formik.errors.rsvp}</div>
                                ) : null}
                            </div>

                            <div className="col-12 mt-30">
                                <label>Informations complémentaires</label>
                                <textarea
                                rows="3"
                                className="form-control"
                                name="infos"
                                type="text"
                                value={formik.values.infos}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Saisissez votre texte ici (300 caractères maximum)."
                                {...formik.getFieldProps('infos')}
                                />
                                {formik.touched.infos && formik.errors.infos ? (
                                    <div className="error">{formik.errors.infos}</div>
                                ) : null}
                            </div>
                            
                            <div className="col-12 event-form___submit mt-30">
                                <button className="btn-style-s" type="submit" disabled={formik.isSubmitting}>Valider</button>
                            </div>
                        </Form>  
                    </Formik>           
                </div>
                <div className="col invitation-form___col-2">
                    <div className="center-x">
                        <div className="schedule-col">
                            <h2>Programme</h2>
                        </div>
                    </div>
                    <Formik>
                       <div className="event-form">
                            {/* <h3>Votre programme</h3> */}
                            <div className="event-form___add-btn mt-30">
                                <button onClick={newEventForm}>Ajouter un évènement</button>
                            </div> 
                            <Form className="row g-3 invitation-form___style" onSubmit={formikEvent.handleSubmit} style={{display: eventForm ? 'flex' : 'none'}}>
                                <TextField 
                                    size="col-md-6 mt-30"
                                    label="Evènement"
                                    name="eventTitle" 
                                    type="text" 
                                    placeholder="Réception, cérémonie, église..."
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
                                    <button className="btn-style-s" type="submit" disabled={formik.isSubmitting}>
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