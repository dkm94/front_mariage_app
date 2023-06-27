import React, { useState, useRef } from "react";
import UpdateForm from "../Update/Form";
import "./List.css";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
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
}) => {
  const [edit, setEdit] = useState({
    id: null,
    obj: {
      text: "",
      color: "",
    },
  });
  const [input, setInput] = useState(edit ? edit.obj : "");
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
      if (obj._id === edit.id) {
        obj.text = input.text;
      }
      return obj;
    });
    await axios
      .post(`/api/admin/todolist/edit/${edit.id}`, input)
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
      key={i}
      data-id={obj._id}
      className={
        obj.isCompleted
          ? "tasks-list__li__done fade-in"
          : "tasks-list__li fade-in"
      }
      style={edit.id === obj._id ? { backgroundColor: `#F5F5F5` } : null}
    >
      {edit.id === obj._id ? (
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
            <span>{obj.text}</span>
          </Grid2>
          <Grid2 className="todolist___checkbox_span">
            {obj.isCompleted ? (
              <IconButton onClick={() => toggleCompleted(obj)}>
                <CheckCircleIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => toggleCompleted(obj)}>
                <RadioButtonUncheckedIcon />
              </IconButton>
            )}
            {edit.id ? (
              <Button
                onClick={(e) => {
                  editTodo(e);
                }}
                style={{ backgroundColor: "#efebe9" }}
              >
                Valider
              </Button>
            ) : (
              <IconButton
                disabled={obj.isCompleted && true}
                onClick={() => getUpdatedId(obj._id, obj.text)}
              >
                <CreateIcon />
              </IconButton>
              // <BlackButton
              //
              //   style={obj.isCompleted ? { backgroundColor: "#efebe9" } : null}
              //   text={"Modifier"}
              // />
            )}
            <IconButton>
              <DeleteIcon
                onClick={() => {
                  deleteTodo(obj._id);
                }}
              />
            </IconButton>
          </Grid2>
        </Grid2>
      )}
      {/* <div className="custom-dropdown">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu size="sm" title="">
                        {edit.id ? (<>
                            <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {editTodo(e)}}>Valider</Dropdown.Item>
                        </>) : (<>
                            {!obj.isCompleted ? 
                            <Dropdown.Item onClick={() => getUpdatedId(obj._id, obj.text)}>Modifier</Dropdown.Item> :
                            null
                            }
                            <Dropdown.Item onClick={() => {deleteTodo(obj._id)}}>Supprimer</Dropdown.Item>
                        </>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div> */}
    </Grid2>
  );
};

export default Todos;
