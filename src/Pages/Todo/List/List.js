import React, { useState, useRef } from 'react';
import UpdateForm from "../Update/Form";
import "./List.css";
import axios from "axios";
import { Button } from '@material-ui/core';
import { Col } from 'react-bootstrap';

const Todos = ({ todos, setTodos, deleteTodo, searchValue, setSearchValue, obj, i }) => {
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

    const editTodo = async (e) => {
        e.preventDefault()
        const updatedTodoList = [...todos].map((obj) => {
            if(obj._id === edit.id) {
                obj.text = input.text
            }
            return obj
        })
        await axios.post(`/api/admin/todolist/edit/${edit.id}`, input)
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
    
    const toggleCompleted = async (task) => {  
        const updatedList = [...todos].map((todo) => {
            if(todo._id === task._id){
                todo.isCompleted = !task.isCompleted
            }
            return todo
        })
        await axios.post(`/api/admin/todolist/edit/${task._id}`, {
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
        <Col 
        lg={2}
        md={4}
        sm={6}
        XS={12}
        key={i}
        data-id={obj._id}
        className={obj.isCompleted ? 'col-12 tasks-list__li__done fade-in' : "col-12 tasks-list__li fade-in"} 
        style={edit.id === obj._id ? {backgroundColor: `#F5F5F5`} : null}
        >
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
                        className="checkbox"
                    />
                </div>
                
                <div style={{ marginTop: "2rem" }}>
                    <span>{obj.text}</span>
                </div>
            </>)}
            {/* <div className="custom-dropdown">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu size="sm" title="">
                        {edit.id ? (<>
                            <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {editTodo(e)}}>Valider</Dropdown.Item>
                        </>) : (<>
                            {!obj.isCompleted ? 
                            <Dropdown.Item onClick={() => getUpdatedId(obj._id, obj.text)}>Modifier</Dropdown.Item> :
                            null
                            }
                            <Dropdown.Item onClick={() => {deleteTodo(obj._id)}}>Supprimer</Dropdown.Item>
                        </>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div> */}
            <div className='todo-view-details' >
                {edit.id ? (<Button onClick={(e) => {editTodo(e)}} style={{ backgroundColor: "#efebe9" }} >Valider</Button>) :
                (<Button disabled={obj.isCompleted && true} onClick={() => getUpdatedId(obj._id, obj.text)} style={{ backgroundColor: "#efebe9" }} >Modifier</Button>)}
            </div>
        </Col>
   
    )
}

export default Todos;
