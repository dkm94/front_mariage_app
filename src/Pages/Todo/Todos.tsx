import "./Todo.css";

import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";

import Grow from "@mui/material/Grow";

import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import SearchBar from "../Guests/SearchBar/SearchBar";
import AddForm from "./Add/Form";
import { AddButton, SwitchEditMode } from "../../components/Buttons";
import Todolist from "./Todolist/Todolist";
import { SectionTitle, SingleSelect } from "../../components";
import DefaultModal from "../../components/Modals/Default/DefaultModal";

import { useFetch } from "../../hooks";
import { TaskType } from "../../../types";
import { getTodos } from "../../services";
import { useCurrentUser } from "../../ctx/userCtx";

const selectArray = [
  { value: "all", name: "Toutes les tâches" },
  { value: "done", name: "Tâches terminées" },
  { value: "incomplete", name: "Tâches en cours" },
];

const Todos = () => {
  const history = useHistory();
  const{ mariageID } = useCurrentUser();

  const { data: todos, setData: setTodos, loading } = useFetch<void, TaskType[]>(getTodos, []);
  const [todo, setTodo] = useState<string | null>(null);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<any>("all");
  const [checked, setChecked] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const completedTasks: number = todos.filter((todo: TaskType) => todo.isCompleted).length;

  function handleModal(){
    setOpenModal(!openModal);
  }

  return (
    <ContentLayout 
    loading={loading} 
    title={"Souhaitez-vous ajouter de nouvelles tâches ?"} 
    src={"todos"} 
    message={message} 
    messageType={messageType} 
    id={todo || ""}>
      <div className="section-action-box">
        {openModal && <DefaultModal
          close={() => {
              setOpenModal(false);
              const currentPosition: number = window.scrollY;
              history.replace(`/mariage/${mariageID}/taches`, { currentPosition } )
          }}
          setOpen={handleModal}
          title={"Nouvelle tâche"}
          >
            <AddForm
              todos={todos}
              setTodos={setTodos}
              setMessage={setMessage}
              setMessageType={setMessageType}
              setOpenModal={setOpenModal}
              history={history}
              mariageID={mariageID}
            />
          </DefaultModal>}
        <SearchBar
          className="search__input"
          type="text"
          placeholder="Rechercher une tâche"
          name="searchbar"
          value={searchValue}
          onChange={handleSearch}
        />
        <div className="select-family">
          <SingleSelect
            selected={selected}
            setSelected={setSelected}
            placeholder="Filtrer par statut"
            array={selectArray}
            size="medium"
            label="Sélectionner"
          />
        </div>
        <AddButton onClick={handleModal} />
        <SwitchEditMode checked={checked} onChange={switchHandler} />
        {/* <span className="tasks-title">Tâches complétées {completedTasks}/{todos?.length}</span> */}

      </div>

      <Grow in={!loading} timeout={3000}>
        <div className="task-container">
            <SectionTitle title="Liste des tâches" />
            {todos && todos.length > 0 && (
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
            )}
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Todos;
