import "./style.css";

import React from 'react';
import { GuestsProps } from "../../../../types";

import Guest from "../Cards/MainCard/MainCard";

interface GuestListProps extends GuestsProps {
    searchValue: string;
    selected: string;
}

const Guestlist = (props: GuestListProps) => {
    const { 
        guests, 
        searchValue, 
        selected,
        firstPerson,
        secondPerson,
        setMessage,
        setMessageType ,
        setGuests,
        setGuestId,
        editPicture,
        seteditPicture,
        mariageID,
        checked,
        setChecked
    } = props;
  return (
    <section id="guestlist-container">
        <div id="guestlist-content">
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
                checked={checked}
                setChecked={setChecked}
                />
            )
            })}
        </div>
    </section>
  )
}

export default Guestlist