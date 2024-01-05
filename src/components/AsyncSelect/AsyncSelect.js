import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import "./AsyncSelect.css";

const Select = ({ tables, table, guests, setTables, tableId }) => {
  console.log("🚀 ~ file: AsyncSelect.js:9 ~ Select ~ guests:", guests)
  const [loadingList, setloadingList] = useState(tables);

  const disableBtn = {
    boxShadow: "none",
    backgroundColor: "#d6d6d6",
    color: "#878787",
    borderRadius: "7px",
    transition: "0.2s all ease-in-out",
    // fontSize: ".75rem"
  };

  const enableBtn = {
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 26%)",
    backgroundColor: "#262626",
    borderColor: "#caa5c1",
    color: "#FFFFFF",
    borderRadius: "5px",
    fontWeight: "400",
    width: "fit-content",
  };

  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guest, setGuest] = useState(null);

  const onSearchChange = (name) => {
    if (name) {
      setSelectedGuest(name);
    }
  };

  const addGuest = async (selectedGuest, tableID) => {
    selectedGuest = selectedGuest.value;
    const updatedTables = [...loadingList].map((table) => {
      if (table._id === tableID.id) {
        table._id = selectedGuest;
      }
      return table;
    });
    await axios
      .put(`/api/admin/guests/addtable/${tableID}`, {
        tableID: tableId,
      })
      .then((res) => {
        if (res.data != null) {
          setTimeout(() => {
            setloadingList(updatedTables);
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadOptions = (inputText, callback) => {
    setTimeout(() => {
      axios
        .get(`api/admin/guests/${inputText}`)
        .then((res) => {
          // console.log(guest)
          let array;
          array = res.data;
          const tempArray = [];
          if (array) {
            if (array.length) {
              array.forEach((guest) => {
                // console.log(guest)
                setGuest(guest);
                tempArray.push({
                  label: `${guest.name}`,
                  value: guest._id,
                  tableID: guest.tableID,
                });
              });
            } else {
              tempArray.push({
                label: `${array.name}`,
                value: array._id,
                tableID: `${guest.tableID}`,
              });
            }
          }
          callback((guests = tempArray));
          // console.log(tempArray)
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);
  };

  return (
    <div className="select-style">
      <AsyncSelect
        value={selectedGuest}
        loadOptions={loadOptions}
        onChange={(e) => onSearchChange(e)}
        defaultOptions={true}
        // inputValue={true}
        isOptionDisabled={(option) => option.tableID != null}
      />
      <IconButton
        disabled={!selectedGuest}
        style={!selectedGuest ? disableBtn : enableBtn}
        onClick={() => {
          addGuest(selectedGuest, table);
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default Select;
