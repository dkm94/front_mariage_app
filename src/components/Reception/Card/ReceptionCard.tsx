import "./ReceptionCard.css";

import React from 'react';

import styled from "@emotion/styled";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

interface CardPropos {
    img: any;
    type: string;
    array: any;
    edit: any;
    getUpdatedId: any;
    deleteElement: any;
    even: boolean
    addForm: any;
    editForm: any;
}

const IconWrapper = styled(IconButton)({
    "&:hover": {
      background: "none",
    },
  });

const ReceptionCard = (props: CardPropos) => {
    const { array, edit, getUpdatedId, deleteElement, even, img, editForm, addForm, type } = props;

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
                        <IconWrapper
                        onClick={() =>
                            getUpdatedId(starter._id, starter.name)
                        }
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid lightgray",
                            borderRadius: "5px",
                            color: "#262626",
                        }}
                        >
                        <CreateIcon fontSize="small" />
                        </IconWrapper>
                        <IconWrapper
                        type="submit"
                        onClick={() => deleteElement(starter._id)}
                        style={{
                            backgroundColor: "darkred",
                            borderRadius: "5px",
                            color: "#fff",
                        }}
                        >
                        <DeleteIcon fontSize="small" />
                        </IconWrapper>
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