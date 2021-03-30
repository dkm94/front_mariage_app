import React, { useState, useEffect } from "react";
// import Button from "../../../../components/LargeButton/LargeButton";
import "./Invitation-form.css";
import { Formik, Form } from "formik";
import TextField from "../../../../components/Formik/TextField";
import * as Yup from "yup";
import axios from "axios";
import decode from "jwt-decode";

// interface Values {
//     title: string, 
//     firstPerson: string, 
//     secondPerson: string, 
//     date: string, 
//     infos: string
//   }

// const CustomTextInput = ({ label, handleChange, values, ...props }) => {
//     console.log(props);
//     console.log(values)
//     // let properties = props.name;
//     // properties.forEach(el => console.log(el))
//     // console.log(handleChange);
//     const [field, meta] = useField(props);
//     console.log(field)
//     console.log(meta)

//     // const getInputValue = (name, value) => {
//     //     alert("Touché !")
//     //     console.log(name, value)
//     //     // const fieldName = e.target.name;
//     //     // const fieldValue = e.target.value;
//     //     // console.log(fieldValue)
//     //     // handleChange(fieldName, fieldValue);
//     // }


//     return(
//         <>
//             <label htmlFor={props.name}>{label}</label><br />
//            {/* { console.log("handle", handleChange)} */}
//             <input
//             name={props.name}
//             type={props.type}
//             className="text-input full-width"
//             value={props.value}
//             // onChange={() => handleChange(props.name, props.value)}
//             onChange={handleChange}
//             {...field} {...props}
//             />
//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ): null}
//         </>
//     )
// }


const Formulaire = () => {
  
    const [invitation, setInvitation] = useState({})
    const [eventForm, toggleEventForm] = useState(false)
    const [events, setEvents] = useState([])
    const [newEvent, setnewEvent] = useState({})

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
        title: Yup.string(),
            // .max(100, 'Le titre du thème ne doit pas dépasser 100 caractères.'),
        firstPerson: Yup.string(),
            // .max(100, 'Le nom ne peut excéder 100 caractères.')
            // .required('Merci de remplir ce champ'),
        secondPerson: Yup.string(),
            // .max(100, 'Le nom ne peut excéder 100 caractères.')
            // .required('Merci de remplir ce champ'),
        picture: Yup.string(),
        date: Yup.string(),
        infos: Yup.string(),
            // .max(1000, 'Vous avez atteint le seuil maximal de caractères (1000).'),
        places: Yup.array(),
        eventTitle: Yup.string(),
            // .max(50, 'Le titre ne peut dépasser 50 caractères')
            // .required('Merci de remplir ce champ'),
        eventPlace: Yup.string(),
            // .max(100, 'Le titre ne peut dépasser 100 caractères.')
            // .required('Merci de remplir ce champ'),
        eventTime: Yup.string(),
        eventAddress: Yup.string()
            // .max(300, 'L\' adresse ne peut dépasser 300 caractères')
            // .required('Merci de remplir ce champ'),
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
                                        <div className="col-12">
                                            <label htmlFor="inputAddress" className="form-label">Thème du mariage</label>
                                            <input 
                                            type="text"
                                            name="title"
                                            value={formik.values.title || ""}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                            placeholder="Exemple: La vie en rose"/>
                                        </div>
                                        {/* <TextField
                                            size="col-12"
                                            label="title" 
                                            name="title" 
                                            type="text" 
                                            value={formik.values.title || ""} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control col-12"
                                            placeholder="Exemple: La vie en rose" 
                                        /> */}
                                        <div className="col-md-6 mt-30">
                                            <label htmlFor="inputEmail4" className="form-label">Epoux.se 1</label>
                                            <input 
                                            type="text"
                                            name="firstPerson"
                                            value={formik.values.firstPerson || ""}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control" />
                                        </div>
                                        <div className="col-md-6 mt-30">
                                            <label htmlFor="inputPassword4" className="form-label">Epoux.se 2</label>
                                            <input 
                                            type="text"
                                            name="secondPerson"
                                            value={formik.values.secondPerson || ""}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control" />
                                        </div>
                                        <div className="mb-3 mt-30 plr-15">
                                            <label htmlFor="formFile" className="form-label">Photo de mariage</label>
                                            <input 
                                            className="form-control form-control" 
                                            id="formFile" 
                                            type="file"
                                            name="picture"
                                            // value={formik.values.picture || ""}
                                            onChange={(event) => {
                                                formik.setFieldValue("picture", event.currentTarget.files[0]);
                                              }}
                                            />
                                        </div>
                    
                                        <div className="col-4 mt-30">
                                            <label htmlFor="inputAddress2" className="form-label">Date de l'évènement</label>
                                            <input 
                                            type="date" 
                                            name="date"
                                            value={formik.values.date || ""}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"/>
                                        </div>
                                        <div className="col-md-8 mt-30">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Informations complémentaires</label>
                                            <textarea
                                                className="form-control" 
                                                id="exampleFormControlTextarea1" 
                                                rows="3"
                                                name="infos"
                                                value={formik.values.infos || ""}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
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
                                    <Form className="row g-3" onSubmit={() => formik.handleSubmit(formik.values)} visible={eventForm} style={{display: eventForm ? 'flex' : 'none'}}>
                                        <div className="col-md-6 mt-30">
                                            <label>Evènement</label>
                                            <input 
                                            type="text" 
                                            name="eventTitle"
                                            value={formik.values.eventTitle || ""}
                                            placeholder="Exemple: Réception"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"/>
                                        </div>
                                        <div className="col-md-6 mt-30">
                                            <label>Lieu</label>
                                            <input 
                                            type="text" 
                                            name="eventPlace"
                                            value={formik.values.eventPlace || ""}
                                            placeholder="Exemple: Salle des fêtes de la ville"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"/>
                                        </div>
                                        <div className="col-4 mt-30">
                                            <label>Horaire</label>
                                            <input 
                                            type="datetime-local" 
                                            name="eventTime"
                                            value={formik.values.eventTime || ""}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"/>
                                        </div>
                                        <div className="col-md-8 mt-30">
                                            <label>Adresse</label>
                                            <input 
                                            type="text" 
                                            name="eventAddress"
                                            value={formik.values.eventAddress || ""}
                                            placeholder="Exemple: 12 rue du Général de Gaulle 75000"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"/>
                                        </div>
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

// {/* <Form 
// method="PUT"
// className="row g-3">
//     <div className="col-12">
//         <CustomTextInput label="Thème" name="title" type="text" values={values} value={values.title} />
//     </div>
//     <div className="col-md-6 mt-30">
//         <CustomTextInput label="Époux.se 1" name="firstPerson" type="text" value={values.firstPerson}/>
//     </div>
//     <div className="col-md-6 mt-30">
//         <CustomTextInput label="Époux.se 2" name="secondPerson" type="text" value={values.secondPerson}/>
//     </div>
//     {/* <div className="col-4 mt-30">
//         <CustomTextInput label="Date" name="date" type="date" value={invitation.date}/>
//     </div> */}
//     <div className="col-md-6 mt-30">
//         <CustomTextInput label="Informations complémentaires" name="infos" type="textarea" value={values.infos}/>
//     </div><br />
//     <button>{isSubmitting ? "Enregistrement..." : "Valider"}</button>
// </Form> */}