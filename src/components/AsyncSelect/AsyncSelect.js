import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import "./AsyncSelect.css";

const Select = ({ tableID, guests }) => {

    const [selectedGuest, setSelectedGuest] = useState("");

    const onSearchChange = (name) => {
        if(name){
            setSelectedGuest(name)
        }
        console.log(name)
    }

    const addGuest = (selectedGuest, tableID) => {
        selectedGuest = selectedGuest.value
        console.log(tableID)
        console.log(selectedGuest)
        const token = localStorage.getItem("token");
        const config = {
        headers: { Authorization: 'Bearer '+ token }
        };
        axios.put(`/api/admin/tables/addGuest/${tableID}`, {guestID: selectedGuest}, config)
        // console.log(selectedGuest)
            .then((res) => {
                console.log(res.data)
                if(res.data != null) {
                    const updatedGuestsList = [selectedGuest, ...guests]
                    guests = updatedGuestsList;
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const loadOptions = (inputText, callback) => {
        setTimeout(() => {
            const token = localStorage.getItem("token");
            const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
            axios.get(`api/admin/guests/${inputText}`, config)
            .then((res) => {
                let array;
                array = res.data;
                console.log(array)
                const tempArray = [];
                if(array) {
                    if(array.length){
                        array.forEach((guest) => {
                            console.log(guest)
                            tempArray.push({
                                label: `${guest.name}`,
                                value: guest._id
                            })
                        })
                    } else {
                        tempArray.push({
                            label: `${array.name}`,
                            value: array._id
                        })
                    }
                }
                callback(guests = tempArray)
            })
            .catch((err) => {
                console.log(err)
            })
        }, 1500);
    }
    return(
        <div className="select-style" >
            <AsyncSelect 
            value={selectedGuest}
            loadOptions={loadOptions}
            onChange={e => onSearchChange(e)}
            defaultOptions={true}
            />
            <button className="add-btn" onClick={() => {addGuest(selectedGuest, tableID)}}>Ajouter</button>
        </div>
    )
}

export default Select;