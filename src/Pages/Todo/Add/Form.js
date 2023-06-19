import React, { useState, useRef } from "react";
import { Col } from "react-bootstrap";
import BlackButton from "../../../components/Buttons/Black/BlackButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "./Form.css";
import axios from "axios";

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
      <form onSubmit={handleSumbit} className="todo__form-input mb-3">
        <div className="add-input">
          {/* <img src={addTask} alt="add todo icone" /> */}
          <EditNoteIcon style={{ height: "auto" }} />
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
        <BlackButton
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
