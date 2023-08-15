import React from "react";
import styles from "./Input.module.scss";

const Input = ({ type, placeholder, required, className, onChange }) => {
  return (
    <div className={`--rounded --light-border ${styles.input}`}>
      <input
        className={`--input-theme ${className}`}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
