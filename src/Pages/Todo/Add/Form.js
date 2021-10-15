import React from 'react';
import "./Form.css";

const Form = ({ todo, handleInput, addTodo }) => {

  const handleValue = content => {
    handleInput(content)
  }

  return(
    <div className="glass-div mb-3">
      <h1>Souhaitez-vous ajouter de nouvelles tâches ?</h1>
      <form onSubmit={addTodo} className="input-group mb-3">
        <div className="add-task-style">
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