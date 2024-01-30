import "./Todo.css";

import React, { useState } from "react";
import axios from "axios";

import { Row, Col } from "react-bootstrap";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Select, MenuItem, Container, Divider } from "@mui/material";
import Grow from "@mui/material/Grow";

import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import AddForm from "./Add/Form";
import List from "./List/List";

import { useFetch } from "../../hooks";
import { TaskType } from "../../../types";
import { getTodos } from "../../services";
import Toast from "../../components/Toast/Toast";

const Todo = () => {
  const { data: todos, setData: setTodos } = useFetch<void, TaskType[]>(getTodos, []);
  const [todo, setTodo] = useState<TaskType | null>(null);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<any>("all");
  const [isOpen, setisOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const completedTasks = todos.filter((todo: TaskType) => todo.isCompleted).length;

  return (
    <ContentLayout 
    loading={loading} 
    title={"Souhaitez-vous ajouter de nouvelles tâches ?"} 
    src={"todos"} 
    message={message} 
    messageType={messageType} 
    id={todo?._id}>
      <Container style={{ padding: "2rem 4rem" }}>
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
        <Container style={{ padding: "0 4rem" }}>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {todos && (
              <Col md={6} style={{ marginBottom: "1rem" }}>
                <span
                  className="tasks-title"
                  style={{ fontSize: "1.3rem", marginBottom: "1rem" }}
                >
                  Tâches complétées {completedTasks}/{todos?.length}
                </span>
              </Col>
            )}
            <Col
              md={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
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
        <Row
          style={{
            marginRight: 0,
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
          className="task-container"
        >
          <Container
            maxWidth="sm"
            style={{ maxWidth: "700px" }}
            className="task-container__"
          >
            <div className="tasks__list">
              <Grid2
                container
                gap={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                width={"100%"}
              >
                <Divider
                  style={{
                    borderColor: "grey",
                    marginLeft: "3rem",
                    width: "85%",
                  }}
                />
                {todos?.length === 0 && (
                  <span
                    style={{
                      alignSelf: "center",
                      marginTop: "5rem",
                      fontSize: "1.3rem",
                    }}
                  >
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
                  .map((todo: TaskType, i) => (
                    <List
                      i={i}
                      todos={todos}
                      obj={todo}
                      key={todo._id}
                      setTodos={setTodos}
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                      isOpen={isOpen}
                      setisOpen={setisOpen}
                      setMessage={setMessage}
                      setMessageType={setMessageType}
                      setTodo={setTodo}
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

export default Todo;
