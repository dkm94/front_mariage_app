import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import "./AsyncSelect.css";

const Select = ({ tables, table, guests, setTables }) => {
    
    const [loadingList, setloadingList] = useState(tables)

    const disableBtn = {
        boxShadow: 'none',
        backgroundColor: '#d6d6d6',
        color: '#878787'
    }

    const enableBtn = {
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 26%)',
        background: 'beige'
    }

    // useEffect(() => {
    //     console.log(tables)
    // }, [tables])

    const [selectedGuest, setSelectedGuest] = useState(null);
    const [guest, setGuest] = useState(null);
    // console.log(guest)

    const onSearchChange = (name) => {
        if(name){
            setSelectedGuest(name)
        }
    }

    const addGuest = (selectedGuest, tableID) => {
        selectedGuest = selectedGuest.value
        const updatedTables = [...loadingList].map((table) => {
            if(table._id === tableID.id) {
                table._id = selectedGuest
            }
            return table
        })
        axios.put(`/api/admin/tables/addGuest/${tableID._id}`, {guestID: selectedGuest})
            .then((res) => {
                if(res.data != null) {
                    setTimeout(() => {
                        // setTables(updatedTables)
                        setloadingList(updatedTables)
                        window.location.reload()
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
                console.log(guest)
                let array;
                array = res.data;
                const tempArray = [];
                if(array) {
                    if(array.length){
                        array.forEach((guest) => {
                            console.log(guest)
                            setGuest(guest)
                            tempArray.push({
                                label: `${guest.name}`,
                                value: guest._id,
                                tableID: guest.tableID
                            })
                        })
                    } else {
                        tempArray.push({
                            label: `${array.name}`,
                            value: array._id,
                            tableID: `${guest.tableID}`
                        })
                    }
                }
                callback(guests = tempArray)
                // console.log(tempArray)
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
            // inputValue={true}
            isOptionDisabled={(option) => option.tableID != null }
            />
            <button className="add-btn" disabled={!selectedGuest} style={!selectedGuest ? disableBtn : enableBtn} onClick={() => {addGuest(selectedGuest, table)}}>Ajouter</button>
        </div>
    )
}

export default Select;