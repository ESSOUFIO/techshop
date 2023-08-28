import React from "react";
import styles from "./ButtonSecondary.module.scss";

const ButtonSecondary = ({ text, type, onClick, disabled, className }) => {
  return (
    <button
      className={`--btn ${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
