import React from "react";
import styles from "./SearchMenu.module.scss";
import SideMenu from "../../sideMenu/SideMenu";
import { HiOutlineSearch } from "react-icons/hi";
import SearchSide from "../../search/SearchSide";

const SearchMenu = ({ show, onHide, position, title }) => {
  return (
    <SideMenu show={show} onHide={onHide} position={position} title={title}>
      <SearchSide
        wrapperClass={styles.input}
        iconClass={styles.icon}
        icon={<HiOutlineSearch size={22} />}
        onHide={onHide}
      />
    </SideMenu>
  );
};

export default SearchMenu;
