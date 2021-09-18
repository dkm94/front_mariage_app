import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, useFormik } from "formik";
import PieChart from "../../components/Expenses/Graph/PieChart";
import TextField from "../../components/Formik/TextField-operations";
import { UserContext, ScrollButtonContext } from "../../../src/App";
import Expenses from "./Dépenses/Dépenses";
import * as Yup from "yup";
import axios from "axios";

import "./Budget.css";

const Budget = () => {
 
    const { budgetID } = useContext(UserContext)
    const scrollBtn = useContext(ScrollButtonContext)

    const newOperationValues = {
        category: '', 
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
        category: Yup.string()
            .required('Veuillez choisir une catégorie.'),
        price: Yup.number()
            .test(
                "maxDigitsAfterDecimal",
                "Format invalide.",
                (number) => /^\d+(\.\d{1,2})?$/.test(number)
            )
            .required('Veuillez compléter ce champ.'),
        description: Yup.string()
            .max(300, 'La description ne peut dépasser 300 caractères.')
            .required('Veuillez compléter ce champ.')
    })

    const formik = useFormik({
        initialValues: newOperationValues,
        onSubmit: async (values) => {
            axios.post(`/api/admin/budget/operations/add/${budgetID}`,
            {
                category: values.category,
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
        <div className="budget-container page-component">
            {scrollBtn}
            <div className="budget">
                <div className="budget___bgimage" />
                <div className="budget___title">
                    <div className="budget___title_style">
                        <h2>Dépenses</h2>
                    </div>
                </div>
                <div className="budget-cols">
                    <div className="col budget___col-1">
                        <div className="col card-component">
                            <div className="card">
                                <div className="g-0">
                                    <div className="card-pd">
                                        <div className="card-body">
                                            <h5 className="card-title">Dépenses <small>(en {budget.currency})</small></h5>
                                            <span>{total(sum)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col chart-component" style={{ width: '100%', height: 300 }}>
                            <PieChart operations={operations}/>
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
                                        
                                        <div className="budget___select">
                                            <select 
                                                name="category" 
                                                value={formik.values.category} 
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="" label="Sélectionnez une catégorie"></option>
                                                <option value="Locations" label="Locations"></option>
                                                <option value="Habillement/Beauté" label="Habillement/Beauté"></option>
                                                <option value="Décoration/Fleurs" label="Décoration/Fleurs"></option>
                                                <option value="Alliances/Bijoux" label="Alliances/Bijoux"></option>
                                                <option value="Animation" label="Animation (DJ, Photographe...)"></option>
                                                <option value="Traiteur" label="Traiteur"></option>
                                                <option value="Faire-part" label="Faire-part"></option>
                                                <option value="Autres" label="Autres"></option>
                                            </select>
                                            {formik.errors.category &&
                                            formik.touched.category &&
                                            <div className="input-feedback error">
                                            {formik.errors.category}
                                            </div>}
                                        </div>
                                        <TextField 
                                            size="col-12"
                                            label="Description" 
                                            name="description" 
                                            type="text" 
                                            value={formik.values.description} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                            errors={formik.errors}
                                            touched={formik.touched}
                                        />
                                        <TextField 
                                            size="col-3"
                                            width="100%"
                                            inputwidth="5rem"
                                            label="Montant" 
                                            name="price" 
                                            type="number"
                                            value={formik.values.price} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                            errors={formik.errors}
                                            touched={formik.touched}
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