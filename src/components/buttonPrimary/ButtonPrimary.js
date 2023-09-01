import React from "react";
import styles from "./ButtonPrimary.module.scss";

const ButtonPrimary = ({ text, type, onClick, disabled, className, style }) => {
  return (
    <button
      className={`--btn ${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
