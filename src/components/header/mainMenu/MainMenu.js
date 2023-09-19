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
import { useNavigate } from "react-router-dom";

const MainMenu = ({ show, onHide, position, title }) => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
    onHide();
  };

  const toFlashDeal = () => {
    navigate("/flash-deal");
    onHide();
  };

  const toCategories = () => {
    navigate("/categories");
    onHide();
  };

  const toAboutUs = () => {
    navigate("/about-us");
    onHide();
  };

  const toContact = () => {
    navigate("/contact");
    onHide();
  };
  return (
    <SideMenu show={show} onHide={onHide} position={position} title={title}>
      <ul className={styles.navMenu}>
        <li onClick={toHome}>
          <span>
            <HiOutlineHome size={24} />
          </span>
          <span>Home</span>
        </li>

        <li onClick={toFlashDeal}>
          <span>
            <RiFlashlightLine size={24} />
          </span>
          <span>Flash Deal</span>
        </li>

        <li onClick={toCategories}>
          <span>
            <MdOutlineCollectionsBookmark size={24} />
          </span>
          <span>Categories</span>
        </li>

        <li onClick={toAboutUs}>
          <span>
            <TbInfoSquareRounded size={24} />
          </span>
          <span>About Us</span>
        </li>

        <li onClick={toContact}>
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
