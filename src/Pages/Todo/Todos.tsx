import "./Todo.css";

import React, { ChangeEvent, useState } from "react";

import { Row, Col } from "react-bootstrap";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Select, MenuItem, Container } from "@mui/material";
import Grow from "@mui/material/Grow";

import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import SearchBar from "../Guests/SearchBar/SearchBar";
import AddForm from "./Add/Form";
import Todo from "./Todo/Todo";

import { useFetch } from "../../hooks";
import { TaskType } from "../../../types";
import { getTodos } from "../../services";

const Todos = () => {
  const { data: todos, setData: setTodos, loading } = useFetch<void, TaskType[]>(getTodos, []);
  const [todo, setTodo] = useState<string | null>(null);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<any>("all");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const completedTasks: number = todos.filter((todo: TaskType) => todo.isCompleted).length;

  return (
    <ContentLayout 
    loading={loading} 
    title={"Souhaitez-vous ajouter de nouvelles tâches ?"} 
    src={"todos"} 
    message={message} 
    messageType={messageType} 
    id={todo || ""}>
      <Container className="form-and-search">
        <Row>
          <AddForm
            todos={todos}
            setTodos={setTodos}
            setMessage={setMessage}
            setMessageType={setMessageType}
          />
          <Col xs={12} sm={10} md={6} className="searchbar">
            <SearchBar
              className="search__input"
              type="text"
              placeholder="Rechercher une tâche"
              name="searchbar"
              value={searchValue}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Container>
      {/* <Container style={{ padding: "0 4rem" }} fluid>
        <Row
          style={{
            display: "content",
            flexDirection: "row",
            marginLeft: "0",
          }}
        >
          <ClearButton
            text="Tout marquer comme terminé"
            type={"submit"}
            style={{ marginRight: "20px", marginBottom: "5px" }}
          />
          <ClearButton
            text="Tout marquer comme à faire"
            type={"submit"}
            style={{ marginRight: "20px", marginBottom: "5px" }}
          />
          <ClearButton
            text="Supprimer les tâches terminées"
            type={"submit"}
            style={{ marginRight: "20px", marginBottom: "5px" }}
          />
          <ClearButton
            text="Tout supprimer"
            type={"submit"}
            style={{ marginRight: "20px", marginBottom: "5px" }}
          />
        </Row>
      </Container> */}
      <Grow in={!loading} timeout={3000}>
        <Container id="result-select-section">
          <Row id="result-select">
            {todos && (
              <Col md={6}>
                <span className="tasks-title">Tâches complétées {completedTasks}/{todos?.length}</span>
              </Col>
            )}
            <Col md={6}>
              <Select
                style={{
                  fontFamily: "Playfair Display, serif !important",
                }}
                size="small"
                defaultValue={10}
                className="select-tasks"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <MenuItem
                  style={{
                    fontFamily: "Playfair Display, serif !important",
                  }}
                  value={"all"}
                >
                  Tout afficher
                </MenuItem>
                <MenuItem value={"done"}>Tâches terminées</MenuItem>
                <MenuItem value={"incomplete"}>Tâches à faire</MenuItem>
              </Select>
            </Col>
          </Row>
        </Container>
      </Grow>

      <Grow in={!loading} timeout={4000}>
        <Row className="task-container">
          <Container maxWidth="sm" className="task-container__">
            <div className="tasks__list">
              <Grid2
                container
                gap={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                width={"100%"}
              >
                {todos?.length === 0 && (
                  <span id="empty-task">
                    Vos tâches ici
                  </span>
                )}
                {todos
                  .filter((todo: TaskType) => {
                    return (
                      todo.text
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) >= 0
                    );
                  })
                  .reverse()
                  .filter((task) => {
                    if (selected === "done") {
                      return task.isCompleted;
                    } else if (selected === "incomplete") {
                      return !task.isCompleted;
                    } else {
                      return task;
                    }
                  })
                  .map((todo: TaskType) => (
                    <Todo
                    todos={todos}
                    key={todo._id}
                    setTodos={setTodos}
                    setMessage={setMessage}
                    setMessageType={setMessageType}
                    setTodo={setTodo}
                    todo={todo}
                      />
                  ))}
              </Grid2>
            </div>
          </Container>
        </Row>
      </Grow>
    </ContentLayout>
  );
};

export default Todos;
