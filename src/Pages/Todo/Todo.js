import React, { useContext, useState, useEffect } from "react";
import AddForm from "./Add/Form";
import List from "./List/List"
import { ScrollButtonContext } from "../../../src/App";
import "./Todo.css";
import axios from 'axios';


const Todo = () => {
    const scrollBtn = useContext(ScrollButtonContext);

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({text:"", color: ""})
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/todolist/")
            setTodos(result.data)
        }
        fetchData();
    }, [todos]) 

    const handleInput = (e) => {
        const {value, name} = e.target;
        setTodo(prevState => ({
            ...prevState,
            [name]: value
        }))
    } 

    const addTodo = (e) => {
        e.preventDefault();
        const newTodo = {
            // _id: undefined,
            text: todo.text,
            color: "#D4A373",
            isCompleted: false,
            // mariageId: undefined
        }
        axios.post(`/api/admin/todolist/add`, newTodo)
            .then((res) => {
                if(res.data != null){
                    setTodos([...todos, todo])
                    setTodo({text:"", color: ""})
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteTodo = (id) => {
        axios.delete(`/api/admin/todolist/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setTodos(todos.filter(todo => todo._id !== id))
                }
            })
    }

    return(
        <div className='todo-container page-component'>
            {scrollBtn}
            <div className="todo">
                <div className="todo___bgimage" />
                <div className="todo___title">
                    <div className="todo___title_style">
                        <h2>Liste des tâches</h2>
                    </div>
                </div>
                <div className="todo-list container">
                    <AddForm 
                    todos={todos}
                    setTodos={setTodos}
                    todo={todo}
                    setTodo={setTodo}
                    addTodo={addTodo}
                    handleInput={handleInput}
                    />
                    <List 
                    todos={todos}
                    setTodos={setTodos}
                    deleteTodo={deleteTodo}
                    />
                </div>
            </div>
        </div>
    )
}

export default Todo;