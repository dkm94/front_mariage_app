import "../../style/guests.css";

import React, { useState } from "react";
import { useHistory } from "react-router";
import { History } from "history";

import { Box } from "@material-ui/core";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

import Form from "../../Forms/Update/UpdateGuest";
import DefaultModal from "../../../../components/Modals/Default/DefaultModal";

import { GuestType, GuestsProps } from "../../../../../types";

import avatar from "../../../../img/avatar.jpg"
import uploadImg from "../../../../img/upload-icon-20624.png";

const IconWrapper = styled(IconButton)({
  backgroundColor: "#fff",
  border: "1px solid lightgray",
  borderRadius: "5px",
  color: "#262626",
  position: "absolute",
  right: "20px",
  top: "20px",
  "&:hover": {
    background: "none",
  },
});

type Edit = {
  id: string;
  name: string;
}

const Guest = (props: GuestsProps) => {
  const { 
    guest,
    firstPerson, 
    secondPerson, 
    setMessage, 
    setMessageType, 
    setGuestId, 
    guests, 
    setGuests, 
    editPicture, 
    seteditPicture, 
    // searchValue, 
    checked,
    mariageID,
    setChecked
   } = props;
    
  const history: History = useHistory();

  const [edit, setEdit] = useState<Edit | null>(null);

  const handlePosition = () => {
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/invites`, { currentPosition });
  }

  const handleCloseModal = (): void => {
    setEdit(null);
    handlePosition()
    setChecked(false);
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/invites`, { currentPosition } )
  }

  const handleEditGuest = (guest: GuestType): void => {
    if(guest){
      setEdit({
        id: guest._id,
        name: guest.name,
      });
      const currentPosition: number = window.scrollY;
      history.replace(`/mariage/${mariageID}/invites/edit/${guest._id}`, { currentPosition })
    }
  }

  return (
    <div className="guest-wrapper" key={guest?._id}>
      <div className={`fade-in guest-card-style`}>
        {checked && <IconWrapper style={{ zIndex: "1000", backgroundColor: "#FFFFFF" }} onClick={() => handleEditGuest(guest)}>
          <CreateIcon fontSize="small"/>
        </IconWrapper>}
      
        <div className="div-guest___container">
          <div className="guest-picture center-x">
            {guest?.media === "" ? (
              <img alt="avatar" src={avatar} />
            ) : (
              <img
                alt="notre mariage"
                src={`https://my-wedding-backend.onrender.com/api/guests/media/${guest?.media}`}
              />
            )}
          </div>
          <div className="nameField">
            <Box>
              <span id="guest-name">{guest?.name}</span>
              {guest?.family === "1" ? (
                <span className="guest-family">{`Invité(e) de ${firstPerson}`}</span>
              ) : guest?.family === "2" ? (
                <span className="guest-family">{`Invité(e) de ${secondPerson}`}</span>
              ) : null}
            </Box>
          </div>
          {guest?._id === edit?.id && <DefaultModal
            setEdit={setEdit}
            selectedId={edit?.id}
            close={handleCloseModal}
            title="Modifier l'invité"
            open={checked}
            setOpen={setChecked}
          >
            <Form
              edit={edit}
              guests={guests}
              setGuests={setGuests}
              setEdit={setEdit}
              mariageID={mariageID}
              guestId={guest?._id}
              guestFamily={guest?.family}
              uploadImg={uploadImg}
              seteditPicture={seteditPicture}
              setMessage={setMessage}
              setMessageType={setMessageType}
              setGuestId={setGuestId}
              setOpen={setChecked}
            />
          </DefaultModal>}
        </div>
      </div>
    </div>
  );
};

export default Guest;
