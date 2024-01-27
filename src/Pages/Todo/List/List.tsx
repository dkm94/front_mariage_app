import "./List.css";

import React, { useState, useRef } from "react";

import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CustomIconButton from "../../../components/Buttons/SmallIconButton/IconButton";

import UpdateForm from "../Update/Form";
import { updateTodosStatus, deleteTodo } from '../../../services';
import { TaskType } from "../../../../types";

type EditType = {
  id?: string;
  text?: string;
}

const Todos = ({
  todos,
  setTodos,
  searchValue,
  setSearchValue,
  obj,
  i,
  isOpen,
  setisOpen,
  setMessage,
  setMessageType
}) => {
  const [edit, setEdit] = useState<EditType | null>(null);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const getUpdatedId = (objId: string, objText: string) => {
    setEdit({
      id: objId,
    });
    setInput(objText);
  };

  const toggleCompleted = async (task) => {
    const updatedList = [...todos].map((todo) => {
      if (todo._id === task._id) {
        todo.isCompleted = !task.isCompleted;
      }
      return todo;
    });

    const response = await updateTodosStatus({ isCompleted: task.isCompleted, id: task._id })
    const { success, message } = response;

    if(!success) {
      setMessageType("error");
      setMessage(message);
      return;
    }

    setTimeout(() => {
      setTodos(updatedList);
    }, 500);
  };

  const deleteTodoFn = async (id) => {
    const response = await deleteTodo({ id })
    const { success, message } = response;

    if(!success) {
      setMessageType("error");
      setMessage(message);
      return;
    }

    setTodos(todos.filter((todo: TaskType) => todo._id !== id));
  };


  return (
    <Grid2
      component="div" // Add the component prop with value "div"
      xs={12}
      key={obj._id}
      className={
        obj.isCompleted
          ? "tasks-list__li__done fade-in"
          : "tasks-list__li fade-in"
      }
      style={edit === obj._id ? { backgroundColor: `#F5F5F5` } : undefined} // Change null to undefined
    >
      {edit?.id === obj._id ? (
        <UpdateForm
          edit={edit}
          setEdit={setEdit}
          input={input}
          setInput={setInput}
          inputRef={inputRef}
          setTodos={setTodos}
          todos={todos}
          setMessage={setMessage}
          setMessageType={setMessageType}
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
            onClick={() => deleteTodoFn(obj._id)} 
            />

          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};

export default Todos;
