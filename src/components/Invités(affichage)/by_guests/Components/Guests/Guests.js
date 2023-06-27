import React, { useState } from "react";
import Modal from "../../../../Modals/Set_guest_picture";
import Form from "../Form/UpdateGuest";
import avatar from "../../../../../img/avatar.jpg";
import { Box } from "@material-ui/core";
import BlackButton from "../../../../Buttons/Black/BlackButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"; // import { CSSTransition, TransitionGroup, Transition } from "react-transition-group";
import SmallGuestCard from "../Cards/Small/SmallGuestCard";
import uploadImg from "../../../../../img/upload-icon-20624.png";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

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
}) => {
  const [isOpen, setisOpen] = useState(false);
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

  const handleRemoveGuest = (props) => {
    // setIsFadingOut(false)
    deleteGuest(props);
  };

  return (
    <>
      <div
        style={{
          // paddingRight: "50px",
          // paddingLeft: "50px",
          display: "flex",
          justifyContent: "end",
        }}
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
            minHeight: "500px",
          }}
        >
          <Grid2 container gap={3} justifyContent={"center"}>
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
                  <Grid2
                    xs={12}
                    sm={4}
                    md={3}
                    key={guest._id}
                    maxWidth={"300px"}
                    // width={"20rem"}
                    minWidth={"250px"}
                    className={`fade-in guest-card-style`}
                    bgcolor={edit.id === guest._id && "#FFF"}
                  >
                    {edit.id === guest._id && (
                      <div className="guest-card__delete-btn">
                        <IconButton
                          onClick={() => {
                            handleRemoveGuest(guest._id);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                    )}
                    {/* <li className={(isFadingOut && guest._id === deleteId) ? 'div-guest item-fadeout' :'div-guest'}> */}
                    {/* <div className="custom-dropdown">
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} />
                                                <Dropdown.Menu size="sm" title="">
                                                    {edit.id ? (<>
                                                        <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                                                    </>) : (<>
                                                        <Dropdown.Item onClick={() => setEdit({
                                                            id: guest._id, 
                                                            name: guest.name
                                                        })}>Modifier</Dropdown.Item>
                                                        
                                                        <Dropdown.Item onClick={()=>{handleRemoveGuest(guest._id)}}>Supprimer l'invité</Dropdown.Item>
                                                    </>)}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> */}
                    <div className="div-guest___container">
                      <div className="guest-picture center-x">
                        {edit.id === guest._id ? null : (
                          <>
                            {guest.media === "" ? (
                              <img alt="avatar" src={avatar} />
                            ) : (
                              <img
                                alt="notre mariage"
                                src={`https://my-wedding-backend.onrender.com/api/admin/guests/media/${guest.media}`}
                              />
                            )}
                          </>
                        )}
                      </div>

                      {edit.id === guest._id ? (
                        <>
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
                          />
                        </>
                      ) : (
                        <>
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
                          <div className="guest-card__button-container">
                            <BlackButton
                              onClick={() =>
                                setEdit({
                                  id: guest._id,
                                  name: guest.name,
                                })
                              }
                              variant="contained"
                              text="Modifier"
                            />
                          </div>
                        </>
                      )}
                      <Modal
                        open={isOpen}
                        setOpen={setisOpen}
                        guestId={editPicture}
                        close={() => {
                          setisOpen(false);
                        }}
                      >
                        <form
                          className="modal___picture"
                          onSubmit={(e) => {
                            upload(editPicture);
                            e.preventDefault();
                          }}
                        >
                          <label>
                            Télécharger une photo (format: JPG/JPEG ou PNG)
                          </label>
                          <input
                            type="file"
                            name="media"
                            onChange={handleFileInput}
                          />
                          <button type="submit">Valider</button>
                        </form>
                      </Modal>
                    </div>
                    <SmallGuestCard
                      guest={guest}
                      firstPerson={firstPerson}
                      secondPerson={secondPerson}
                    />
                  </Grid2>
                );
              })}
          </Grid2>
        </Box>
      )}
    </>
  );
};

export default Guests;
