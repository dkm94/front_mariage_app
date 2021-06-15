import React, { useState, useRef } from 'react';
import UpdateForm from "../Update/Form";
import "./List.css";
import axios from "axios";

const Todos = ({ todos, setTodos, deleteTodo }) => {
    
    const [edit, setEdit] = useState({
        id: null,
        obj: {
            text: '',
            color: ''
        }
    })
    const [input, setInput] = useState(edit ? edit.obj : '')
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const {value, name} = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getUpdatedId = (objId, objText) => {
        setEdit({
            id: objId
        })
        setInput({
            text: objText
        })
    }

    const editTodo = (e) => {
        e.preventDefault()
        const updatedTodoList = [...todos].map((obj) => {
            if(obj._id === edit.id) {
                obj.text = input.text
            }
            return obj
        })
        axios.post(`/api/admin/todolist/edit/${edit.id}`, input)
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setTodos(updatedTodoList)
                        setEdit('')
                        setInput('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <ul className="tasks-list">
            {
                todos.map(obj => {
                    return(
                        <li key={obj._id} className="col-12">
                            {edit.id === obj._id ? 
                            (<UpdateForm 
                                edit={edit} 
                                setEdit={setEdit}
                                input={input}
                                setInput={setInput}
                                inputRef={inputRef}
                                editTodo={editTodo}
                                handleChange={handleChange}
                            />) : 
                            (<>
                                <span>{obj.text}</span>
                                <div>
                                    <button onClick={() => getUpdatedId(obj._id, obj.text)}>
                                        <i className="fas fa-pencil-alt"/>
                                    </button>
                                    
                                    <button className="del-btn" onClick={() => {deleteTodo(obj._id)}}>
                                        <i className="fas fa-trash"/>
                                    </button>
                                </div>
                            </>)}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Todos;
