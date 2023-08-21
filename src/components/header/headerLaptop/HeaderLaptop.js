import styles from "./HeaderLaptop.module.scss";
import React, { useState } from "react";

import logoImg from "../../../assets/logo/logo.png";
import helpIcon from "../../../assets/icons/customer-service.png";
import engIcon from "../../../assets/icons/united-kingdom.png";
import eurIcon from "../../../assets/icons/european.png";
import usdIcon from "../../../assets/icons/united-states.png";
import swissIcon from "../../../assets/icons/switzerland.png";
import arabIcon from "../../../assets/icons/saudi-arabia.png";
import { Search } from "../../index";
import { BsCart3 } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiUserLight } from "react-icons/pi";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import LoginMenu from "../loginMenu/LoginMenu";
import MyAccountMenu from "../myAccountMenu/MyAccountMenu";
import OnlyAdmin from "../../onlyAdmin/OnlyAdmin";

const DropDownItem = ({ iconImg, text, selectedItem, onClick }) => {
  return (
    <div
      className={`${styles.dropDownItem} ${
        selectedItem === text ? styles.activeItem : ""
      }`}
      onClick={() => onClick(text, iconImg)}
    >
      <div>
        <img src={iconImg} alt={text} style={{ width: "20px" }} />
      </div>
      <p>{text}</p>
    </div>
  );
};

const logo = (
  <Link to="/" className={styles.logo}>
    <img src={logoImg} alt="techshop" />
  </Link>
);

const activeLink = ({ isActive }) => (isActive ? styles.active : "");

//**** ------  HeaderLaptop  ----------- */
const HeaderLaptop = ({ isLoggedIn, userName }) => {
  const [lang, setLang] = useState("EN");
  const [langIcon, setLangIcon] = useState(engIcon);
  const [curr, setCurr] = useState("USD");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  const selectLang = (text, iconImg) => {
    setLang(text);
    setLangIcon(iconImg);
  };

  const triggerShowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <div className={styles.groupHeader}>
        <div className={styles.topHeader}>
          {logo}

          <Search />

          <div className={styles.iconsWrap}>
            <p>
              Available 24/7 at <span>(090) 123-4567</span>
            </p>

            <OnlyAdmin>
              <div
                className={styles.headerIcon}
                onClick={() => navigate("/admin/dashboard")}
              >
                <div className={styles.icon}>
                  <MdOutlineAdminPanelSettings
                    size={33}
                    color={"var(--color-primary)"}
                  />
                </div>
                <Link to="/admin/dashboard">Admin</Link>
              </div>
            </OnlyAdmin>

            <div className={styles.headerIcon}>
              <div className={styles.icon}>
                <IoMdHeartEmpty size={33} color={"var(--color-primary)"} />
              </div>
              <Link to="">Wish Lists</Link>
            </div>

            <div className={styles.headerIcon} onClick={triggerShowUserMenu}>
              <div className={styles.icon}>
                <PiUserLight size={34} color={"var(--color-primary)"} />
              </div>
              <span>{isLoggedIn ? "My Account" : "Sign In"}</span>
            </div>

            <div
              className={styles.headerIcon}
              onClick={() => navigate("/cart")}
            >
              <div className={styles.icon}>
                <BsCart3 size={31} color={"var(--color-primary)"} />
              </div>
              <span>Cart</span>
              <div className={styles.bubble}>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainMenu}>
          <nav>
            <NavLink to="/" className={activeLink}>
              Home
            </NavLink>
            <NavLink to="/hot-deal" className={activeLink}>
              Hot deal
            </NavLink>
            <NavLink to="/collections" className={activeLink}>
              Collections
            </NavLink>
            <NavLink to="/about-us" className={activeLink}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={activeLink}>
              Contact
            </NavLink>
          </nav>

          <div className={styles.iconsWrap}>
            <div className={styles.helpIcon}>
              <img src={helpIcon} alt="help" style={{ width: "22px" }} />
              <span>Help</span>
            </div>
            <div className={styles.langCurrency}>
              <div
                className={styles.lang}
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <img src={langIcon} alt="help" style={{ width: "17px" }} />
                <span>{lang}</span>
              </div>
              <ul className={`dropdown-menu ${styles["dropdown-menu"]}`}>
                <DropDownItem
                  iconImg={engIcon}
                  text={"EN"}
                  selectedItem={lang}
                  onClick={selectLang}
                />

                <DropDownItem
                  iconImg={arabIcon}
                  text={"AR"}
                  selectedItem={lang}
                  onClick={selectLang}
                />
              </ul>

              <p>/</p>

              <div className={styles.currencyWrap}>
                <div
                  className={styles.currency}
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  <span>{curr}</span>
                  <MdOutlineKeyboardArrowDown
                    size={22}
                    color="var(--color-lightblue)"
                  />
                </div>
                <ul className={`dropdown-menu ${styles["dropdown-menu"]}`}>
                  <DropDownItem
                    iconImg={usdIcon}
                    text={"USD"}
                    selectedItem={curr}
                    onClick={setCurr}
                  />

                  <DropDownItem
                    iconImg={eurIcon}
                    text={"EUR"}
                    selectedItem={curr}
                    onClick={setCurr}
                  />

                  <DropDownItem
                    iconImg={engIcon}
                    text={"GBP"}
                    selectedItem={curr}
                    onClick={setCurr}
                  />

                  <DropDownItem
                    iconImg={swissIcon}
                    text={"CHF"}
                    selectedItem={curr}
                    onClick={setCurr}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn ? (
        <MyAccountMenu
          show={showUserMenu}
          onHide={triggerShowUserMenu}
          userName={userName}
        />
      ) : (
        <LoginMenu show={showUserMenu} onHide={triggerShowUserMenu} />
      )}
    </>
  );
};

export default HeaderLaptop;
