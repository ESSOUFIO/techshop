import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  type,
  placeholder,
  required,
  name,
  value,
  className,
  onChange,
}) => {
  return (
    <div className={`--rounded --light-border ${styles.input} ${className}`}>
      <input
        className={`--input-theme `}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
