import React from 'react';

import { IconButton as IconWrapper } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
interface IconButtonProps {
    buttonType: string;
    obj?: any;
    onClick?: any;
    type: "submit" | "button" | "reset" | undefined;
    disabled?: boolean;
}

const CustomIconButton = (props: IconButtonProps) => {
    const { buttonType, obj, onClick, type, disabled, ...rest } = props;

    const editStyle = {
        backgroundColor: obj?.isCompleted ? "lightgrey" : "#fff",
        border: "1px solid lightgray",
        borderRadius: "5px",
        color: obj?.isCompleted ? "grey" : "#262626",
        maxHeight: "34px",
        height: "100%"
    }

    const deleteStyle = {
        backgroundColor: "darkred",
        borderRadius: "5px",
        color: "#fff",
        maxHeight: "34px",
        height: "100%"
    }

    const saveStyle = {
        backgroundColor: "#262626",
        border: "1px solid lightgray",
        borderRadius: "5px",
        color: "#fff",
    }

    const cancelStyle = {
        backgroundColor: "#fff",
        border: "1px solid lightgray",
        borderRadius: "5px",
        color: "#262626"
    }
        

    const RenderButton = () => {
        switch(buttonType){
            case "edit":
                return <CreateIcon fontSize="small" />
            case "save":
                return <CheckIcon fontSize="small" />
            case "delete":
                return <DeleteIcon fontSize="small" />
            case "cancel":
                return <ReplayIcon fontSize="small" />
            default:
                return null;
        }
    }

  return (
    <IconWrapper
    {...rest}
    disabled={disabled}
    type={type}
    onClick={onClick}
    style={
        buttonType === "edit" ? editStyle 
        : buttonType === "save" ? saveStyle 
        : buttonType === "delete" ? deleteStyle
        : buttonType === "cancel" ? cancelStyle
        : {}
        
    }
    >
        <RenderButton />
    </IconWrapper>
  )
}

export default CustomIconButton