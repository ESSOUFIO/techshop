import React from "react";
import styles from "./SideMenu.module.scss";
import { IoMdClose } from "react-icons/io";

const SideMenu = ({ show, onHide, title, position, children }) => {
  return (
    <div
      className={
        show
          ? `${styles.sideMenu} ${styles["show-sideMenu"]}`
          : position === "left"
          ? `${styles.sideMenu}  ${styles["sideMenu-left"]}`
          : `${styles.sideMenu}  ${styles["sideMenu-right"]}`
      }
    >
      <div
        className={
          position === "left"
            ? `${styles.menu} ${styles["menu-left"]}`
            : `${styles.menu} ${styles["menu-right"]}`
        }
      >
        <div className={styles.title}>
          <p>{title}</p>
          <div onClick={onHide} style={{ cursor: "pointer" }}>
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
