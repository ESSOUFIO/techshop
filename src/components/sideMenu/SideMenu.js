import React from "react";
import styles from "./SideMenu.module.scss";
import { IoMdClose } from "react-icons/io";

const SideMenu = ({ show, onHide, title, children }) => {
  return (
    <div
      className={
        show ? `${styles.sideMenu} ${styles["show-sideMenu"]}` : styles.sideMenu
      }
    >
      <div className={styles.menu}>
        <div className={styles.title}>
          <p>{title}</p>
          <div onClick={onHide}>
            <IoMdClose size={26} />
          </div>
        </div>

        {children}
      </div>
      <div
        className={
          show
            ? `${styles["menu-wrap"]} ${styles["show-menu-wrap"]}`
            : styles["menu-wrap"]
        }
        onClick={onHide}
      ></div>
    </div>
  );
};

export default SideMenu;
