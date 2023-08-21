import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import styles from "./BackHome.module.scss";
import { Link } from "react-router-dom";

const BackHomeBtn = () => {
  return (
    <div className={styles.backHome}>
      <Link to={"/"}>
        <IoHomeOutline size={17} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default BackHomeBtn;
