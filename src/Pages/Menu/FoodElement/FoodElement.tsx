import "./style.css";

import React, { HTMLAttributes, useState } from 'react';
import { useHistory } from "react-router";
import { History } from "history";

import UpdateFood from "../Forms/Update/UpdateFood";
import { useCurrentUser } from "../../../ctx/userCtx";
import DefaultModal from "../../../components/Modals/Default/DefaultModal";
import { FoodType } from "../../../../types";

interface FoodElementProps extends HTMLAttributes<HTMLLIElement> {
    id: string | undefined;
    name: string;
    checked: boolean;
    category: string;
    foods: FoodType[];
    setFoods(foods: FoodType[]): void;
    setMessage: (value: string) => void;
    setMessageType: (value: "error" | "success" | undefined) => void;
    setFoodId: (value: string | null) => void;
    // selected
}

interface EditForm {
    id: string;
    name: string;
    category: string;
}

const FoodElement = (props: FoodElementProps) => {
  const { id, name, checked, category, setFoods, foods, setMessage, setMessageType, setFoodId } = props;

  const article = {
    starter: "l'entrée",
    maincourse: "le plat",
    dessert: "le dessert",
    apetizer: "l'apéritif",
    beverage: "la boisson"
  }

  const history: History = useHistory();
  const{ mariageID } = useCurrentUser();

  const [edit, setEdit] = useState<EditForm | null>(null);

  function handleEdit() {
    setEdit({ id: id as string, name, category });
  }
  //si le mode édition est actif, 
  // .food-element: position: unset
  // .food-element button: position: unset
  // .food-element span: flex: 1
  return (
    <>
      <li className="food-element" style={{ position: checked ? "unset" : "relative" }} key={id}>
          <span style={{ flex: checked ? "1" : "none" }}>{name}</span>
          {checked && <button type="button" onClick={handleEdit} style={{ position: checked ? "unset" : "absolute" }} >Gérer</button>}
      </li>
      {edit?.id === id && (
        <DefaultModal
          setEdit={setEdit}
          close={() => {
            setEdit(null);
            const currentPosition: number = window.scrollY;
            history.replace(`/mariage/${mariageID}/carte`, { currentPosition } )
          }}
          title={`Modifier ${article[category]}`}
        >
          <UpdateFood 
            edit={edit} 
            setEdit={setEdit} 
            setFoods={setFoods} 
            foods={foods} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            setFoodId={setFoodId}
            />
        </DefaultModal>)}
    </>
  )
}

export default FoodElement