import React from "react";
import logoImg from "../../assets/logo/logo.png";
import styles from "./HeaderLargeScreen.module.css";
import { Search } from "../index";

const HeaderLargeScreen = () => {
  return (
    <div className={styles.topHeader}>
      <div className={styles.logo}>
        <img src={logoImg} alt="techshop" />
      </div>
      <Search />
    </div>
  );
};

export default HeaderLargeScreen;
