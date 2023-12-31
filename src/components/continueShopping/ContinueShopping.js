import React from "react";
import styles from "./ContinueShopping.module.scss";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const ContinueShopping = () => {
  return (
    <div className={styles.continueShopping}>
      <Link to={"/"}>
        <IoIosArrowBack size={17} />
        <span>Continue Shopping</span>
      </Link>
    </div>
  );
};

export default ContinueShopping;
