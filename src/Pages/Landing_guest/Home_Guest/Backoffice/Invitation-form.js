import React, { useState, useEffect } from "react";
// import Button from "../../../../components/LargeButton/LargeButton";
import "./Invitation-form.css";
import { Formik, Form } from "formik";
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

    const [values, setValues] = useState({})

    console.log(values)
    
    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     alert("Touché !")
    //     setInvitation(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }))
    // }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            const user = decode(token)
            const result = await axios.get(`/api/admin/invitation/${user.invitationID}`)
            console.log(result.data)
            setValues(result.data)
        }
        fetchData();
    }, [])
    
    const initialValues = {
        title: values.title, 
        firstPerson: values.firstPerson, 
        secondPerson: values.secondPerson, 
        infos: values.infos
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string(),
        firstPerson: Yup.string(),
        secondPerson: Yup.string(),
        date: Yup.date(),
        infos: Yup.string(),
    })
    // const updateInvitation = (invitation) => {
    //     const token = localStorage.getItem("token")
    //     const user = decode(token)
    //     axios.put(`/api/admin/invitation/edit/${user.invitationID}`, {invitation})
    //         .then((res) => {
    //             if(res.data != null){
    //                 setInvitation(invitation)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)})
    // }

    return(
        <div className="container">
            <div className="title title-style">
                <span>Créez votre faire-part de mariage</span>
            </div>
            <div className="row invitation-form">
                <div className="col-lg-8 col-lg-offset-2 ">
                    {console.log(values)}
                    <Formik
                        validateOnChange={true}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log("update data: ", values)
                            const data = {
                                title: values.title,
                                firstPerson: values.firstPerson, 
                                secondPerson: values.secondPerson, 
                                infos: values.infos
                            };
                            console.log(data)
                            const token = localStorage.getItem("token");
                            const user = decode(token);
                            await axios.put(`/api/admin/invitation/edit/${user.invitationID}`, {data})
                                .then((res) => {
                                    if(res.data != null){
                                        setSubmitting(true)
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false)
                                            // window.location.reload();
                                        }, 3000);
                                    }
                                })
                                .catch((err) => {
                                    console.log(err)})
                        }}
                    >
                        {({ values, handleChange, isSubmitting, handleBlur, handleSubmit }) => {
                            return(
                                <Form className="row g-3" onSubmit={() => handleSubmit(values)}>
                                    {console.log("PROPS", values)}
                                    <div className="col-12">
                                        <label htmlFor="inputAddress" className="form-label">Thème du mariage</label>
                                        <input 
                                        type="text"
                                        name="title"
                                        value={values.title || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        placeholder="Exemple: La vie en rose"/>
                                    </div>
                                    <div className="col-md-6 mt-30">
                                        <label htmlFor="inputEmail4" className="form-label">Epoux.se 1</label>
                                        <input 
                                        type="text"
                                        name="firstPerson"
                                        value={values.firstPerson || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control" />
                                    </div>
                                    <div className="col-md-6 mt-30">
                                        <label htmlFor="inputPassword4" className="form-label">Epoux.se 2</label>
                                        <input 
                                        type="text"
                                        name="secondPerson"
                                        value={values.secondPerson || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control" />
                                    </div>
                                    {/* <div className="mb-3 mt-30 plr-15">
                                        <label htmlFor="formFile" className="form-label">Photo de mariage</label>
                                        <input 
                                        className="form-control form-control" 
                                        id="formFile" 
                                        type="file" />
                                    </div> */}
                                    {/* <div className="col-4 mt-30">
                                        <label htmlFor="inputAddress2" className="form-label">Date de l'évènement</label>
                                        <input 
                                        type="date" 
                                        name="date"
                                        value={values.date}
                                        onChange={props.handleChange}
                                        className="form-control"/>
                                    </div> */}
                                    <div className="col-md-6 mt-30">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Informations complémentaires</label>
                                        <textarea
                                            className="form-control" 
                                            id="exampleFormControlTextarea1" 
                                            rows="3"
                                            name="infos"
                                            value={values.infos || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" disabled={isSubmitting}>Valider</button>
                                    </div>
                                </Form>
                            )
                        }

                        }
                    </Formik>
                    
                </div>
            </div>
            <div>
                <span>Rendu</span>
                <div>
                    {values.title === "" ? <span>Null</span> : <span>{values.title}</span>}
                </div>
                <div>
                    {values.firstPerson === "" ? <span>Null</span> : <span>{values.firstPerson}</span>}
                </div>
                <div>
                    {values.secondPerson === "" ? <span>Null</span> : <span>{values.secondPerson}</span>}
                </div>
                <div>
                    {values.infos === "" ? <span>Null</span> : <span>{values.infos}</span>}
                </div>
            </div>
        </div>
    )
}

export default Formulaire;

// async (values, { setSubmitting }) => {
//     console.log(values)
//     const token = localStorage.getItem("token")
//     const user = decode(token)
//     await axios.put(`/api/admin/invitation/edit/${user.invitationID}`, {values})
//         .then((res) => {
//             if(res.data != null){
//                 setTimeout(() => {
//                     setValues(values);
//                     setSubmitting(false);
//                 }, 1500);
//             }
//         })
//         .catch((err) => {
//             console.log(err)})
// }

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