import React, { useContext, useState, useEffect } from "react";
import AddForm from "./Add/Form";
import List from "./List/List"
import { ScrollButtonContext } from "../../../src/App";
import "./Todo.css";
import axios from 'axios';


const Todo = () => {
    const scrollBtn = useContext(ScrollButtonContext);

    const [todos, setTodos] = useState([]);
    
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/todolist/")
            setTodos(result.data)
        }
        fetchData();
    }, []) 

    console.log("Todos: ", todos)

    return(
        <div className='todo-container'>
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
                    />
                    <List 
                    todos={todos}
                    />
                </div>
            </div>
        </div>
    )
}

export default Todo;