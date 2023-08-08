import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import products from "../../products.json";
import QuantityHandler from "../quantityHandler/QuantityHandler";

const CartItem = ({ title, photo, price, brand }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  return (
    <div className={styles["cart-list"]}>
      <div className={styles["cart-list-info"]}>
        <img src={photo} alt={title} style={{ width: "100px" }} />
        <div className={styles["product-info"]}>
          <h6>{title}</h6>
          <p>{brand}</p>
        </div>
      </div>
      <div className={styles["cart-list-price"]}>${price}</div>
      <div className={styles["cart-list-quantity"]}>
        <QuantityHandler quantity={quantity} setQuantity={setQuantity} />
      </div>
      <div className={styles["cart-list-total"]}>${total.toFixed(2)}</div>
      <div className={styles["cart-list-action"]}></div>
    </div>
  );
};

const Cart = () => {
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

        <CartItem
          title={products[1].title}
          photo={products[1].image_1}
          price={products[1].price}
          brand={products[1].brand}
        />
      </div>
    </>
  );
};

export default Cart;
