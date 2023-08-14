import React from "react";
import styles from "./QuantityHandler.module.scss";

const QuantityHandler = ({ quantity, setQuantity }) => {
  const incrementQty = () => {
    setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity >= 2) setQuantity(quantity - 1);
  };
  return (
    <div className={styles.quantityHandler}>
      <button onClick={incrementQty}>+</button>
      <label>{quantity}</label>
      <button onClick={decrementQty}>-</button>
    </div>
  );
};

export default QuantityHandler;
