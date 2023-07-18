import React from "react";
import styles from "./Search.module.css";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search the store" />
      <div className={styles.icon}>
        <BiSearch size={28} color="var(--color-secondary)" />
      </div>
    </div>
  );
};

export default Search;
