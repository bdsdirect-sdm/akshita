import React from "react";

const SearchBar = ({customClass = ""}) => {
  return (
      <input
        
        className={`rounded-3xl p-4 border ${customClass} w-full`}
        placeholder="Search"
      ></input>

  );
};

export default SearchBar;
