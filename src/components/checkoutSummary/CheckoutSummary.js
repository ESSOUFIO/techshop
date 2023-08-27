import React from "react";
import styles from "./CheckoutSummary.module.scss";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from "../../redux/cartSlice";

const ProductCard = ({ name, quantity, unitPrice, setPrice }) => {
  return (
    <div className={styles.productCard}>
      <h5>{name.substring(0, 30)}...</h5>
      <p>
        Quantity: <span>{quantity}</span>
      </p>
      <p>
        Unit Price: <span>${unitPrice.toFixed(2)}</span>
      </p>
      <p>
        Set Price: <span>${setPrice.toFixed(2)}</span>
      </p>
    </div>
  );
};

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div className={styles.summary}>
      <div className={styles.card}>
        <h4>Checkout Summary</h4>

        <p>
          Cart item (s): <b>{totalQuantity}</b>
        </p>

        <div className={styles.subtotal}>
          <h5>Subtotal:</h5>
          <p>${totalAmount.toFixed(2)}</p>
        </div>

        {cartItems.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}
            quantity={item.quantity}
            unitPrice={item.newPrice}
            setPrice={item.newPrice * item.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutSummary;
