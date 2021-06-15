import React, { useState } from 'react';
import UpdateForm from "../Update/Form";
import "./List.css";

const Todos = ({ todos, deleteTodo }) => {

    const [edit, setEdit] = useState({
        id: null,
        obj: {
            text: '',
            color: ''
        }
    })

    const submitUpdate = obj => {
        // updateEvent(obj);
        setEdit({
            id: null,
            obj: {
                text: '',
                color: ''
            }
        });
    };

    return(
        <ul className="tasks-list">
            {
                todos.map(obj => (
                    <li key={obj._id} className="col-12">
                        {edit.id === obj._id ? 
                        (<UpdateForm edit={edit} setEdit={setEdit} onSubmit={submitUpdate}/>) : 
                        (<>
                            <span>{obj.text}</span>
                            <div>
                                <button onClick={() => setEdit({
                                    id: obj._id, 
                                    obj: {
                                        text: '',
                                        color: ''
                                    }
                                })}>
                                    <i className="fas fa-pencil-alt"/>
                                </button>
                                
                                <button className="del-btn" onClick={() => {deleteTodo(obj._id)}}>
                                    <i className="fas fa-trash"/>
                                </button>
                            </div>
                        </>)}
                        
                    </li>)
                )
            }
        </ul>
    )
}

export default Todos;
