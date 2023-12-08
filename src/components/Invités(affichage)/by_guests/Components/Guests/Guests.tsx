import React, { useState } from "react";

import { Box } from "@material-ui/core";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

import Form from "../Form/UpdateGuest";
import DefaultModal from "../../../../Modals/Default/DefaultModal";

import avatar from "../../../../../img/avatar.jpg";
import uploadImg from "../../../../../img/upload-icon-20624.png";

const IconWrapper = styled(IconButton)({
  "&:hover": {
    background: "none",
  },
});

const Guests = ({
  guests,
  setGuests,
  deleteGuest,
  updateGuest,
  editPicture,
  seteditPicture,
  upload,
  handleFile,
  searchValue,
  mariageID,
  appear,
  firstPerson,
  secondPerson,
  isOpen,
  setisOpen,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    name: "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);

  const [selected, setSelected] = useState("tous");
  // const [deleteId, setDeleteId] = useState("")
  // const nodeRef = useRef(null)

  const handleFileInput = (e) => {
    const fileValue = e.target.files[0];
    setUploadedFile(fileValue);
    handleFile(fileValue);
  };

  const submitUpdate = (props) => {
    updateGuest(props);
  };

  // const handleRemoveGuest = (props) => {
  //   // setIsFadingOut(false)
  //   deleteGuest(props);
  // };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
        className="select-guest"
      >
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="select-family"
        >
          <option value="tous">Tous les invités</option>
          <option value="1">{`Invités de ${firstPerson}`}</option>
          <option value="2">{`Invités de ${secondPerson}`}</option>
        </select>
      </div>
      {guests.length === 0 || null ? (
        <div className="block">
          <span>Vos invités ici.</span>
        </div>
      ) : (
        <Box
          className="guest-container"
          sx={{
            minHeight: guests ? "0px" : "600px",
          }}
        >
          <div className="guests-container">
            {guests
              //searchbar filter
              .filter((guest) => {
                return (
                  guest.name.toLowerCase().indexOf(searchValue.toLowerCase()) >=
                  0
                );
              })
              //select filter
              .filter((guest) => {
                if (selected === "1") {
                  return guest.family === "1";
                } else if (selected === "2") {
                  return guest.family === "2";
                } else {
                  return guest;
                }
              })
              .sort((a, b) => {
                return a.name > b.name ? 1 : -1;
              })
              .map((guest) => {
                return (
                  <div className="guest-wrapper">
                    <div
                    key={guest._id}
                    className={`fade-in guest-card-style`}
                    style={{ position: "relative", width: "100%", boxSizing: "border-box" }}
                  >
                    <IconWrapper
                    onClick={() => {
                      setEdit({
                        id: guest._id,
                        name: guest.name,
                      });
                      
                    }}
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid lightgray",
                      borderRadius: "5px",
                      color: "#262626",
                      position: "absolute",
                      right: "20px",
                      top: "20px",
                    }}
                    >
                      <CreateIcon fontSize="small" />
                    </IconWrapper>
                      {/* </div> */}
                    <div className="div-guest___container">
                      <div className="guest-picture center-x">
                        {guest.media === "" ? (
                          <img alt="avatar" src={avatar} />
                        ) : (
                          <img
                            alt="notre mariage"
                            src={`https://my-wedding-backend.onrender.com/api/admin/guests/media/${guest.media}`}
                          />
                        )}
                      </div>
                      <div className="nameField">
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            lineHeight: "25px",
                            marginTop: "12px",
                          }}
                        >
                          <span id="guest-name">{guest.name}</span>
                          {guest.family === "1" ? (
                            <span className="guest-family">{`Invité(e) de ${firstPerson}`}</span>
                          ) : guest.family === "2" ? (
                            <span className="guest-family">{`Invité(e) de ${secondPerson}`}</span>
                          ) : null}
                        </Box>
                      </div>
                     {guest._id === edit.id && <DefaultModal
                        // open={isOpen}
                        setEdit={setEdit}
                        setOpen={setisOpen}
                        guestId={editPicture}
                        close={() => {
                          setisOpen(false);
                        }}
                        title="Modifier l'invité"
                      >
                        <Form
                          edit={edit}
                          setEdit={setEdit}
                          onSubmit={submitUpdate}
                          mariageID={mariageID}
                          guestId={guest._id}
                          guestFamily={guest.family}
                          uploadImg={uploadImg}
                          handleFileInput={handleFileInput}
                          seteditPicture={seteditPicture}
                          upload={upload}
                          uploadedFile={uploadedFile}
                          setisOpen={setisOpen}
                          deleteGuest={deleteGuest}
                        />
                      </DefaultModal>}
                    </div>
                  </div>
                  </div>
                );
              })}
          </div>
        </Box>
      )}
    </>
  );
};

export default Guests;
