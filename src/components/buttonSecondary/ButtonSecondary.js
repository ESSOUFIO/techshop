import React from "react";
import styles from "./ButtonSecondary.module.scss";

const ButtonSecondary = ({ text, type, onClick, disabled }) => {
  return (
    <button
      className={`--btn ${styles.button}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
