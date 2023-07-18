import React, { useState } from "react";
import styles from "./HeaderMobile.module.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

import logoImg from "../../assets/logo/logo-wb.png";
import SideMenu from "../sideMenu/SideMenu";

const HeaderMobile = () => {
  const [showMenuSlide, setShowMenuSlide] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const triggerMenuSlide = () => {
    setShowMenuSlide(!showMenuSlide);
  };

  const triggerSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <>
      <div className={styles.headerMobile}>
        <div className={styles.iconGroup}>
          <RxHamburgerMenu size={26} onClick={triggerMenuSlide} />
          <GoSearch size={24} onClick={triggerSearch} />
        </div>
        <div>
          <img src={logoImg} alt="techshop" width={170} />
        </div>
        <div className={styles.iconGroup}>
          <FaRegUserCircle size={24} />
          <div className={styles.cart}>
            <HiOutlineShoppingBag size={26} />
            <div className={styles.bubble}>
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
      <SideMenu
        show={showMenuSlide}
        onHide={triggerMenuSlide}
        title={"Menu"}
      ></SideMenu>
      <SideMenu
        show={showSearch}
        onHide={triggerSearch}
        title={"Search"}
      ></SideMenu>
    </>
  );
};

export default HeaderMobile;
