import React, { useState, useRef } from 'react';
import { Col } from 'react-bootstrap';
import "./Form.css";
import axios from "axios";

const Form = ({ addTodo }) => {

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleChange = e => {
      setInput(e.target.value)
  }

  const handleSumbit = e => {
    e.preventDefault();
    axios.post(`/api/admin/todolist/add`, {
      text: input
    })
      .then((res) => {
        addTodo(res.data)
        setInput("")
      })
      .catch((err) => {
          console.log(err)})
  }

  return(
    <Col xs={12} sm={10} md={6}>
      <form onSubmit={handleSumbit} className="input-group mb-3">
        <div className="add-task-style">
          <input
          type="text"
          name="text" 
          value={input} 
          onChange={handleChange}
          className="form-control shadow-none"
          placeholder="Nouvelle tâche"
          ref={inputRef}
          required
          />
          <button type="submit" className="btn shadow-none"><i className="fas fa-long-arrow-alt-right" /></button>
        </div>
      </form>
    </Col>
  )
  }
    

export default Form;