import React, { useState } from 'react';
import axios from "axios";
import "./Form.css";

const Form = ({ todos, setTodos }) => {

  const [todo, setTodo] = useState({text:"", color: ""})

  const settodos = updatedTodoList => {
    console.log("updatedTodoList :", updatedTodoList)
    setTodos(updatedTodoList)
  }

  const handleInput = (e) => {
    const {value, name} = e.target;
    setTodo(prevState => ({
        ...prevState,
        [name]: value
    }))
  } 

  const submit = (e) => {
    e.preventDefault();
    axios.post(`/api/admin/todolist/add`, todo)
      .then((res) => {
          if(res.data != null){
            settodos([...todos, todo])
            setTodo({text:"", color: ""})
          }
      })
      .catch((err) => {
          console.log(err)})
      }

  return(
    <div className="add-todo___form">
      <form onSubmit={submit}>
        <input
        type="text"
        name="text" 
        value={todo.text} 
        onChange={handleInput}
        className="todo-input"
        placeholder="Nouvelle tâche"
        required
        />
        <button type="submit">OK</button>
      </form>
    </div>
  )
  }
    

export default Form;