import "./style.css";
import React, { Dispatch, SetStateAction } from 'react';

import { FoodType } from '../../../../types';
import FoodElement from "../FoodElement/FoodElement";

interface FoodListProps {
    foods: FoodType[];
    setFoods: Dispatch<SetStateAction<FoodType[]>>;
    checked: boolean;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void; 
    setMessage: Dispatch<SetStateAction<string>>;
    setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
    setFoodId: Dispatch<SetStateAction<string | null>>;
    setChecked: Dispatch<SetStateAction<boolean>>;
}

const FoodList = (props: FoodListProps) => {
    const { foods, checked, setChecked, setFoods, setFoodId, setMessage, setMessageType } = props;

    const titles = {
        apetizer: "Apéritif",
        starter: "Entrée",
        maincourse: "Plat principal",
        dessert: "Dessert",
        beverage: "Boisson"
    }

  return (
    <div id='foodlist-container'>
        {Object.keys(titles).map((title: string) => (
            <div key={title} className='category'>
                <h4>{titles[title]}</h4>
                <ul>
                    {foods && foods.map((food: FoodType) => {
                        if(food?.category === title){
                            return (
                                <FoodElement 
                                key={food?._id} 
                                id={food?._id} 
                                name={food?.name} 
                                category={food?.category} 
                                checked={checked} 
                                setChecked={setChecked}
                                foods={foods}
                                setFoods={setFoods}
                                setMessage={setMessage}
                                setMessageType={setMessageType}
                                setFoodId={setFoodId}
                                />
                            )
                        } else return null;
                    })}
                </ul>
            </div>
        ))}
    </div>
  )
}

export default FoodList