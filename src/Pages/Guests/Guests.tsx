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
import { SwitchEditMode } from "../../components/Buttons";
import Guestlist from "./Guestlist/Guestlist";
import { SectionTitle } from "../../components";

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
  const [checked, setChecked] = useState<boolean>(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };


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

              <SwitchEditMode checked={checked} onChange={switchHandler} />

              <SectionTitle title="Liste d'invités" />

                {/*TODO: Change guestlist design */}
                {guests && guests.length > 0 && (
                <Guestlist 
                  guests={guests}
                  firstPerson={firstPerson}
                  secondPerson={secondPerson}
                  setGuests={setGuests}
                  setMessage={setMessage}
                  setMessageType={setMessageType}
                  setGuestId={setGuestId}
                  editPicture={editPicture}
                  seteditPicture={seteditPicture}
                  mariageID={mariageID}
                  checked={checked} 
                  searchValue={searchValue} 
                  selected={selected}                
                  />
                )}
          </div>
        </div>
      </>
    </ContentLayout>
  );
};

export default Guests;
