import SearchBar from "material-ui-search-bar";
import React, { useRef } from "react";
import { ReactComponent as Close } from "./../../images/close.svg";

const SearchBarComponent = ({ handleSearch, cancelSearch }) => {
  return (
    <SearchBar
      onChange={handleSearch}
      className="searchBarComponent"
      onRequestSearch={() => {}}
      placeholder="Search File Name..."
      onCancelSearch={cancelSearch}
    />
  );
};

export default SearchBarComponent;
