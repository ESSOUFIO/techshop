import React, { useState } from "react";
import styles from "./HeaderMobile.module.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

import logoImg from "../../assets/logo/logo-wb.png";
import SideMenu from "../sideMenu/SideMenu";
import MainMenu from "./mainMenu/MainMenu";
import SearchMenu from "./searchMenu/SearchMenu";

const HeaderMobile = () => {
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const triggerMainMenu = () => {
    setShowMainMenu(!showMainMenu);
  };

  const triggerSearchMenu = () => {
    setShowSearch(!showSearch);
  };

  const triggerLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };
  return (
    <>
      <div className={styles.headerMobile}>
        <div className={styles.container}>
          <div className={styles.iconGroup}>
            <RxHamburgerMenu size={26} onClick={triggerMainMenu} />
            <GoSearch size={24} onClick={triggerSearchMenu} />
          </div>
          <div className={styles.logo}>
            <img src={logoImg} alt="techshop" />
          </div>
          <div className={styles.iconGroup}>
            <FaRegUserCircle size={24} onClick={triggerLoginMenu} />
            <div className={styles.cart}>
              <HiOutlineShoppingBag size={26} />
              <div className={styles.bubble}>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MainMenu
        show={showMainMenu}
        onHide={triggerMainMenu}
        position={"left"}
        title={"Menu"}
      ></MainMenu>

      <SearchMenu
        show={showSearch}
        onHide={triggerSearchMenu}
        position={"left"}
        title={"Search"}
      ></SearchMenu>

      <SideMenu
        show={showLoginMenu}
        position={"right"}
        onHide={triggerLoginMenu}
        title={"Log In"}
      ></SideMenu>
    </>
  );
};

export default HeaderMobile;
