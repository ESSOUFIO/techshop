import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = ({ wrapperClass, iconClass, icon, onHide }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const searchHandler = useCallback(() => {
    navigate(`search-result/${input}`);
    console.log("onHide: ", onHide);
    if (onHide) onHide();
  }, [input, navigate, onHide]);

  /** listen Enter */
  useEffect(() => {
    if (input !== "") {
      const keyDownHandler = (event) => {
        // console.log("User pressed: ", event.key);
        if (event.key === "Enter") {
          event.preventDefault();
          searchHandler();
        }
      };
      document.addEventListener("keydown", keyDownHandler);
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [input, searchHandler, onHide]);
  return (
    <div className={wrapperClass}>
      <input
        type="text"
        placeholder="Search the store"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={iconClass} onClick={searchHandler}>
        {icon}
      </div>
    </div>
  );
};

export default Search;
