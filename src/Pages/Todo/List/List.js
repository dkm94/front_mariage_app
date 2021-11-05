import React, { useState, useRef } from 'react';
import UpdateForm from "../Update/Form";
import CustomToggle from '../../../components/Dots/Dots';
import Dropdown from "react-bootstrap/Dropdown";
import { Collapse, ListItem, List, Box } from '@material-ui/core';
import { TransitionGroup } from 'react-transition-group';
import "./List.css";
import axios from "axios";

const Todos = ({ todos, setTodos, deleteTodo, searchValue, setSearchValue }) => {

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
        <Box>
            <List className="tasks-list">
                <TransitionGroup>
                    {
                        todos
                        .filter((todo) => {
                            return todo.text.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
                        })
                        .map((obj, i) => {
                            return(
                                <Collapse>
                                    <ListItem 
                                    key={i}
                                    data-id={obj._id}
                                    className={obj.isCompleted ? 'col-12 tasks-list__li__done' : "col-12 tasks-list__li"} 
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
                                                    className="toggle"
                                                />
                                                <span>{obj.text}</span>
                                            </div>
                                        </>)}
                                        <div className="custom-dropdown">
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
                                        </div>
                                    </ListItem>
                                </Collapse>
                            )
                        })
                    }
                </TransitionGroup>
            </List>
        </Box>
    )
}

export default Todos;
