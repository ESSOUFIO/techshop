import React from "react";
import SideMenu from "../../sideMenu/SideMenu";
import styles from "./MainMenu.module.scss";
import { RiFlashlightLine } from "react-icons/ri";
import {
  MdOutlineCollectionsBookmark,
  MdOutlineMarkEmailRead,
} from "react-icons/md";
import { TbInfoSquareRounded } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi";

const MainMenu = ({ show, onHide, position, title }) => {
  return (
    <SideMenu show={show} onHide={onHide} position={position} title={title}>
      <ul className={styles.navMenu}>
        <li>
          <span>
            <HiOutlineHome size={24} />
          </span>
          <span>Home</span>
        </li>

        <li>
          <span>
            <RiFlashlightLine size={24} />
          </span>
          <span>Hot Deal</span>
        </li>

        <li>
          <span>
            <MdOutlineCollectionsBookmark size={24} />
          </span>
          <span>Collection</span>
        </li>

        <li>
          <span>
            <TbInfoSquareRounded size={24} />
          </span>
          <span>About Us</span>
        </li>

        <li>
          <span>
            <MdOutlineMarkEmailRead size={24} />
          </span>
          <span>Contact</span>
        </li>
      </ul>
    </SideMenu>
  );
};

export default MainMenu;
