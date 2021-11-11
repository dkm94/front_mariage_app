import React, { useState, useRef } from 'react';
import { Col } from 'react-bootstrap';
import addTask from "../../../img/add-list.png";
import "./Form.css";
import axios from "axios";

const Form = ({ addTodo }) => {

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
      setInput(e.target.value)
  }

  const handleSumbit = e => {
    e.preventDefault();
    setLoading(true)
    axios.post(`/api/admin/todolist/add`, {
      text: input
    })
      .then((res) => {
        addTodo(res.data);
        setInput("");
        setLoading(false);
      })
      .catch((err) => {
          console.log(err)})
  }

  return(
    <Col xs={12} sm={10} md={6} className="add-task-form" >
      <form onSubmit={handleSumbit} className="input-group mb-3">
        <div className="add-input">
          <img src={addTask} alt="add todo icone" />
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
          <button type="submit" className="btn shadow-none">{loading ? "..." : "Ajouter"}</button>
        </div>
      </form>
    </Col>
  )
  }
    

export default Form;