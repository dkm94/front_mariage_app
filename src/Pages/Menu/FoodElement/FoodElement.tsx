import "./style.css";

import React, { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';
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
    setChecked: Dispatch<SetStateAction<boolean>>;
}

interface EditForm {
    id: string;
    name: string;
    category: string;
}

const FoodElement = (props: FoodElementProps) => {
  const { id, name, checked, category, setFoods, foods, setMessage, setMessageType, setFoodId,setChecked } = props;

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
    const currentPosition: number = window.scrollY;
      history.replace(`/mariage/${mariageID}/carte/edit/${id}`, { currentPosition })
  }
  //si le mode édition est actif, 
  // .food-element: position: unset
  // .food-element button: position: unset
  // .food-element span: flex: 1

  const handleCloseModal = () => {
    setEdit(null);
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/carte`, { currentPosition } )
  }

  // TODO: remove "Gérer" button, add switch button instead
  return (
    <>
      <li className="food-element" style={{ position: checked ? "unset" : "relative" }} key={id}>
          <span style={{ flex: checked ? "1" : "none" }}>{name}</span>
          {checked && <button type="button" onClick={handleEdit} style={{ position: checked ? "unset" : "absolute" }} >Gérer</button>}
      </li>
      {edit?.id === id && (
        <DefaultModal
          setEdit={setEdit}
          selectedId={edit?.id}
          close={handleCloseModal}
          title={`Modifier ${article[category]}`}
          open={checked}
          setOpen={setChecked}
        >
          <UpdateFood 
            edit={edit} 
            setEdit={setEdit} 
            setFoods={setFoods} 
            foods={foods} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            setFoodId={setFoodId}
            setOpen={setChecked}
            />
        </DefaultModal>)}
    </>
  )
}

export default FoodElement