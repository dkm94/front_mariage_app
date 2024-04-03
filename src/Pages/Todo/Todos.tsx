import "./Todo.css";

import React, { ChangeEvent, useState } from "react";

import { Row, Col } from "react-bootstrap";
import { Select, MenuItem, Container } from "@mui/material";
import Grow from "@mui/material/Grow";

import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import SearchBar from "../Guests/SearchBar/SearchBar";
import AddForm from "./Add/Form";

import { useFetch } from "../../hooks";
import { TaskType } from "../../../types";
import { getTodos } from "../../services";
import { SwitchEditMode } from "../../components/Buttons";
import Todolist from "./Todolist/Todolist";
import { SectionTitle } from "../../components";

const Todos = () => {
  const { data: todos, setData: setTodos, loading } = useFetch<void, TaskType[]>(getTodos, []);
  const [todo, setTodo] = useState<string | null>(null);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<any>("all");
  const [checked, setChecked] = useState<boolean>(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

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

      <div style={{ padding: "0 4rem", marginTop: "20px" }}>
        <SwitchEditMode checked={checked} onChange={switchHandler} />
      </div>

      <Grow in={!loading} timeout={4000}>
        <div className="task-container">
            
            <div className="tasks__list">
              <SectionTitle title="Liste des tâches" />
              <Todolist
              todos={todos}
              setTodos={setTodos}
              searchValue={searchValue}
              selected={selected}
              checked={checked} 
              setMessage={setMessage} 
              setMessageType={setMessageType}  
              setTodo={setTodo}                
              />
            </div>
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Todos;
