import React from "react";
import styles from "./ButtonPrimary.module.scss";

const ButtonPrimary = ({ text, type, onClick, disabled, className }) => {
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

export default ButtonPrimary;
