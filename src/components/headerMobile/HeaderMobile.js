import React, { useEffect, useState } from "react";
import styles from "./HeaderMobile.module.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

import logoImg from "../../assets/logo/logo-wb.png";
import MainMenu from "./mainMenu/MainMenu";
import SearchMenu from "./searchMenu/SearchMenu";
import { useNavigate } from "react-router-dom";
import LoginMenu from "../header/loginMenu/LoginMenu";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../firebase/config";
import MyAccountMenu from "../header/myAccountMenu/MyAccountMenu";
import OnlyAdmin from "../onlyAdmin/OnlyAdmin";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const HeaderMobile = () => {
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const triggerMainMenu = () => {
    setShowMainMenu(!showMainMenu);
  };

  const triggerSearchMenu = () => {
    setShowSearch(!showSearch);
  };

  const triggerShowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className={styles.headerMobileMarge}></div>
      <div className={styles.headerMobile}>
        <div className={styles.container}>
          <div className={styles.iconGroup}>
            <RxHamburgerMenu
              className={styles.icon}
              size={26}
              onClick={triggerMainMenu}
            />
            <GoSearch
              size={24}
              className={styles.icon}
              onClick={triggerSearchMenu}
            />
          </div>
          <div className={styles.logo} onClick={() => navigate("/")}>
            <img src={logoImg} alt="techshop" />
          </div>
          <div className={styles.iconGroup}>
            <OnlyAdmin>
              <MdOutlineAdminPanelSettings
                className={styles.icon}
                size={28}
                onClick={() => navigate("/admin/dashboard")}
              />
            </OnlyAdmin>
            <FaRegUserCircle
              size={24}
              className={styles.icon}
              onClick={triggerShowUserMenu}
            />
            <div className={styles.cart} onClick={() => navigate("/cart")}>
              <HiOutlineShoppingBag className={styles.icon} size={26} />
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

      {user ? (
        <MyAccountMenu
          show={showUserMenu}
          onHide={triggerShowUserMenu}
          userName={user.displayName}
        />
      ) : (
        <LoginMenu show={showUserMenu} onHide={triggerShowUserMenu} />
      )}
    </>
  );
};

export default HeaderMobile;
