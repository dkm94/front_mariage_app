import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Form.css";

const Form = ({ todo, handleInput, addTodo }) => {

  const handleValue = content => {
    handleInput(content)
  }

  return(
    <Container style={{ padding: "2rem 4rem"}} fluid>
      <Row>
        <Col>
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
              <button type="submit" className="btn shadow-none"><i className="fas fa-long-arrow-alt-right" /></button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  )
  }
    

export default Form;