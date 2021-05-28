import React, { useState } from 'react';
import UpdateForm from "./UpdateDépense";
import "./Dépenses.css";

const Expenses = ({ expenses, deleteExpense, updateExpense }) => {

    const [edit, setEdit] = useState({
        id: null,
        obj: {
            title: '',
            price: '',
            description: ''
        }
    })

    const submitUpdate = obj => {
        updateExpense(obj);
        setEdit({
            id: null,
            obj: {
                title: '',
                price: '',
                description: ''
            }
        });
    };

    return(
        <ul className="budget-list">
            {
                expenses.map(obj => {
                    let prix = obj.price/100;
                    function financial(prix) {
                        return Number(prix).toFixed(2);
                    }
                    return <li key={obj._id} className="row mb-3">
                        <div className="col-2 li___strip" />
                        
                        <div className="expense-li col-10">
                            <div className="expense-li___btn">
                                <button onClick={() => {deleteExpense(obj._id)}}>✖</button>
                            </div>
                            {edit.id === obj._id ?
                                (<UpdateForm edit={edit} setEdit={setEdit} onSubmit={submitUpdate} />) :
                                (<>
                                    <ul className="">
                                        <li><strong>{obj.title}</strong></li>
                                        <li>{obj.description}</li>
                                        <li>{financial(prix)}</li>
                                    </ul>
                                    {/* <div className="expense_li___edit-btn">
                                        <button onClick={() => setEdit({
                                            id: obj._id, 
                                            obj: {
                                                title: obj.title,
                                                price: obj.price,
                                                description: obj.description,
                                            }
                                        })}>
                                            <i className="fas fa-pencil-alt"/>
                                        </button>
                                    </div> */}
                                </>)
                            }
                        </div>
                    </li>
                }
                )
            }
        </ul>
    )
}

export default Expenses;
