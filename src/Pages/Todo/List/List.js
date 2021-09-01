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
    
    const toggleCompleted = (task) => {  
        const updatedList = [...todos].map((todo) => {
            if(todo._id === task._id){
                todo.isCompleted = !task.isCompleted
            }
            return todo
        })
        axios.post(`/api/admin/todolist/edit/${task._id}`, {
            _id: task._id,
            isCompleted: task.isCompleted
        })
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setTodos(updatedList)
                    }, 500);
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
                        <li key={obj._id} className={obj.isCompleted ? 'col-12 tasks-list__li__done' : "col-12 tasks-list__li"} style={obj.isCompleted ? null : {backgroundColor: `#${obj.color}`}}>
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
                                <div className="todolist___checkbox_span">
                                    <input 
                                        type="checkbox"
                                        onClick={() => toggleCompleted(obj)}
                                        checked={obj.isCompleted} 
                                    />
                                    <span>{obj.text}</span>
                                </div>
                                <div className="todolist___li-btns">
                                    <button disabled={obj.isCompleted} onClick={() => getUpdatedId(obj._id, obj.text)}>
                                        <i className="fas fa-pencil-alt"/>
                                    </button>
                                    <button className="del-btn" onClick={() => {deleteTodo(obj._id)}}>
                                        <i className="fas fa-times" aria-hidden="true"></i>
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
