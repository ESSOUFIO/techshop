import React from "react";

const Input = ({ type, placeholder, required, className }) => {
  return (
    <div className="--rounded --light-border">
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
