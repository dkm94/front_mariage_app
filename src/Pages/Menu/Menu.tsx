import "./Menu.css";

import React, { useState, useEffect } from "react";

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

const Menus = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [starters, setStarters] = useState<Food[]>([]);
  const [maincourses, setMaincourses] = useState<Food[]>([]);
  const [desserts, setDesserts] = useState<Food[]>([]);
  const [apetizers, setApetizers] = useState<Food[]>([]);
  const [beverages, setBeverages] = useState<Food[]>([]);

  const { data: foods } = useFetch<void, Food[]>(getFoods, []);

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


  const getUpdatedId = (objId, objName) => {
    setEdit({
      id: objId,
      name: objName,
    });
  };

  return (
    <ContentLayout loading={loading} title={"Avez-vous prévu une réception ?"} src={"reception"}>
      <Grow in={!loading} timeout={2000}>
        <div className="reception-container">
          <div className="reception">

            <ReceptionCard 
            img={starterImg} 
            type={"entrée"} 
            array={starters}
            setArray={setStarters}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={true} 
            addForm={<AddFoodForm foods={starters} setFoods={setStarters} category="starter" />} 
            editForm={<UpdateFood edit={edit} setEdit={setEdit} setFoods={setStarters} foods={starters} />}            
            />

            <ReceptionCard 
            img={maincourseImg} 
            type={"plat"} 
            array={maincourses} 
            setArray={setMaincourses}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={false} 
            addForm={<AddFoodForm foods={maincourses} setFoods={setMaincourses} category="maincourse" />} 
            editForm={<UpdateFood edit={edit} setEdit={setEdit} foods={maincourses} setFoods={setMaincourses} />}            
            />

            <ReceptionCard 
            img={dessertImg} 
            type={"dessert"} 
            array={desserts} 
            setArray={setDesserts}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={true} 
            addForm={<AddFoodForm foods={desserts} setFoods={setDesserts} category="dessert" />} 
            editForm={<UpdateFood edit={edit} setEdit={setEdit} foods={desserts} setFoods={setDesserts} />} 
            />

            <ReceptionCard 
            img={apetizerImg}
            type={"apéritif"} 
            array={apetizers} 
            setArray={setApetizers}
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={false} 
            addForm={<AddFoodForm foods={apetizers} setFoods={setApetizers} category="apetizer" />} 
            editForm={<UpdateFood edit={edit} setEdit={setEdit} foods={apetizers} setFoods={setApetizers} />}            
            />

            <ReceptionCard 
            img={beverageImg} 
            type={"boisson"} 
            array={beverages}
            setArray={setBeverages} 
            edit={edit} 
            getUpdatedId={getUpdatedId} 
            even={true} 
            addForm={<AddFoodForm foods={beverages} setFoods={setBeverages} category="beverage" />} 
            editForm={<UpdateFood edit={edit} setEdit={setEdit} foods={beverages} setFoods={setBeverages} />} 
            />

          </div>
        </div>
      </Grow>
    </ContentLayout>
  );
};

export default Menus;
