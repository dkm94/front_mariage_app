import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React from 'react'

const CustomButton = styled(Button)({
    textTransform: "unset",
    fontSize: "unset",
    marginTop: "-2px",
    color: "#000",
    background: "none",
    padding: 0,
    ':hover': {
        background: "none",
    }
})

interface AuthSwitchButtonProps {
    text: string;
    onClick?: () => void;
}
const AuthSwitchButton = (props: AuthSwitchButtonProps) => {
    const { text, onClick } = props;

  return (
    <CustomButton onClick={onClick}>{text}</CustomButton>
  )
}

export default AuthSwitchButton