import "./Menu.css";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { History } from "history";

import Grow from "@mui/material/Grow";

import { useFetch } from "../../hooks";
import { getFoods } from "../../services";

import { useCurrentUser } from "../../ctx/userCtx";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import AddFoodForm from "./Forms/Add/AddFood";
import { SectionTitle } from "../../components";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import FoodList from "./FoodList/FoodList";
import { AddButton, SwitchEditMode } from "../../components/Buttons";

export type Food = {
  _id?: string;
  name: string;
  mariageID?: string;
  category: string;
}

type Category = "starter" | "maincourse" | "dessert" | "apetizer" | "beverage";

const Menus = () => {
  const history: History = useHistory();
  const{ mariageID } = useCurrentUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const [foods, setFoods ] = useState<Food[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | string>("starter");
  const [foodId, setFoodId] = useState<string | null>(null);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const { 
    data: fetchedFoods, 
    setMessage, 
    setMessageType, 
    message, 
    messageType
   } = useFetch<void, Food[]>(getFoods, []);

  useEffect(() => {
    setLoading(true);
    if(fetchedFoods) {
      setFoods(fetchedFoods);
      setLoading(false);
    }
  }, [fetchedFoods])

  function handleModal(){
    setOpenModal(!openModal);
  }

  return (
    <ContentLayout 
    loading={loading} 
    title={"Avez-vous prévu une réception ?"} 
    src={"reception"} 
    message={message} 
    messageType={messageType} 
    id={foodId || ""}>
      <div className="section-action-box">
        {openModal && <DefaultModal
          close={() => {
              setOpenModal(false);
              const currentPosition: number = window.scrollY;
              history.replace(`/mariage/${mariageID}/carte`, { currentPosition } )
          }}
          setOpen={handleModal}
          title={"Compléter la carte"}
        >
        <AddFoodForm 
          foods={foods}
          setFoods={setFoods}
          setMessage={setMessage}
          setMessageType={setMessageType} 
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          handleModal={handleModal}
          mariageID={mariageID}
          setOpenModal={setOpenModal}
          />
      </DefaultModal>}
      <AddButton onClick={handleModal} />
      <SwitchEditMode checked={checked} onChange={switchHandler} />
      </div>
      <Grow in={!loading} timeout={2000}>
        <div id="reception-container">
          <SectionTitle title="Menu" />
            <FoodList 
              foods={foods} 
              setFoods={setFoods}
              checked={checked}
              setChecked={setChecked}           
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              setMessage={setMessage}
              setMessageType={setMessageType}
              setFoodId={setFoodId}
              
            />
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Menus;
