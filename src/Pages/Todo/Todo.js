import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import AddForm from "./Add/Form";
import List from "./List/List";
import { ScrollButtonContext } from "../../../src/App";
import "./Todo.css";
import axios from "axios";
import ClearButton from "../../components/Buttons/Clear/ClearButton";
import { Select, MenuItem, Container, Divider } from "@mui/material";

const Todo = () => {
  const scrollBtn = useContext(ScrollButtonContext);

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/admin/todolist/");
      setTodos(result.data);
    };
    fetchData();
  }, [todo]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const addTodo = (newTodo) => {
    setTodo(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/admin/todolist/delete/${id}`).then((res) => {
      if (res.data != null) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    });
  };

  const completedTasks = todos.filter((todo) => todo.isCompleted).length;

  return (
    <div className="todo-container page-component">
      {scrollBtn}
      <div className="todo">
        <div className="page-location">
          <div>
            <Link to={"/"}>Dashboard</Link>
            {">"} Tâches
          </div>
        </div>
        <div className="titles mb-3">
          <h2>Souhaitez-vous ajouter de nouvelles tâches ?</h2>
        </div>
        <div className="todo___bgimage">
          <div className="component-title">
            <h1>Les tâches</h1>
          </div>
        </div>
        <Container style={{ padding: "2rem 4rem" }} fluid>
          <Row>
            <AddForm
              // todos={todos}
              // setTodos={setTodos}
              // todo={todo}
              // setTodo={setTodo}
              addTodo={addTodo}
              // handleInput={handleInput}
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
        <Container style={{ padding: "0 4rem" }} fluid>
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
        </Container>
        <Container style={{ padding: "0 4rem" }} fluid>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            {todos && (
              <Col md={6}>
                <span style={{ fontSize: "1.3rem" }}>
                  Tâches complétées {completedTasks}/{todos?.length}
                </span>
              </Col>
            )}
            <Col md={6} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Select
                size="small"
                defaultValue={10}
                className="select-tasks"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <MenuItem value={"all"}>Tout afficher</MenuItem>
                <MenuItem value={"done"}>Tâches terminées</MenuItem>
                <MenuItem value={"incomplete"}>Tâches à faire</MenuItem>
              </Select>
            </Col>
          </Row>
        </Container>

        <Row>
          <Container maxWidth="sm" style={{ maxWidth: "700px" }}>
            <div className="tasks__list">
              <Grid2
                container
                gap={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                width={"100%"}
              >
                <div
                  style={{
                    padding: "3rem",
                    paddingBottom: "2rem",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>Liste des tâches</span>
                </div>
                <Divider
                  style={{
                    borderColor: "grey",
                    marginLeft: "3rem",
                    width: "85%",
                  }}
                />
                {todos
                  .filter((todo) => {
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
                  .map((todo, i) => (
                    <List
                      todos={todos}
                      obj={todo}
                      i={i}
                      setTodos={setTodos}
                      deleteTodo={deleteTodo}
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />
                  ))}
              </Grid2>
            </div>
          </Container>
        </Row>
      </div>
    </div>
  );
};

export default Todo;
