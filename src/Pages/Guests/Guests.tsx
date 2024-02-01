import "./Guests.css";
import "./style/guests.css";

import React, { useState, ChangeEvent } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { GuestType } from "../../../types";
import { getGuests } from "../../services/guestRequests";
import { useFetch } from "../../hooks";

import AddForm from "./Forms/Add/AddGuest";
import SearchBar from "./SearchBar/SearchBar";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import Guest from "./Cards/MainCard/MainCard";
import { Box } from "@mui/material";


type NewUser = string;

type UserType = {
  firstPerson: string;
  secondPerson: string;
  mariageID: string;
}
interface GuestsProps {
  page: string;
  token: string;
  userRole: string;
  userInfos: UserType;
}

const Guests = (props: GuestsProps) => {
  const { firstPerson, secondPerson, mariageID } = props.userInfos;

  const [newUser, setNewUser] = useState<NewUser>("");

  const { 
    data: guests, 
    setData: setGuests, 
    loading, 
    message, 
    messageType,
    setMessage,
    setMessageType,
    } = useFetch<void, GuestType[]>(getGuests,[]);
    
  const [editPicture, seteditPicture] = useState<string>("null");
  const [searchValue, setSearchValue] = useState<string>("");
  const [guestId, setGuestId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("tous");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <ContentLayout 
    loading={loading} 
    title={"Souhaitez-vous ajouter de nouveaux invités ?"} 
    src={"guests"} 
    message={message} 
    messageType={messageType} 
    id={guestId || ""}
    >
      <>
        <Container id="guest-section" fluid>
          <Row>
            <Col xs={12} sm={10} md={6} className="guest-form">
              <AddForm 
              newUser={newUser} 
              setNewUser={setNewUser}
              guests={guests}
              setGuests={setGuests} 
              setMessage={setMessage} 
              setMessageType={setMessageType} 
              />
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
        <div className="guests___list">
          <div className="byguests___block">
              <div className="select-guest">
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

              {guests.length === 0 && (
                <div className="block">
                  <span>Vos invités ici.</span>
                </div>)}

                {guests && guests.length > 0 && <Box className="guest-container" sx={{ minHeight: guests ? "0px" : "600px" }}>
                  <div className="guests-container">
                    {guests
                      //searchbar filter
                      .filter((guest) => {
                        return (
                          guest &&
                          guest.name &&
                          guest.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
                        );
                      })
                      //select filter
                      .filter((guest) => {
                        if (selected === "1") {
                          return guest?.family === "1";
                        } else if (selected === "2") {
                          return guest?.family === "2";
                        } else {
                          return guest;
                        }
                      })
                      .sort((a, b) => {
                        return (a && b && a.name > b.name) ? 1 : -1;
                      })
                      .map((guest) => {
                        return (
                          <Guest 
                          key={guest?._id} 
                          guest={guest}
                          firstPerson={firstPerson}
                          secondPerson={secondPerson}
                          guests={guests}
                          setGuests={setGuests}
                          setMessage={setMessage}
                          setMessageType={setMessageType}
                          setGuestId={setGuestId}
                          editPicture={editPicture}
                          seteditPicture={seteditPicture}
                          mariageID={mariageID}
                          />
                        )
                      })}
                  </div>
              </Box>}
          </div>
        </div>
      </>
    </ContentLayout>
  );
};

export default Guests;
