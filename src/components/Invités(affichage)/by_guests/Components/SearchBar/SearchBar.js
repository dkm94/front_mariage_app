import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, name, onChange, type, placeholder }) => {

  return (
    <>
      <div className="search__container mb-3">
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