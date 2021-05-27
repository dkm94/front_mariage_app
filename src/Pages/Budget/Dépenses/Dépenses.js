import React, { useState } from 'react';
// import UpdateForm from "./UpdateEvent";
import "./Dépenses.css";

const Expenses = ({ expenses, deleteExpense }) => {

    const [edit, setEdit] = useState({
        id: null,
        obj: {
            expenseTitle: '',
            expensePrice: '',
            expenseDescription: ''
        }
    })

    // const submitUpdate = obj => {
    //     updateExpense(obj);
    //     setEdit({
    //         id: null,
    //         obj: {
    //             expenseTitle: '',
    //             expensePrice: '',
    //             expenseDescription: ''
    //         }
    //     });
    // };

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
                    <ul className="col-10">
                        <div className="close-btn">
                            <button onClick={() => {deleteExpense(obj._id)}}>✖</button>
                        </div>
                        <li>{obj.title}</li>
                        <li>{obj.description}</li>
                        <li>{financial(prix)}</li>
                        {/* <li>{prix.toFixed(2)}</li> */}
                    </ul>
                    {/* {edit.id === obj._id ? 
                    (<UpdateForm edit={edit} setEdit={setEdit} onSubmit={submitUpdate}/>) : 
                    (<>
                        <ul className="events-list___li">
                        <li>{obj.eventTitle}</li>
                        <li>{obj.eventPlace}</li>
                        <li>{obj.eventTime.replace('T', ' à ')}</li>
                        <li>{obj.eventAddress}</li>
                    </ul>
        
                    <div>
                        <button onClick={() => setEdit({
                            id: obj._id, 
                            obj: {
                                eventTitle: obj.eventTitle,
                                eventPlace: obj.eventPlace,
                                eventTime: obj.eventTime,
                                eventAddress: obj.eventAddress
                            }
                        })}>
                            <i className="fas fa-pencil-alt"/>
                        </button>
                        
                        <button className="del-btn" onClick={() => {deleteEvent(obj._id)}}>
                            <i className="fas fa-trash"/>
                        </button>
                    </div>
                    </>)} */}
                    
                </li>
                }
                )
            }
        </ul>
    )
}

export default Expenses;
