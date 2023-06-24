import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";
import BlackButton from "../../../../../Buttons/Black/BlackButton";
import avatar from "../../../../../../img/avatar.jpg";
import "./SmallGuestCard.css";

const SmallGuestCard = (props) => {
  const { guest } = props;

  return (
    // <Container >
    <Grid2 className="guest__sm" display={"flex"} flexDirection={"row"} md={6}>
      <Grid2 md={4}>
        {guest?.media === "" ? (
          <img alt="avatar" src={avatar} width={"100%"} />
        ) : (
          <img
            alt="notre mariage"
            width={"100%"}
            src={`https://my-wedding-backend.onrender.com/api/admin/guests/media/${guest?.media}`}
          />
        )}
      </Grid2>
      <Grid2 display={"flex"} flexDirection={"column"} md={6}>
        <span>{guest?.name}</span>
        <span>{guest?.family}</span>
        <span>Table -</span>
      </Grid2>
      <Grid2 md={2}>
        <BlackButton text={"Modifier"} />
      </Grid2>
    </Grid2>
    // </Container>
  );
};

export default SmallGuestCard;
