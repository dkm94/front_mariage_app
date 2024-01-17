import React from 'react';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface RedButtonProps {
    handleClick: any;
    text: string;
    type: "button" | "submit" | "reset" | undefined;
    sx?: any;
}

const RedButton = (props: RedButtonProps) => {
    const { text, handleClick, type, sx, ...rest } = props;

  return (
    <IconButton
        {...rest}
        sx={sx}
        type={type}
        onClick={handleClick}
        style={{ backgroundColor: "darkred", borderRadius: "20px", flexGrow: 1 }}
    >
        <DeleteIcon style={{ color: "#F4F4F4" }} />
        <span style={{ color: "#F4F4F4" }}>{text}</span>
    </IconButton>

  )
}

export default RedButton