import React, { useState } from "react";
import Modal from "../../../../Modals/Set_guest_picture";
import Form from "../Form/UpdateGuest";
import avatar from "../../../../../img/avatar.jpg";
import { Box } from "@material-ui/core";
import BlackButton from "../../../../Buttons/Black/BlackButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"; // import { CSSTransition, TransitionGroup, Transition } from "react-transition-group";
// import { Box, Fade, Grow } from '@material-ui/core';

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

  const [selected, setSelected] = useState("tous");
  // const [deleteId, setDeleteId] = useState("")
  // const nodeRef = useRef(null)

  const handleFileInput = (e) => {
    const fileValue = e.target.files[0];
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
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="select-family"
      >
        <option value="tous">Tous les invités</option>
        <option value="1">{`Invités de ${firstPerson}`}</option>
        <option value="2">{`Invités de ${secondPerson}`}</option>
      </select>
      {guests.length === 0 || null ? (
        <div className="block">
          <span>Vos invités ici.</span>
        </div>
      ) : (
        <Box
          className="guest-container"
          sx={{
            minHeight: "500px",
            paddingLeft: "50px",
            paddingRight: "50px",
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
                    // xs={12}
                    // sm={4}
                    // md={3}
                    key={guest._id}
                    maxWidth={"300px"}
                    minWidth={"250px"}
                    className={`fade-in guest-card-style`}
                  >
                    {edit.id === guest._id && (
                      <div className="guest-card__delete-btn">
                        <button
                          onClick={() => {
                            handleRemoveGuest(guest._id);
                          }}
                        >
                          ✖
                        </button>
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
                        {guest.media === "" ? (
                          <img alt="avatar" src={avatar} />
                        ) : (
                          <img
                            alt="notre mariage"
                            src={`https://my-wedding-backend.onrender.com/api/admin/guests/media/${guest.media}`}
                          />
                        )}
                        {edit.id === guest._id ? (
                          <div>
                            <button
                              onClick={() => {
                                setisOpen(!isOpen);
                                seteditPicture(guest._id);
                              }}
                            >
                              <i className="fas fa-camera" />
                            </button>
                          </div>
                        ) : null}
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
                          />
                        </>
                      ) : (
                        <div className="nameField">
                          <span id="guest-name">{guest.name}</span>
                          <div className="guest-card__namefield-container">
                            Table -
                            {guest.family === "1" ? (
                              <span className="guest-family">{`Invité(e) de ${firstPerson}`}</span>
                            ) : guest.family === "2" ? (
                              <span className="guest-family">{`Invité(e) de ${secondPerson}`}</span>
                            ) : null}
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
                        </div>
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
