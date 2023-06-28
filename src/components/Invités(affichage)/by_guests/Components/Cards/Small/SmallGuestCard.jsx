import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import avatar from "../../../../../../img/avatar.jpg";
import "./SmallGuestCard.css";

const SmallGuestCard = (props) => {
  const { guest, firstPerson, secondPerson } = props;

  return (
    <Grid2 className="guest__sm" display={"flex"} flexDirection={"row"}>
      <Grid2 width={"100%"}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingLeft: "15px",
          paddingRight: "15px",
          justifyContent: "center",
        }}
      >
        <span style={{ lineHeight: "0.8" }} id="guest-name">
          {guest?.name}
        </span>
        <span style={{ lineHeight: "2" }} className="guest-family">
          {guest?.family === "1" ? (
            <>{`Invité(e) de ${firstPerson}`}</>
          ) : guest?.family === "2" ? (
            <>{`Invité(e) de ${secondPerson}`}</>
          ) : null}
        </span>
      </div>
      <Grid2
        height={"100%"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"end"}
      >
        <IconButton>
          <CreateIcon fontSize="small" />
        </IconButton>
      </Grid2>
    </Grid2>
    // </Container>
  );
};

export default SmallGuestCard;
