import React from "react";
import styles from "./SearchMenu.module.scss";
import SideMenu from "../../sideMenu/SideMenu";
import { HiOutlineSearch } from "react-icons/hi";

const SearchMenu = ({ show, onHide, position, title }) => {
  return (
    <SideMenu show={show} onHide={onHide} position={position} title={title}>
      <div className={styles.input}>
        <input type="text" placeholder="Search Products" />
        <div className={styles.icon}>
          <HiOutlineSearch size={22} />
        </div>
      </div>
    </SideMenu>
  );
};

export default SearchMenu;
