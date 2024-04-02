import "./Menu.css";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { History } from "history";

import starterImg from "../../img/menus/starter_img.jpg";
import maincourseImg from "../../img/menus/maincourse_img.jpg";
import dessertImg from "../../img/menus/dessert_img.jpg";
import apetizerImg from "../../img/menus/apetizers.jpg";
import beverageImg from "../../img/menus/beverages.jpg";

import Grow from "@mui/material/Grow";

import { useFetch } from "../../hooks";
import { getFoods } from "../../services";

import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import ReceptionCard from "../../components/Reception/Card/ReceptionCard";
import AddFoodForm from "./Forms/Add/AddFood";
import UpdateFood from "./Forms/Update/UpdateFood";
import { SectionTitle } from "../../components";
import { FoodType } from "../../../types";
import { Button } from "@mui/material";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import { useCurrentUser } from "../../ctx/userCtx";

type EditType = {
  id: string;
  name: string;
};


type Food = {
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

  const [foods, setFoods ] = useState<Food[]>([]);
  const [starters, setStarters] = useState<Food[]>([]);
  const [maincourses, setMaincourses] = useState<Food[]>([]);
  const [desserts, setDesserts] = useState<Food[]>([]);
  const [apetizers, setApetizers] = useState<Food[]>([]);
  const [beverages, setBeverages] = useState<Food[]>([]);
  const [category, setCategory] = useState<Category | string>("starter");

  const [foodId, setFoodId] = useState<string | null>(null);

  const { 
    data: fetchedFoods, 
    setMessage, 
    setMessageType, 
    message, 
    messageType
   } = useFetch<void, Food[]>(getFoods, []);

   
  useEffect(() => {
    if(fetchedFoods) setFoods(fetchedFoods);
  }, [fetchedFoods])
    
  useEffect(() => {
    setLoading(true);

    if(foods) {
      setLoading(false);

      const starters = foods?.filter((food: Food) => food?.category === "starter");
      const maincourses = foods?.filter((food: Food) => food?.category === "maincourse");
      const desserts = foods?.filter((food: Food) => food?.category === "dessert");
      const apetizers = foods?.filter((food: Food) => food?.category === "apetizer");
      const beverages = foods?.filter((food: Food) => food?.category === "beverage");

      if(starters) setStarters(starters);
      if(maincourses) setMaincourses(maincourses);
      if(desserts) setDesserts(desserts);
      if(apetizers) setApetizers(apetizers);
      if(beverages) setBeverages(beverages);

    }
  }, [foods])
  
  const [edit, setEdit] = useState<EditType>({
    id: "",
    name: "",
  });

  const getUpdatedId = (objId: string, objName: string) => {
    setEdit({
      id: objId,
      name: objName,
    });
  };

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
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px"}}>
        <Button onClick={handleModal} style={{ backgroundColor: "#B2A9A9", color: "#fff", textTransform: "capitalize", border: "none", display: "flex", flexDirection: "row", gap: "10px", paddingRight: "15px"}}>
          <span className="material-symbols-outlined">add</span>
          <span>Ajouter</span>
        </Button>
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
          category={category}
          setCategoryName={setCategory}
          handleModal={handleModal}
          />
      </DefaultModal>}
      </div>
      <Grow in={!loading} timeout={2000}>
        <div className="reception-container">
          <SectionTitle title="Menu" />
          <div className="reception">
            <ReceptionCard 
            setFoodId={setFoodId}
            img={starterImg} 
            type={"entrée"} 
            array={starters}
            setArray={setStarters}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={true}
            setMessage={setMessage}
            setMessageType={setMessageType}
            addForm={
            <AddFoodForm 
                foods={starters}
                setFoods={setStarters}
                category="starter"
                setMessage={setMessage}
                setMessageType={setMessageType} setCategoryName={setCategory} handleModal={handleModal}            />} 
            editForm={
            <UpdateFood 
            edit={edit} 
            setEdit={setEdit} 
            setFoods={setStarters} 
            foods={starters} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            setFoodId={setFoodId}
            />}            
            />

            <ReceptionCard 
            setFoodId={setFoodId}
            img={maincourseImg} 
            type={"plat"} 
            array={maincourses} 
            setArray={setMaincourses}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={false} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            addForm={
            <AddFoodForm 
                foods={maincourses}
                setFoods={setMaincourses}
                category="maincourse"
                setMessage={setMessage}
                setMessageType={setMessageType} setCategoryName={setCategory} handleModal={handleModal}            />} 
            editForm={
            <UpdateFood 
            edit={edit} 
            setEdit={setEdit} 
            foods={maincourses} 
            setFoods={setMaincourses}
            setMessage={setMessage}
            setMessageType={setMessageType}
            setFoodId={setFoodId}
            />}            
            />

            <ReceptionCard 
            setFoodId={setFoodId}
            img={dessertImg} 
            type={"dessert"} 
            array={desserts} 
            setArray={setDesserts}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={true} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            addForm={
            <AddFoodForm 
                foods={desserts}
                setFoods={setDesserts}
                category="dessert"
                setMessage={setMessage}
                setMessageType={setMessageType} setCategoryName={setCategory} handleModal={handleModal}            />} 
            editForm={
            <UpdateFood 
            edit={edit} 
            setEdit={setEdit} 
            foods={desserts} 
            setFoods={setDesserts} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            setFoodId={setFoodId}
            />} 
            />

            <ReceptionCard 
            setFoodId={setFoodId}
            img={apetizerImg}
            type={"apéritif"} 
            array={apetizers} 
            setArray={setApetizers}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={false} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            addForm={
            <AddFoodForm 
                foods={apetizers}
                setFoods={setApetizers}
                category="apetizer"
                setMessage={setMessage}
                setMessageType={setMessageType} setCategoryName={setCategory} handleModal={handleModal}            />} 
            editForm={
            <UpdateFood 
            edit={edit} 
            setEdit={setEdit} 
            foods={apetizers} 
            setFoods={setApetizers}
            setMessage={setMessage}
            setMessageType={setMessageType}
            setFoodId={setFoodId}
            />}            
            />

            <ReceptionCard 
            setFoodId={setFoodId}
            img={beverageImg} 
            type={"boisson"} 
            array={beverages}
            setArray={setBeverages} 
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={true} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            addForm={
            <AddFoodForm 
                foods={beverages}
                setFoods={setBeverages}
                category="beverage"
                setMessage={setMessage}
                setMessageType={setMessageType} setCategoryName={setCategory} handleModal={handleModal}            />} 
            editForm={
            <UpdateFood 
            edit={edit} 
            setEdit={setEdit} 
            foods={beverages} 
            setFoods={setBeverages}
            setMessage={setMessage}
            setMessageType={setMessageType}
            setFoodId={setFoodId}
            />} 
            />

          </div>
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Menus;
