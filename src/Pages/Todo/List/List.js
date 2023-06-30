import React, { useState, useRef } from "react";
import UpdateForm from "../Update/Form";
import "./List.css";
import axios from "axios";
import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CreateIcon from "@mui/icons-material/Create";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const Todos = ({
  todos,
  setTodos,
  deleteTodo,
  searchValue,
  setSearchValue,
  obj,
  i,
  isOpen,
  setisOpen,
}) => {
  const [edit, setEdit] = useState(null);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUpdatedId = (objId, objText) => {
    setEdit({
      id: objId,
    });
    setInput({
      text: objText,
    });
  };

  const editTodo = async (e) => {
    e.preventDefault();
    const updatedTodoList = [...todos].map((obj) => {
      if (obj._id === edit) {
        obj.text = input.text;
      }
      return obj;
    });
    await axios
      .post(`/api/admin/todolist/edit/${edit}`, input)
      .then((res) => {
        if (res.data != null) {
          setTimeout(() => {
            setTodos(updatedTodoList);
            setEdit("");
            setInput("");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleCompleted = async (task) => {
    const updatedList = [...todos].map((todo) => {
      if (todo._id === task._id) {
        todo.isCompleted = !task.isCompleted;
      }
      return todo;
    });
    await axios
      .post(`/api/admin/todolist/edit/${task._id}`, {
        _id: task._id,
        isCompleted: task.isCompleted,
      })
      .then((res) => {
        if (res.data != null) {
          setTimeout(() => {
            setTodos(updatedList);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid2
      xs={12}
      key={obj._id}
      className={
        obj.isCompleted
          ? "tasks-list__li__done fade-in"
          : "tasks-list__li fade-in"
      }
      style={edit === obj._id ? { backgroundColor: `#F5F5F5` } : null}
    >
      {edit?.id === obj._id ? (
        <UpdateForm
          edit={edit}
          setEdit={setEdit}
          input={input}
          setInput={setInput}
          inputRef={inputRef}
          editTodo={editTodo}
          handleChange={handleChange}
        />
      ) : (
        <Grid2
          container
          display={"flex"}
          flexDirection={"row"}
          p={"1rem 3rem"}
          width={"100%"}
          flexWrap={"inherit"}
        >
          <Grid2 display={"flex"} alignItems={"center"} width={"100%"}>
            {obj.isCompleted ? (
              <IconButton onClick={() => toggleCompleted(obj)}>
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton onClick={() => toggleCompleted(obj)}>
                <RadioButtonUncheckedIcon />
              </IconButton>
            )}
            <span>{obj.text}</span>
          </Grid2>
          <Grid2 className="todolist___checkbox_span">
            <IconButton
              disabled={obj.isCompleted && true}
              onClick={() => getUpdatedId(obj._id, obj.text)}
              style={{
                backgroundColor: obj.isCompleted ? "lightgrey" : "#fff",
                border: "1px solid lightgray",
                borderRadius: "5px",
                color: obj.isCompleted ? "grey" : "#262626",
              }}
            >
              <CreateIcon fontSize="small" />
            </IconButton>
            <IconButton
              style={{
                backgroundColor: "darkred",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              <DeleteIcon
                fontSize="small"
                onClick={() => {
                  deleteTodo(obj._id);
                }}
              />
            </IconButton>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};

export default Todos;
