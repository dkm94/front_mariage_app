import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import "./AsyncSelect.css";

const Select = ({ tables, table, guests, setTables }) => {

    const [selectedGuest, setSelectedGuest] = useState(null);
    const [guest, setGuest] = useState(null);

    React.useEffect(() => {
    //    console.log("invités de la table", guests)
    })

    const onSearchChange = (name) => {
        if(name){
            setSelectedGuest(name)
        }
        console.log(name)
    }

    const updateTable = (newTableList) => {
        alert("Update table!")
        setTables(newTableList)
        console.log(guest)
        // console.log("resultat update tables:", tables)
    }

    const addGuest = (selectedGuest, tableID) => {
        selectedGuest = selectedGuest.value
        // console.log("table", table.id)
        console.log(selectedGuest)
        const token = localStorage.getItem("token");
        const config = {
        headers: { Authorization: 'Bearer '+ token }
        };
        axios.put(`/api/admin/tables/addGuest/${tableID._id}`, {guestID: selectedGuest}, config)
            .then((res) => {
                console.log(res.data)
                if(res.data != null) {
                    alert("udpdate ok")
                    const updatedTables = [...tables].map((table) => {
                        if(table._id === tableID._id) {
                            console.log(true)
                        }
                        return table
                    })
                    updateTable(updatedTables)
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
                // console.log("array", array)
                const tempArray = [];
                if(array) {
                    if(array.length){
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