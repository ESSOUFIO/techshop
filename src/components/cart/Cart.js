import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import QuantityHandler from "../quantityHandler/QuantityHandler";
import cartItems from "../../cartItems.json";
import { BiSolidCheckShield } from "react-icons/bi";
import trustImg from "../../assets/images/trust-banner.webp";

const CartItem = ({ title, photo, price, qty, brand }) => {
  const [quantity, setQuantity] = useState(Number(qty));
  const [total, setTotal] = useState(2);

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
        <div className={styles.cartItems}>
          <div className={styles["cart-header"]}>
            <div className={styles["cart-header-info"]}>PRODUCT</div>
            <div className={styles["cart-header-price"]}>PRICE</div>
            <div className={styles["cart-header-quantity"]}>QUANTITY</div>
            <div className={styles["cart-header-total"]}>TOTAL</div>
            <div className={styles["cart-header-action"]}></div>
          </div>

          {cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                title={item.title}
                photo={item.image_1}
                price={item.price}
                qty={item.quantity}
                brand={item.brand}
              />
            );
          })}

          {/* Additional comment */}
          <div className={styles.addComment}>
            <h6>Additional Comments</h6>
            <textarea
              //   cols="30"
              rows="5"
              placeholder="Special instruction for seller..."
            ></textarea>
          </div>

          {/* trust banner*/}
          <div className={styles.trust}>
            <div className={styles.secure}>
              <BiSolidCheckShield size={23} />
              <p>Secure Shopping Guarantee</p>
            </div>
            <img src={trustImg} alt="trust" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
