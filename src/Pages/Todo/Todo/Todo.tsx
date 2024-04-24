import "./Todo.css";

import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { History } from "history";

import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CustomIconButton from "../../../components/Buttons/SmallIconButton/IconButton";
import UpdateForm from "../Update/Form";
import DefaultModal from "../../../components/Modals/Default/DefaultModal";

import { updateTodosStatus, deleteTodo } from '../../../services';
import { TaskType, TodosProps } from "../../../../types";
import { useCurrentUser } from "../../../ctx/userCtx";

type EditType = {
  id?: string;
  text?: string;
}

const Todo = (props: TodosProps) => {
  const { 
    todos, 
    setTodos, 
    todo, 
    setMessage, 
    setMessageType, 
    setTodo,
    checked,
    setChecked } = props;

  const history: History = useHistory();
  const { mariageID } = useCurrentUser();
  const { id: todoId } = useParams<{id: string}>();

  const [edit, setEdit] = useState<EditType | null>(null);
  const [input, setInput] = useState<string>("");

  const getUpdatedId = (objId: string, objText: string): void => {
    setEdit({
      id: objId,
    });
    setInput(objText);
  };

  const toggleCompleted = async (task: TaskType): Promise<void> => {
    setTodo(task._id)

    const updatedList = [...todos].map((todo) => {
      if (todo._id === task._id) {
        todo.isCompleted = !task.isCompleted;
      }
      return todo;
    });

    const response = await updateTodosStatus({ isCompleted: task.isCompleted, id: task._id })
    const { success } = response;

    if(!success) {
      setMessageType("error");
      setMessage("Oups, une erreur est survenue lors de la modification de l'état de la tâche");

      setTimeout(() => {
        setMessage(undefined);
        setMessageType(undefined);
        setTodo(null);
      }, 2000);
      return;
    }

    setTodos(updatedList);
    setMessageType("success");
    setMessage("Modifications enregistrées");

    setTimeout(() => {
      setMessageType(undefined);
      setMessage(undefined);
      setTodo(null);
    }, 2000);
  };

  const handleEditTodo = (todo: TaskType): void => {
    getUpdatedId(todo._id, todo.text);

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/taches/edit/${todoId}`, { currentPosition })
  };

  const handleCloseModal = () => {
    setEdit(null);
    setInput("");
    setChecked(false);

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/taches`, { currentPosition })
  }

  return (
    <>
    <li
      key={todo?._id}
      className={
        todo?.isCompleted
          ? "tasks-list__li__done fade-in"
          : "tasks-list__li fade-in"
      }
      style={edit === todo?._id ? { backgroundColor: `#F5F5F5` } : undefined} // Change null to undefined
    >
      <Grid2
          container
          display={"flex"}
          flexDirection={"row"}
          p={"1rem"}
          width={"100%"}
          flexWrap={"inherit"}
        >
          <Grid2 display={"flex"} alignItems={"center"} width={"100%"}>
            {todo?.isCompleted ? (
              <IconButton onClick={() => toggleCompleted(todo!)}>
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton onClick={() => toggleCompleted(todo!)}>
                <RadioButtonUncheckedIcon />
              </IconButton>
            )}
            <span>{todo?.text}</span>
          </Grid2>
          {checked && <Grid2 className="todolist___checkbox_span">
            <CustomIconButton
            type="submit"
            buttonType='edit' 
            obj={todo} 
            onClick={() => handleEditTodo(todo!)} 
            />
          </Grid2>}
        </Grid2>
      </li>
      {edit?.id === todo?._id && (
        <DefaultModal
          setEdit={setEdit}
          selectedId={edit?.id}
          open={checked}
          handleClose={handleCloseModal}
          title="Modifier la tâche"
          setOpen={setChecked}
        >
          <UpdateForm
          edit={edit}
          setEdit={setEdit}
          input={input}
          setInput={setInput}
          setTodos={setTodos}
          todos={todos}
          setMessage={setMessage}
          setMessageType={setMessageType}
          mariageID={mariageID}
          setTodo={setTodo}
          setOpen={setChecked}
          handleCancel={handleCloseModal}
          />
        </DefaultModal>
      )}
    </>
  );
};

export default Todo;
