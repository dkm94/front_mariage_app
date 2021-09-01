import React from 'react';
import "./Form.css";

const Form = ({ todo, handleInput, addTodo }) => {

  const handleValue = content => {
    handleInput(content)
  }

  return(
    <div className="add-todo___form input-group mb-3">
      <form onSubmit={addTodo} className="input-group mb-3">
        <div>
          <input
          type="text"
          name="text" 
          value={todo.text} 
          onChange={handleValue}
          className="form-control shadow-none"
          placeholder="Nouvelle tâche"
          required
          />
          <button type="submit" className="btn shadow-none"><i className="fas fa-check" aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  )
  }
    

export default Form;