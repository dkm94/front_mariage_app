import "./Guests.css";
import "./style/guests.css";

import React, { useState, ChangeEvent } from "react";
import { useHistory } from "react-router";

import { GuestType } from "../../../types";
import { getGuests } from "../../services/guestRequests";
import { useFetch } from "../../hooks";
import { useCurrentUser } from "../../ctx/userCtx";

import AddForm from "./Forms/Add/AddGuest";
import SearchBar from "./SearchBar/SearchBar";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import { AddButton, SwitchEditMode } from "../../components/Buttons";
import Guestlist from "./Guestlist/Guestlist";
import { SectionTitle, SingleSelect } from "../../components";
import DefaultModal from "../../components/Modals/Default/DefaultModal";

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
  const history = useHistory();
  const{ firstPerson, secondPerson, mariageID } = useCurrentUser();

  const selectArray = [
    {
      value: "tous",
      name: "Tous les invités"
    },
    {
      value: "1",
      name: `Invités de ${firstPerson}`
    },
    {
      value: "2",
      name: `Invités de ${secondPerson}`
    }
  ]

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  function handleModal(){
    setOpenModal(!openModal);
  }

  const firstPersonGuests = guests.filter((guest) => guest?.family === "1").length;
  const secondPersonGuests = guests.filter((guest) => guest?.family === "2").length;
  // TODO: edit URL

  return (
    <ContentLayout 
    loading={loading} 
    title={"Souhaitez-vous ajouter de nouveaux invités ?"} 
    src={"guests"} 
    message={message} 
    messageType={messageType} 
    id={guestId || ""}
    >
      <div className="section-action-box">
        {openModal && <DefaultModal
        close={() => {
            setOpenModal(false);
            const currentPosition: number = window.scrollY;
            history.replace(`/mariage/${mariageID}/invites`, { currentPosition } )
        }}
        setOpen={handleModal}
        title={"Nouvel invité"}
        >
          <AddForm 
            newUser={newUser} 
            setNewUser={setNewUser}
            guests={guests}
            setGuests={setGuests} 
            setMessage={setMessage} 
            setMessageType={setMessageType}
            mariageID={mariageID}
            history={history}
            setOpenModal={setOpenModal}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            firstPerson={firstPerson}
            secondPerson={secondPerson}
          />
        </DefaultModal>}
        <SearchBar
          className="search__input"
          type="text"
          placeholder="Rechercher"
          name="searchbar"
          value={searchValue}
          onChange={handleSearch}
        />
        <div className="select-guest">
          <SingleSelect
            selected={selected}
            setSelected={setSelected}
            placeholder="Tous les invités"
            array={selectArray}
            size="medium"
            label="Sélectionner"
            firstPersonGuests={firstPersonGuests}
            secondPersonGuests={secondPersonGuests}  
            // totalGuests={totalGuests} 
          />
        </div>
        <AddButton onClick={handleModal} type="button" />
        <SwitchEditMode checked={checked} onChange={switchHandler} />
      </div>
      <div className="guests___list">
        <SectionTitle title="Liste d'invités" />
        <div className="byguests___block">
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
            setChecked={setChecked}           
            />
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default Guests;
