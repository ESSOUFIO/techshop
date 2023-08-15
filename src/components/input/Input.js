import React from "react";
import styles from "./Input.module.scss";

const Input = ({ type, placeholder, required, className }) => {
  return (
    <div className={`--rounded --light-border ${styles.input}`}>
      <input
        className={`--input-theme ${className}`}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
