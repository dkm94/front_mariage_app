import "./ReceptionCard.css";

import React, { Dispatch, SetStateAction } from 'react';
import { useHistory, useParams } from "react-router";
import { History } from "history";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import CustomIconButton from "../../Buttons/SmallIconButton/IconButton";

import { deleteFood } from "../../../services";
import { useCurrentUser } from "../../../ctx/userCtx";
import { FoodType } from "../../../../types";

type Food = {
    _id?: string;
    name: string;
    mariageID?: string;
    category: string;
}

type EditType = {
    id: string;
    name: string;
  };

interface CardPropos {
    setFoodId: Dispatch<SetStateAction<string | null>>;
    img: string;
    type: string;
    array: FoodType[];
    setArray: Dispatch<SetStateAction<FoodType[]>>;
    edit: EditType;
    getUpdatedId: (objId: string, objName: string) => void;
    even: boolean;
    addForm: JSX.Element;
    editForm: JSX.Element;
    setMessage: Dispatch<SetStateAction<string | undefined>>;
    setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
}

const ReceptionCard = (props: CardPropos) => {
    const history: History = useHistory();
    
    const { mariageID } = useCurrentUser();
    const { id: foodId } = useParams<{id: string}>();

    const { 
        array, 
        setArray, 
        edit, 
        getUpdatedId, 
        even, 
        img, 
        editForm, 
        addForm, 
        type, 
        setFoodId,
        setMessage,
        setMessageType
    } = props;
    
    const deleteElement = async (id: string): Promise<void> => {
    setFoodId(id);
    
    const response = await deleteFood({ id });
    const { success, message, statusCode } = response;

    if(!success){
    setMessageType("error");
    setMessage(message);

    setTimeout(() => {
        setFoodId(null);
        setMessage(undefined);
        setMessageType(undefined);
    }, 2000);
    return;
    }

    if(success && statusCode === 200){
        setArray(array.filter((food: Food) => food._id !== id));

        setTimeout(() => {
            setFoodId(null);
            setMessage(undefined);
            setMessageType(undefined);
        }, 2000);
    }
    };

    const handleEdit = (food: FoodType):void => {
        getUpdatedId(food?._id || '', food?.name || '');
        const currentPosition: number = window.scrollY;
        history.replace(`/mariage/${mariageID}/carte/edit/${foodId}`, { currentPosition })
    }

    return (
        <div className={even ? "forms" : "forms forms_reverse"}>
        
            {/* Image */}
            <div className={even ? "reception-form-even" : "reception-form-odd"}>
                <img src={img} alt="" />
            </div>

            {/* Section's title */}
            <div className="reception-title-container fade-in">
            {array.length === 0 || array.length === 1 ? (
                <h3 className={even ? "reception-title-even" : "reception-title-odd" }>{type}</h3>
            ) : (
                <h3 className={even ? "reception-title-even" : "reception-title-odd"}>{`${type}s`}</h3>
            )}

            {/* Form */}
            <div className="reception-add-form">
                {addForm}
            </div>

            {/* Is empty or list */}
            {array.length === 0 ? (
                <div className="empty-div">
                <span>{`Vos ${type}s ici`}</span>
                </div>
            ) : (
                <Grid2 xs={12} component={"ul"} container className="reception-list">
                {array.map((food) => (
                    <Grid2
                    xs={12}
                    key={food?._id}
                    component={"li"}
                    display={"flex"}
                    flexDirection={"row"}
                    minHeight="36px"
                    alignItems={"center"}
                    className="reception-list-item"
                    >
                    {edit.id === food?._id ? editForm : (
                        <Grid2
                        lg={8}
                        md={8}
                        xs={8}
                        component={"span"}
                        width={"100%"}
                        >
                        {food?.name}
                        </Grid2>
                    )}

                    {/* Buttons */}
                    <Grid2
                        lg={4}
                        display={"flex"}
                        flexDirection={"row"}
                        gap={"7px"}
                    >
                        {!edit.id && (
                        <>
                            <CustomIconButton
                            type="button"
                            buttonType={"edit"}
                            onClick={() => handleEdit(food)}
                            />
                            <CustomIconButton 
                            type="submit"
                            buttonType="delete"
                            onClick={() => deleteElement(food?._id || '')}
                            /> 
                        </>
                        )}

                    </Grid2>
                    </Grid2>
                ))}
                </Grid2>
            )}
            </div>
        </div>
    )
}

export default ReceptionCard