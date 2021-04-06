import React, { useState, useEffect } from "react";
// import Button from "../../../../components/LargeButton/LargeButton";
import "./Invitation-form.css";
import { Formik, Form } from "formik";
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

    const [invitation, setInvitation] = useState(invitationValues)
    const [eventForm, toggleEventForm] = useState(false)
    const [events, setEvents] = useState([])
    const [newEvent, setnewEvent] = useState(newEventValues)

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

    const deleteEvent = (id) => {
        console.log(id);
        axios.delete(`/api/admin/invitation/events/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    alert("L'évènement a été supprimé.");
                    setEvents(events.filter(event => event._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const eventsArr = events.map((obj, i) => {
        return(
            <li key={i} data-id={obj._id} className="col-6 mt-30">
                <form>
                    <input className="col-12 mt-30" type="text" value={obj.eventTitle}></input>
                    <input className="col-12 mt-30" type="text" value={obj.eventPlace}></input>
                    <input className="col-12 mt-30" type="text" value={obj.eventTime}></input>
                    <input className="col-12 mt-30" type="text" value={obj.eventAddress}></input>
                    <div style={{ marginTop: "10px", textAlign: "end"}}>
                        <button>Modifier</button>
                        <button onClick={() => {deleteEvent(obj._id)}}>Supprimer</button>
                    </div>
                </form>
            </li>
        )
    })
    
    const initialValues = {
        title: invitation.title, 
        firstPerson: invitation.firstPerson, 
        secondPerson: invitation.secondPerson,
        picture: invitation.picture,
        places: invitation.places,
        date: invitation.date,
        infos: invitation.infos,
        eventTitle: newEvent.eventTitle,
        eventPlace: newEvent.eventPlace,
        eventTime: newEvent.eventTime,
        eventAddress: newEvent.eventAddress,
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(100, 'Le titre du thème ne doit pas dépasser 100 caractères.'),
        firstPerson: Yup.string()
            .max(100, 'Le nom ne peut excéder 100 caractères.'),
        secondPerson: Yup.string()
            .max(100, 'Le nom ne peut excéder 100 caractères.'),
        picture: Yup.string(),
        date: Yup.string(),
        infos: Yup.string()
            .max(1000, 'Vous avez atteint le seuil maximal de caractères (1000).'),
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
            .required('Merci de remplir ce champ'),
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

                    <Formik
                        validateOnChange={true}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const token = localStorage.getItem("token");
                            const user = decode(token);
                            await axios.put(`/api/admin/invitation/edit/${user.invitationID}`,
                            {
                                title: values.title,
                                firstPerson: values.firstPerson,
                                secondPerson: values.secondPerson,
                                picture: values.picture,
                                places: values.places,
                                date: values.date,
                                infos: values.infos
                            })
                                .then((res) => {
                                    alert(res)
                                    if(res.data != null){
                                        alert("Modifications effectuées");
                                        setSubmitting(true);
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false);
                                        }, 3000);
                                    }
                                })
                                .catch((err) => {
                                    alert(err);
                                    console.log(err)})
                                    
                        }}
                    >
                        {/* ({ values, handleChange, isSubmitting, handleBlur, handleSubmit }) */}
                        {(formik) => {
                            return(
                                <div>
                                    <Form className="row g-3" onSubmit={() => formik.handleSubmit(formik.values)} encType="multipart/form-data">
                                       
                                        <TextField
                                            size="col-12"
                                            label="Thème du mariage" 
                                            name="title" 
                                            type="text" 
                                            value={formik.values.title} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control col-12"
                                            placeholder="Exemple: La vie en rose" 
                                        />
                                        <TextField 
                                            size="col-md-6 mt-30"
                                            label="Epoux.se 1" 
                                            name="firstPerson" 
                                            type="text" 
                                            value={formik.values.firstPerson} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />
                                        <TextField 
                                            size="col-md-6 mt-30"
                                            label="Epoux.se 2" 
                                            name="secondPerson" 
                                            type="text" 
                                            value={formik.values.secondPerson} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />

                                        <div className="mb-3 mt-30 plr-15">
                                            <label htmlFor="formFile" className="form-label">Photo de mariage</label>
                                            <input 
                                            className="form-control form-control" 
                                            id="formFile" 
                                            type="file"
                                            name="picture"
                                            // value={formik.values.picture}
                                            onChange={(event) => {
                                                formik.setFieldValue("picture", event.currentTarget.files[0]);
                                              }}
                                            />
                                        </div>
                                        <TextField 
                                            size="col-4 mt-30"
                                            label="Date de l'évènement" 
                                            name="date" 
                                            type="date" 
                                            value={formik.values.date} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />
                                        <TextField 
                                            size="col-md-8 mt-30"
                                            rows="3"
                                            label="Informations complémentaires" 
                                            name="infos" 
                                            type="textarea" 
                                            value={formik.values.infos} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />
                                        
                                        <div className="col-12 event-form___submit mt-30">
                                            <button type="submit" disabled={formik.isSubmitting}>Valider</button>
                                        </div>
                                    </Form>
                                </div>
                            )
                        }}        
                    </Formik>

                    <Formik
                    validateOnChange={true}
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const token = localStorage.getItem("token");
                        const user = decode(token);
                        await axios.post(`/api/admin/invitation/events/add/${user.invitationID}`,
                        {
                            eventTitle: values.eventTitle,
                            eventPlace: values.eventPlace,
                            eventTime: values.eventTime,
                            eventAddress: values.eventAddress
                        })
                            .then((res) => {
                                if(res.data != null){
                                    alert("Modifications effectuées");
                                    setSubmitting(true);
                                    setnewEvent(
                                        newEvent
                                    )
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 3000);
                                }
                            })
                            .catch((err) => {
                                alert(err);
                                console.log(err)})
                                
                    }}
                    >
                        {(formik) => {
                            return(
                                <div className="event-form" style={{ marginTop: "50px"}}>
                                    <h3>Votre programme</h3>
                                    <div className="event-form___add-btn mt-30">
                                        <button onClick={newEventForm}>Ajouter un évènement</button>
                                    </div>
                                    <Form className="row g-3" onSubmit={() => formik.handleSubmit(formik.values)} style={{display: eventForm ? 'flex' : 'none'}}>
                                        <TextField 
                                            size="col-md-6 mt-30"
                                            label="Evènement" 
                                            name="eventTitle" 
                                            type="text" 
                                            value={formik.values.eventTitle} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />
                                        <TextField 
                                            size="col-md-6 mt-30"
                                            label="Lieu" 
                                            name="eventPlace" 
                                            type="text" 
                                            value={formik.values.eventPlace} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                            placeholder="Exemple: Salle des fêtes de la ville"
                                        />
                                        <TextField 
                                            size="col-4 mt-30"
                                            label="Horaire" 
                                            name="eventTime" 
                                            type="datetime-local" 
                                            value={formik.values.eventTime} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />
                                        <TextField 
                                            size="col-md-8 mt-30"
                                            label="Adresse" 
                                            name="eventAddress" 
                                            type="text" 
                                            value={formik.values.eventAddress} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />
                                        <div className="col-12 event-form___submit mt-30">
                                            <button type="submit" disabled={formik.isSubmitting}>
                                                Valider
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            )
                        }}
                                
                    </Formik>               
                
                <div>
                    <ul>
                        {eventsArr}
                    </ul>
                </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Formulaire;