import React from "react";
import styles from "./ContinueShopping.module.scss";
import { Link } from "react-router-dom";
import { IoPlayBack } from "react-icons/io5";

const ContinueShopping = () => {
  return (
    <div className={styles.continueShopping}>
      <Link to={"/"}>
        <IoPlayBack size={17} />
        <span>Continue Shopping</span>
      </Link>
    </div>
  );
};

export default ContinueShopping;
