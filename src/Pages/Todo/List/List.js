import "./List.css";

import React, { useState, useRef } from "react";
import axios from "axios";

import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CustomIconButton from "../../../components/Buttons/SmallIconButton/IconButton";

import UpdateForm from "../Update/Form";

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
    await axios
      .post(`/api/admin/todolist/edit/${edit.id}`, { text: input })
      .then((res) => {
        if (res.data != null) {
          const todosCopy = [...todos]
          const selectedTodo = todosCopy.find((t) => t._id === edit.id);
          if(selectedTodo){
            selectedTodo.text = input;
          }
          setTimeout(() => {
            setTodos([...todosCopy]);
            setEdit("");
            setInput("");
          }, 1000);
        }
      })
      .catch((err) => {
        //todo: handle error
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
        //todo: handle error
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
            
            <CustomIconButton
            type="submit"
            buttonType='edit' 
            obj={obj} 
            onClick={() => getUpdatedId(obj._id, obj.text)} 
            />

            <CustomIconButton 
            type="submit"
            buttonType="delete"
            onClick={() => deleteTodo(obj._id)} 
            />

          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};

export default Todos;
