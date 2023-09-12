import React, { useCallback, useEffect } from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const searchHandler = useCallback(() => {
    navigate(`search-result/${input}`);
  }, [input, navigate]);

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
  }, [input, searchHandler]);
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search the store"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={styles.icon} onClick={searchHandler}>
        <BiSearch size={28} color="var(--color-secondary)" />
      </div>
    </div>
  );
};

export default Search;
