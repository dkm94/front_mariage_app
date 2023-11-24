import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import Button from "../../LargeButton/LargeButton";
import { ScrollButtonContext } from "../../App.tsx";
import AddForm from "../../components/Invités(affichage)/by_guests/Components/Form/AddGuest.tsx";
import GuestList from "../../components/Invités(affichage)/by_guests/Components/Guests/Guests.tsx";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar.js";
import "../../components/Invités(affichage)/by_guests/guests.css";
import "./Invités.css";
import axios from "axios";
import ScreenLoader from "../../components/Loader/Screen/ScreenLoader.jsx";
import Grow from "@mui/material/Grow";

const Byguests = ({ userInfos }) => {
  const mariageID = userInfos.mariageID;
  const firstPerson = userInfos.firstPerson;
  const secondPerson = userInfos.secondPerson;
  const scrollBtn = useContext(ScrollButtonContext);

  const [guests, setGuests] = useState([]);
  const [editPicture, seteditPicture] = useState(null);
  const [file, setFile] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState({});
  const [appear, setAppear] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get("/api/admin/guests/")
        .then((result) => {
          setAppear(true);
          setGuests(result.data);
        })
        .then(() => setLoading(false))
        .catch((err) => err.json("Failed to load the ressource"));
    };
    fetchData();
  }, [user]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const addGuest = (newGuest) => {
    setUser(newGuest);
    setGuests([...guests, newGuest]);
  };

  const editGuest = (updatedGuest) => {
    const updatedGueslist = [...guests].map((guest) => {
      if (guest._id === updatedGuest.id) {
        guest.name = updatedGuest.name;
      }
      return guest;
    });
    setUser(updatedGuest);
    setGuests(updatedGueslist);
  };

  const deleteGuest = async (id) => {
    await axios
      .delete(`/api/admin/guests/delete/${id}`)
      .then((result) => {
        if (result.data != null) {
          setGuests(guests.filter((guest) => guest._id !== id));
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

  const button_wrapper_style = {
    position: "relative",
    zIndex: 1,
  };

  return (
    <>
      {loading ? (
        <ScreenLoader />
      ) : (
        <div className="byguests page-component">
          <div className="guest-container" style={button_wrapper_style}>
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
                    <AddForm addGuest={addGuest} />
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

export default withRouter(Byguests);
