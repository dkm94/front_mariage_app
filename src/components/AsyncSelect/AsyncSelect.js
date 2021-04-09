import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import "./AsyncSelect.css";

const Select = ({ tables, table, guests, setTables }) => {

    const [selectedGuest, setSelectedGuest] = useState(null);
    const [guest, setGuest] = useState(null);

    const onSearchChange = (name) => {
        if(name){
            setSelectedGuest(name)
        }
    }

    const addGuest = (selectedGuest, tableID) => {
        console.log(guest)
        selectedGuest = selectedGuest.value
        const updatedTables = [...tables].map((table) => {
            if(table._id === tableID.id) {
                table._id = selectedGuest
            }
            return table
        })
        axios.put(`/api/admin/tables/addGuest/${tableID._id}`, {guestID: selectedGuest})
            .then((res) => {
                if(res.data != null) {
                    // alert("udpdate ok")
                    // updateTable(updatedTables)
                    setTimeout(() => {
                        setTables(updatedTables)
                        window.location.reload(false)
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const loadOptions = (inputText, callback) => {
        setTimeout(() => {
            axios.get(`api/admin/guests/${inputText}`)
            .then((res) => {
                let array;
                array = res.data;
                // console.log("array", array)
                const tempArray = [];
                if(array) {
                    if(array.length){
                        console.log(guest)
                        array.forEach((guest) => {
                            // console.log(guest)
                            setGuest(guest)
                            tempArray.push({
                                label: `${guest.name}`,
                                value: guest._id
                            })
                            // console.log(tempArray)
                        })
                    } else {
                        tempArray.push({
                            label: `${array.name}`,
                            value: array._id
                        })
                    }
                }
                callback(guests = tempArray)
                // console.log(guests)
            })
            .catch((err) => {
                console.log(err)
            })
        }, 1500);
    }

    // const loadOptions = async (callback) => {
    //     const token = localStorage.getItem("token");
    //     const config = {
    //         headers: { Authorization: 'Bearer '+ token }
    //         };
    //     const data = await fetch(`api/admin/guests/`, config)
    //     const formatted = await data.json()
    //     console.log(formatted)
    //     callback(formatted.map(guest => ({ label: guest.name, value: guest._id, avatar: guest.media })))
    // }
    return(
        <div className="select-style" >
            <AsyncSelect 
            value={selectedGuest}
            loadOptions={loadOptions}
            onChange={e => onSearchChange(e)}
            defaultOptions={true}
            />
            <button className="add-btn" onClick={() => {addGuest(selectedGuest, table)}}>Ajouter</button>
        </div>
    )
}

export default Select;