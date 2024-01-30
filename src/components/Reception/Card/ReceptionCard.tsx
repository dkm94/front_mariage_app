import "./ReceptionCard.css";

import React, { useState } from 'react';

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import CustomIconButton from "../../Buttons/SmallIconButton/IconButton";

import { deleteFood } from "../../../services";
import Toast from "../../Toast/Toast";
import { useHistory, useParams } from "react-router";
import { useCurrentUser } from "../../../ctx/userCtx";

type Food = {
    _id?: string;
    name: string;
    mariageID?: string;
    category: string;
}

interface CardPropos {
    img: any;
    type: string;
    array: any;
    setArray: any;
    edit: any;
    getUpdatedId: any;
    even: boolean
    addForm: any;
    editForm: any;
}

const ReceptionCard = (props: CardPropos) => {
    const history = useHistory();
    const { mariageID } = useCurrentUser();
    const { id: foodId } = useParams<{id: string}>();

    const { array, setArray, edit, getUpdatedId, even, img, editForm, addForm, type } = props;

    const [message, setMessage] = useState<string | undefined>(undefined);
    const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);
    
  const deleteElement = async (id: string) => {
    const response = await deleteFood({ id });
    const { success, message, statusCode } = response;

    if(!success){
      setMessageType("error");
      setMessage(message);
      return;
    }

    if(success && statusCode === 200){
        setArray(array.filter((food: Food) => food._id !== id));
    }
  };

  return (
    <div className={even ? "forms" : "forms forms_reverse"}>
        {/* Image */}
        <Toast message={message} messageType={messageType} />
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
            {array.map((starter) => (
                <Grid2
                xs={12}
                key={starter._id}
                component={"li"}
                display={"flex"}
                flexDirection={"row"}
                minHeight="36px"
                alignItems={"center"}
                className="reception-list-item"
                >
                {edit.id === starter._id ? editForm : (
                    <Grid2
                    lg={8}
                    md={8}
                    xs={8}
                    component={"span"}
                    width={"100%"}
                    >
                    {starter.name}
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
                        onClick={() => {
                            getUpdatedId(starter._id, starter.name);
                            const currentPosition: number = window.scrollY;
                            history.replace(`/mariage/${mariageID}/carte/edit/${foodId}`, { currentPosition })
                        }}
                        />
                        <CustomIconButton 
                        type="submit"
                        buttonType="delete"
                        onClick={() => deleteElement(starter._id)}
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