import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, useFormik } from "formik";
import TextField from "../../components/Formik/TextField-operations";
import { UserContext, AuthenticationContext, ScrollButtonContext } from "../../../src/App";
import Expenses from "./Dépenses/Dépenses";
import * as Yup from "yup";
import axios from "axios";

import "./Budget.css";

const Budget = () => {
 
    const { budgetID } = useContext(UserContext)
    const isAuthenticated = useContext(AuthenticationContext)
    const scrollBtn = useContext(ScrollButtonContext)

    const newOperationValues = {
        title: '', 
        price: '', 
        description: ''
    }

    const [operationForm, toggleOperationForm] = useState(false)
    const [budget, setBudget] = useState({})
    const [operations, setOperations] = useState([]);
    const [newOperation, setnewOperation] = useState(newOperationValues)

    useEffect(() => {
        let budget = axios.get(`/api/admin/budget/details/${budgetID}`);
        let operations = axios.get(`/api/admin/budget/operations/`);

        async function getDatas(){
            let res = await Promise.all([budget, operations])
            setBudget(res[0].data)
            setOperations(res[1].data)
        }
        getDatas();
    }, [budgetID])

    // const editExpense = (updatedExpense) => {
    //     console.log(updatedExpense)
    //     // const updatedExpenses = [...operations].map((obj) => {
    //     //     if(obj._id === updatedExpense.id) {
    //     //         obj.expenseTitle = updatedExpense.event.expenseTitle
    //     //         obj.expensePrince = updatedExpense.event.expensePrice
    //     //         obj.expenseDescription = updatedExpense.event.expenseDescription
    //     //     }
    //     //     return obj
    //     // })
    //     // axios.post(`/api/admin/invitation/events/edit/${updatedExpense.id}`, updatedExpense.event)
    //     //     .then((res) => {
    //     //         if(res.data != null){
    //     //             setTimeout(() => {
    //     //                 setEvents(updatedExpenses)
    //     //             }, 1000);
    //     //         }
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log(err)
    //     //     })
    // }

    const deleteExpense = (id) => {
        console.log(id);
        axios.delete(`/api/admin/budget/operations/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setOperations(operations.filter(operation => operation._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const operationValidationSchema = Yup.object().shape({
        // places: Yup.array(),
        title: Yup.string()
            .max(100, 'Vous avez atteint la limite de caractères autorisés (100).')
            .required('Merci de remplir ce champ'),
        // price: Yup.string()
        //     .required('Merci de remplir ce champ'),
        price: Yup.number()
            .test(
                "maxDigitsAfterDecimal",
                "Format invalide.",
                (number) => /^\d+(\.\d{1,2})?$/.test(number)
            ),
        description: Yup.string()
            .max(300, 'La description ne peut dépasser 300 caractères.')
            .required('Merci de remplir ce champ')
    })

    const formik = useFormik({
        initialValues: newOperationValues,
        onSubmit: async (values) => {
            axios.post(`/api/admin/budget/operations/add/${budgetID}`,
            {
                title: values.title,
                price: values.price,
                description: values.description
            })
            .then((res) => {
                if(res.data != null){
                    setnewOperation(newOperation)
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err)})
        },
        validationSchema: operationValidationSchema,
        enableReinitialize: true,
    })

    const newOperationForm = (e) => {
        e.preventDefault();
        toggleOperationForm(!operationForm);
    }

    let sum = operations.reduce((a, b) => a + b.price, 0)/100;
    function total(sum){
        return Number(sum).toFixed(2);
    }

    return(
        <div className="budget-container">
            {scrollBtn}
            <div className="budget">
                <div className="budget___bgimage" />
                <div className="budget___title">
                    <div className="budget___title_style">
                        <h2>Dépenses</h2>
                    </div>
                </div>
                <div className="row budget-cols">
                    <div className="col budget___col-1">
                        <div className="col card-component">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-2 card-strip" style={{backgroundColor: "rgb(249, 225, 224)"}}></div>
                                    <div className="col-10 card-pd">
                                        <div className="card-body">
                                            <h5 className="card-title">Dépenses <small>(en {budget.currency})</small></h5>
                                            <span>{total(sum)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col budget___col-2">
                        <div className="budget___col-2___style input-group mb-3">
                            <Formik>
                                <div className="budget-form">
                                    <div className="budget-form___add-btn mt-30">
                                        <button onClick={newOperationForm}>Ajouter une nouvelle opération</button>
                                    </div>
                                    <Form className="row g-3 budget-form___style" onSubmit={formik.handleSubmit} style={{display: operationForm ? 'flex' : 'none'}}>
                                        <TextField 
                                            size="col-12"
                                            label="Motif"
                                            name="title" 
                                            type="text" 
                                            // placeholder="Réception, cérémonie, église..."
                                            value={formik.values.title} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                            required
                                        />
                                        <TextField 
                                            size="col-12"
                                            label="Description" 
                                            name="description" 
                                            type="text" 
                                            value={formik.values.description} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                        />
                                        <TextField 
                                            size="col-3"
                                            width="100%"
                                            label="Montant" 
                                            name="price" 
                                            type="number"
                                            value={formik.values.price} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                            required
                                            // placeholder="Exemple: Salle des fêtes de la ville"
                                        /><span>€</span>
                                        <div className="col-12 budget-form___submit">
                                            <button className="btn-style-s" type="submit" disabled={formik.isSubmitting}>
                                                Valider
                                            </button>
                                        </div>
                                    </Form>
                                </div>    
                            </Formik> 
                            <Expenses 
                            expenses={operations}
                            deleteExpense={deleteExpense}
                            // updateExpense={editExpense}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Budget;