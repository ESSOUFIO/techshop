import React from "react";
import styles from "./BottomBar.module.scss";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { LuLayoutGrid } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/authSlice";
import { BsCart3 } from "react-icons/bs";

const BottomBar = ({
  triggerSearchMenu,
  triggerShowUserMenu,
  nbrCartItems,
}) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toHome = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toCart = () => {
    navigate("/cart");
  };
  return (
    <div className={styles.bottomBar}>
      <div className={styles.icon} onClick={toHome}>
        <IoHomeOutline size={22} />
        Home
      </div>

      <div className={styles.icon} onClick={triggerSearchMenu}>
        <BiSearch size={22} />
        Search
      </div>

      <Link to={"/collections"} className={styles.icon}>
        <LuLayoutGrid size={22} />
        Collections
      </Link>

      <div className={styles.icon} onClick={triggerShowUserMenu}>
        <HiOutlineUserCircle size={22} />
        {isLoggedIn ? "My Account" : "Sign In"}
      </div>

      <div className={styles.cart} onClick={toCart}>
        <BsCart3 className={styles.icon} size={22} />
        Cart
        <div className={styles.bubble}>
          <span>{nbrCartItems}</span>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
