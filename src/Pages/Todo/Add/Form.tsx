import "./Form.css";

import React, { useState, useRef } from "react";
import { Col } from "react-bootstrap";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { GreyButton } from "../../../components/Buttons";
import { addTodo } from "../../../services";

const Form = ({ todos, setTodos, setMessage, setMessageType }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await addTodo({ text: input });
    const { success, message, data: newTodo } = response;
    if (!success) {
      setMessageType("error");
      setMessage(message);
      setLoading(false);
      return;
    }

    setTodos([...todos, newTodo]);
    setInput("");
    setLoading(false);
  };

  return (
    <Col xs={12} sm={10} md={6} className="add-task-form">
      <form onSubmit={handleSumbit} className="todo__form-input">
        <div className="add-input">
          <EditNoteIcon style={{ height: "auto", color: "#b2a9a9" }} />
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
        </div>
        <GreyButton
          variant="contained"
          type="submit"
          style={{ marginLeft: "12px", height: "97%", borderRadius: "5px 20px 20px 5px" }}
          text={loading ? "..." : "Créer"}
        />
      </form>
    </Col>
  );
};

export default Form;
