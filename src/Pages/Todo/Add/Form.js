import React, { useState } from 'react';
import axios from "axios";
import "./Form.css";

const Form = ({ todos, setTodos, todo, setTodo, handleInput, addTodo }) => {

  

  // const settodos = updatedTodoList => {
  //   console.log("updatedTodoList :", updatedTodoList)
  //   setTodos(updatedTodoList)
  // }

  const handleValue = content => {
    handleInput(content)
  }

  return(
    <div className="add-todo___form">
      <form onSubmit={addTodo}>
        <input
        type="text"
        name="text" 
        value={todo.text} 
        onChange={handleValue}
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