import React from "react";
import magnifyingGlass from "../../../../../img/magnifying-glass.png";
import "./SearchBar.css";

const SearchBar = ({ value, name, onChange, type, placeholder }) => {
  return (
    <>
      <div className="search__container mt-3 mb-3">
        <img src={magnifyingGlass} alt="magnifying glass icon" />
        <input
          className="search__input form-control shadow-none"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
