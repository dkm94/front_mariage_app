import "./Invités.css";
import "../../components/Invités(affichage)/by_guests/guests.css";

import React, { useState, ChangeEvent } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { GuestType } from "../../../types";
import { getGuests } from "../../services/guestRequests";
import { useFetch } from "../../hooks";

import AddForm from "../../components/Invités(affichage)/by_guests/Components/Form/AddGuest";
import GuestList from "../../components/Invités(affichage)/by_guests/Components/Guests/Guests";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";


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
            <GuestList
              guests={guests}
              setGuests={setGuests}
              editPicture={editPicture}
              seteditPicture={seteditPicture}
              searchValue={searchValue}
              mariageID={mariageID}
              firstPerson={firstPerson}
              secondPerson={secondPerson}
              setMessage={setMessage}
              setMessageType={setMessageType}
              setGuestId={setGuestId}
              />
          </div>
        </div>
      </>
    </ContentLayout>
  );
};

export default Guests;
