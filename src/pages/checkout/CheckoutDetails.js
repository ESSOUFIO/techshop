import React from "react";
import { useSelector } from "react-redux";
import { selectTotalAmount, selectTotalQuantity } from "../../redux/cartSlice";
import styles from "./CheckoutDetails.module.scss";

const CheckoutDetails = () => {
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);
  return (
    <div className={styles.checkoutDetails}>
      <h2>Checkout Details</h2>
      <div className={styles.container}>
        <div className={styles.card}>
          <h4>Shipping Address</h4>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
