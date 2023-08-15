import React from "react";
import styles from "./ButtonPrimary.module.scss";

const ButtonPrimary = ({ text, type, onClick, disabled, className }) => {
  return (
    <div className={className}>
      <button
        className={`--btn ${styles.button}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonPrimary;
