import React, { useState } from "react";
import styles from "./Cart.module.scss";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import products from "../../products.json";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <BreadCrumb page1={"Cart"} />
      <div className={styles.cart}>
        <h2>Your Cart</h2>
        <div className={styles["cart-header"]}>
          <div className={styles["cart-header-info"]}>PRODUCT</div>
          <div className={styles["cart-header-price"]}>PRICE</div>
          <div className={styles["cart-header-quantity"]}>QUANTITY</div>
          <div className={styles["cart-header-total"]}>TOTAL</div>
          <div className={styles["cart-header-action"]}></div>
        </div>

        <div className={styles["cart-list"]}>
          <div className={styles["cart-list-info"]}>
            <img
              src={products[1].image_1}
              alt={products[1].title}
              style={{ width: "100px" }}
            />
            <div className={styles["product-info"]}>{products[1].title}</div>
          </div>
          <div className={styles["cart-list-price"]}>${products[1].price}</div>
          <div className={styles["cart-list-quantity"]}>{quantity}</div>
          <div className={styles["cart-list-total"]}>TOTAL</div>
          <div className={styles["cart-list-action"]}></div>
        </div>
      </div>
    </>
  );
};

export default Cart;
