import "./Form.css";

import React, { useState, useRef } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { GreyButton } from "../../../components/Buttons";

const Form = ({ addTodo }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`/api/admin/todolist/add`, {
        text: input,
      })
      .then((res) => {
        addTodo(res.data);
        setInput("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
          size="small"
          variant="contained"
          type="submit"
          style={{ marginLeft: "12px" }}
          text={loading ? "..." : "Créer"}
        />
      </form>
    </Col>
  );
};

export default Form;