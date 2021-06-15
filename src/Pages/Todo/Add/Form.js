import React from 'react';
import "./Form.css";

const Form = ({ todo, handleInput, addTodo }) => {

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