import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import AddForm from "./Add/Form";
import List from "./List/List"
import { ScrollButtonContext } from "../../../src/App";
import "./Todo.css";
import axios from 'axios';


const Todo = () => {
    const scrollBtn = useContext(ScrollButtonContext);

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({text:"", color: ""})
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/todolist/")
            setTodos(result.data)
        }
        fetchData();
    }, [todos]) 

    const handleInput = (e) => {
        const {value, name} = e.target;
        setTodo(prevState => ({
            ...prevState,
            [name]: value
        }))
    } 

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const addTodo = (e) => {
        e.preventDefault();
        const newTodo = {
            // _id: undefined,
            text: todo.text,
            color: "#EAE3C9",
            isCompleted: false,
            // mariageId: undefined
        }
        axios.post(`/api/admin/todolist/add`, newTodo)
            .then((res) => {
                if(res.data != null){
                    setTodos([...todos, todo])
                    setTodo({text:"", color: ""})
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteTodo = (id) => {
        axios.delete(`/api/admin/todolist/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setTodos(todos.filter(todo => todo._id !== id))
                }
            })
    }

    return(
        <div className='todo-container page-component'>
            {scrollBtn}
            <div className="todo">
                <div className="todo___bgimage" />
                <div className="titles mb-3">
                    <h1>Souhaitez-vous ajouter de nouvelles tâches ?</h1>
                </div>
                <Container style={{ padding: "2rem 4rem"}} fluid>
                    <Row>
                        <AddForm 
                        todos={todos}
                        setTodos={setTodos}
                        todo={todo}
                        setTodo={setTodo}
                        addTodo={addTodo}
                        handleInput={handleInput}
                        />
                        <Col xs={8} md={6} className="searchbar">
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
                <div className="todo-list">
                    <List 
                    todos={todos}
                    setTodos={setTodos}
                    deleteTodo={deleteTodo}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    />
                </div>
            </div>
        </div>
    )
}

export default Todo;