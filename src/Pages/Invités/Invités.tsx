import "./Invités.css";
import "../../components/Invités(affichage)/by_guests/guests.css";

import React, { useState, useEffect, ChangeEvent } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { GuestType } from "../../../types";
import { getGuests } from "../../services/guestRequests";

import AddForm from "../../components/Invités(affichage)/by_guests/Components/Form/AddGuest";
import GuestList from "../../components/Invités(affichage)/by_guests/Components/Guests/Guests";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import { useFetch } from "../../hooks";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import Toast from "../../components/Toast/Toast";
import { useSearchParam } from "react-use";

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

  const [newUser, setNewUser] = useState<NewUser>("");

  const { 
    data: guests, 
    setData: setGuests, 
    loading, 
    message, 
    messageType,
    setMessage,
    setMessageType,
    fetchData } = useFetch<void, GuestType[]>(getGuests,[]);
    
  const [editPicture, seteditPicture] = useState<string>("null");
  const [searchValue, setSearchValue] = useState<string>("");
  const [user, setUser] = useState<GuestType | {}>({});
  const [appear, setAppear] = useState<boolean>(false);
  const [isOpen, setisOpen] = useState<boolean>(false);

  useEffect(() => { // TODO: problème de performances, trop de re rendus (search bar, update picture...)
    if (guests && guests.length > 0) {
      setAppear(true);
    }
  }, [user]);

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
    id={(user as { _id?: string })?._id || ""} >
      <>
        <Container style={{ padding: "2rem 50px" }} fluid>
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
              setisOpen={setisOpen}
              setMessage={setMessage}
              setMessageType={setMessageType}
              setIsOpen={setisOpen}
              setUser={setUser}
              />
          </div>
        </div>
      </>
    </ContentLayout>
  );
};

export default Byguests;
