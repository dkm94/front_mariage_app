import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const UpdateGuest = ({ edit, setEdit, onSubmit, mariageID, guestFamily }) => {
  const [family, setFamily] = useState({
    firstPerson: "",
    secondPerson: "",
  });
  const [radioValue, setRadioValue] = useState(guestFamily);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/admin/wedding/${mariageID}`, { withCredentials: true })
        .then((res) => {
          setFamily({
            firstPerson: res.data.firstPerson,
            secondPerson: res.data.secondPerson,
          });
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [mariageID]);

  const [input, setInput] = useState(edit ? edit.name : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({
      id: edit.id,
      name: input,
    });
    if (input.trim() === "") {
      return;
    } else {
      await axios
        .post(`api/admin/guests/edit/${edit.id}`, {
          _id: edit.id,
          name: input,
          family: radioValue,
        })
        .then((res) => {
          onSubmit(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setEdit({ id: "" });
    setInput("");
  };

  return (
    <>
      <div className="nameField guest__updateForm" id="input___nameField">
        <form onSubmit={handleSubmit} id="update-form">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={input}
            ref={inputRef}
            required
          />
          <div className="chose-family">
            <p>
              <input
                type="radio"
                id="test1"
                name="family"
                value="1"
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue === "1"}
              />
              <label htmlFor="test1">Famille de {family.firstPerson}</label>
            </p>
            <p>
              <input
                type="radio"
                id="test2"
                name="family"
                value="2"
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue === "2"}
              />
              <label htmlFor="test2">Famille de {family.secondPerson} </label>
            </p>
          </div>
          {/* <button style={{ width: "fit-content", padding: "7px 30px", alignSelf: "center", borderRadius: "7px"}} >
                        <i className="fas fa-check"/>
                    </button> */}
          <div className="guest-card__form__button-container">
            <Button onClick={() => setEdit({ id: null })} variant="outline">
              Annuler
            </Button>
            <Button onClick={handleSubmit} variant="outline">
              Valider
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateGuest;
