import "./SearchBar.css";

import React from "react";

import magnifyingGlass from "../../../img/magnifying-glass.png";

const SearchBar = ({ className, value, name, onChange, type, placeholder }) => {
  return (
    <>
      <div className={`search__container mt-3 mb-3 ${className}`}>
        <img src={magnifyingGlass} alt="magnifying glass icon" />
        <input
          className="form-control shadow-none"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          style={{ border: "none" }}
        />
      </div>
    </>
  );
};

export default SearchBar;
