import "./Invités.css";
import "../../components/Invités(affichage)/by_guests/guests.css";

import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Grow from "@mui/material/Grow";

import { GuestType } from "../../../types";
import { getGuests } from "../../services/guests/guestRequests";
import { ScrollButtonContext } from "../../App";

import AddForm from "../../components/Invités(affichage)/by_guests/Components/Form/AddGuest";
import GuestList from "../../components/Invités(affichage)/by_guests/Components/Guests/Guests";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import ScreenLoader from "../../components/Loader/Screen/ScreenLoader.jsx";

type NewUser = string;

type UserType = {
  firstPerson: string;
  secondPerson: string;
  mariageID: string;
}
interface ByGuestsProps {
  page: string;
  token: string;
  userRole: string;
  userInfos: UserType;
}

const Byguests = (props: ByGuestsProps) => {
  const { firstPerson, secondPerson, mariageID } = props.userInfos;
  const scrollBtn = useContext(ScrollButtonContext);

  const [newUser, setNewUser] = useState<NewUser>("");

  const [guests, setGuests] = useState<GuestType[] | []>([]);
  const [editPicture, seteditPicture] = useState<string>("null");
  const [file, setFile] = useState(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [user, setUser] = useState<GuestType | {}>({});
  const [appear, setAppear] = useState<boolean>(false);
  const [isOpen, setisOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const fetchGuests = async () => { // TODO: problème de performances, trop de re rendus (search bar, update picture...)
    try {
      setLoading(true);
      const guestsResponse = await getGuests();
      if(guestsResponse.success && guestsResponse.statusCode === 200) {
        setAppear(true);
        setGuests(guestsResponse.data  || []);
      } else {
        setError(true);
        if(guestsResponse.message === "Network Error"){
          setErrorMessage("Oups, une erreur s'est produite.");
        } else {
          setErrorMessage(guestsResponse.message);
        }
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests()
}, [user]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const addGuest = (createdUser: GuestType) => {   
    setGuests([...guests, createdUser]);
  };

  const editGuest = (updatedGuest: GuestType) => {
    const updatedGueslist = [...guests].map((guest) => {
      if (guest._id === updatedGuest._id) {
        guest.name = updatedGuest.name;
      }
      return guest;
    });
    setUser(updatedGuest);
    setGuests(updatedGueslist);
    setisOpen(false);
  };

  const deleteGuest = async (id: string) => {
    await axios
      .delete(`/api/admin/guests/delete/${id}`)
      .then((result) => {
        if (result.data != null) {
          setGuests(guests.filter((guest: GuestType) => guest._id !== id));
          setisOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (file) => {
    setFile(file);
  };

  const uploadPicture = async (id) => {
    let newUser;
    if (file == null) return;
    let formData = new FormData();
    formData.append("media", file);
    await axios
      .post(`/api/admin/guests/edit/${id}`, formData)
      .then((result) => {
        if (result.data != null) {
          setFile(null);
          const updatedGueslist = [...guests].map((guest) => {
            if (guest._id === id) {
              newUser = {
                _id: result.data._id,
                name: result.data.name,
                family: result.data.family,
                media: result.data.media,
              };
            }
            return guest;
          });
          setUser(newUser);
          setGuests(updatedGueslist);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <ScreenLoader />
      ) : (
        <div className="byguests page-component">
          <div className="guest-container">
            {scrollBtn}
            <div className="page-location">
              <div>
                <Link to={"/"}>Dashboard</Link>
                {">"} Invités
              </div>
            </div>

            <Grow in={!loading}>
              <div className="titles mb-3">
                <h2>Souhaitez-vous ajouter de nouveaux invités ?</h2>
              </div>
            </Grow>

            <Grow in={!loading} timeout={1000}>
              <div className="guests___bgimage"></div>
            </Grow>

            <Grow in={!loading} timeout={2000}>
              <Container style={{ padding: "2rem 50px" }} fluid>
                <Row>
                  <Col xs={12} sm={10} md={6} className="guest-form">
                    <AddForm newUser={newUser} setNewUser={setNewUser} addGuest={addGuest} />
                  </Col>
                  <Col xs={12} sm={10} md={6} className="searchbar">
                    <SearchBar
                      className="search__input"
                      type="text"
                      placeholder="Rechercher un invité"
                      name="searchbar"
                      value={searchValue}
                      onChange={handleSearch}
                    />
                  </Col>
                </Row>
              </Container>
            </Grow>

            <Grow in={!loading} timeout={2000}>
              <div className="guests___list">
                <div className="byguests___block">
                  <GuestList
                    guests={guests}
                    setGuests={setGuests}
                    deleteGuest={deleteGuest}
                    updateGuest={editGuest}
                    editPicture={editPicture}
                    seteditPicture={seteditPicture}
                    upload={uploadPicture}
                    handleFile={handleFile}
                    searchValue={searchValue}
                    mariageID={mariageID}
                    appear={appear}
                    firstPerson={firstPerson}
                    secondPerson={secondPerson}
                    isOpen={isOpen}
                    setisOpen={setisOpen}
                    errorMessage={errorMessage}
                    error={error}
                  />
                </div>
              </div>
            </Grow>
          </div>
        </div>
      )}
    </>
  );
};

export default Byguests;
