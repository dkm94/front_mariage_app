import "./Menu.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

import starterImg from "../../img/menus/starter_img.jpg";
import maincourseImg from "../../img/menus/maincourse_img.jpg";
import dessertImg from "../../img/menus/dessert_img.jpg";
import apetizerImg from "../../img/menus/apetizers.jpg";
import beverageImg from "../../img/menus/beverages.jpg";

import Grow from "@mui/material/Grow";

import { AddStarterForm, AddMaincourseForm, AddDessertForm, AddApetizerForm, AddBeverageForm } from "./Forms/Add";
import { UpdateStarter, UpdateMaincourse, UpdateDessert, UpdateApetizer, UpdateBeverage } from "./Forms/Update";

import { FoodType } from "../../../types";
import { useFetch } from "../../hooks";
import { getApetizers, getBeverages, getDesserts, getMaincourses, getStarters } from "../../services";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import ReceptionCard from "../../components/Reception/Card/ReceptionCard";

type EditType = {
  id: string;
  name: string;
};

const Menus = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { data: starters, setData: setStarters } = useFetch<void, FoodType[]>(getStarters, []);
  const { data: maincourses,setData: setMaincourses} = useFetch<void, FoodType[]>(getMaincourses, []);
  const { data: desserts, setData: setDesserts } = useFetch<void, FoodType[]>(getDesserts, []);
  const { data: apetizers, setData: setApetizers } = useFetch<void, FoodType[]>(getApetizers, []);
  const { data: beverages, setData: setBeverages } = useFetch<void, FoodType[]>(getBeverages, []);

  useEffect(() => {
    setLoading(true);

    if(starters && maincourses && desserts && apetizers && beverages) {
      setLoading(false);
    }
  }, [starters, maincourses, desserts, apetizers, beverages])
  
  const [edit, setEdit] = useState<EditType>({
    id: "",
    name: "",
  });


  const getUpdatedId = (objId, objName) => {
    setEdit({
      id: objId,
      name: objName,
    });
  };

  //todo: error in update handling

  const deleteStarter = async (id) => {
    await axios.delete(`/api/admin/menu/starters/delete/${id}`).then((res) => {
      if (res.data != null) {
        setStarters(starters.filter((starter: FoodType) => starter._id !== id));
      }
    });
  };

  const deleteMaincourse = async (id) => {
    await axios
      .delete(`/api/admin/menu/maincourses/delete/${id}`)
      .then((res) => {
        if (res.data != null) {
          setMaincourses(
            maincourses.filter((maincourse: FoodType) => maincourse._id !== id)
          );
        }
      });
  };

  const deleteDessert = async (id) => {
    await axios.delete(`/api/admin/menu/desserts/delete/${id}`).then((res) => {
      if (res.data != null) {
        setDesserts(desserts.filter((dessert: FoodType) => dessert._id !== id));
      }
    });
  };

  const deleteApetizer = async (id) => {
    await axios.delete(`/api/admin/menu/apetizers/delete/${id}`).then((res) => {
      if (res.data != null) {
        setApetizers(apetizers.filter((apetizer: FoodType) => apetizer._id !== id));
      }
    });
  };

  const deleteBeverage = async (id) => {
    await axios.delete(`/api/admin/menu/beverages/delete/${id}`).then((res) => {
      if (res.data != null) {
        setBeverages(beverages.filter((beverage: FoodType) => beverage._id !== id));
      }
    });
  };

  return (
    <ContentLayout loading={loading} title={"Avez-vous prévu une réception ?"} src={"reception"}>
      <Grow in={!loading} timeout={2000}>
        <div className="reception-container">
          <div className="menu___list">

            <ReceptionCard 
            img={starterImg} 
            type={"entrée"} 
            array={starters} 
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            deleteElement={deleteStarter} 
            even={true} 
            addForm={<AddStarterForm starters={starters} setStarters={setStarters} />} 
            editForm={<UpdateStarter edit={edit} setEdit={setEdit} setStarters={setStarters} starters={starters} />}            
            />

            <ReceptionCard 
            img={maincourseImg} 
            type={"plat"} 
            array={maincourses} 
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            deleteElement={deleteMaincourse} 
            even={false} 
            addForm={<AddMaincourseForm maincourses={maincourses} setMaincourses={setMaincourses} />} 
            editForm={<UpdateMaincourse edit={edit} setEdit={setEdit} maincourses={maincourses} setMaincourses={setMaincourses} />}            
            />

            <ReceptionCard 
            img={dessertImg} 
            type={"dessert"} 
            array={desserts} 
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            deleteElement={deleteDessert} 
            even={true} 
            addForm={<AddDessertForm desserts={desserts} setDesserts={setDesserts} />} 
            editForm={<UpdateDessert edit={edit} setEdit={setEdit} desserts={desserts} setDesserts={setDesserts} />} 
            />

            <ReceptionCard 
            img={apetizerImg}
            type={"apéritif"} 
            array={apetizers} 
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            deleteElement={deleteApetizer} 
            even={false} 
            addForm={<AddApetizerForm apetizers={apetizers} setApetizers={setApetizers} />} 
            editForm={<UpdateApetizer edit={edit} setEdit={setEdit} apetizers={apetizers} setApetizers={setApetizers} />}            
            />

            <ReceptionCard 
            img={beverageImg} 
            type={"boisson"} 
            array={beverages} 
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            deleteElement={deleteBeverage} 
            even={true} 
            addForm={<AddBeverageForm beverages={beverages} setBeverages={setBeverages} />} 
            editForm={<UpdateBeverage edit={edit} setEdit={setEdit} beverages={beverages} setBeverages={setBeverages} />} 
            />

          </div>
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Menus;
