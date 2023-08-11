import React, { useEffect, useRef, useState } from "react";
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
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [termCheck, setTermCheck] = useState(false);
  const checkTerm = useRef();

  useEffect(() => {
    var total = 0;
    cartItems.forEach((item) => {
      total += Number(item.quantity * item.price);
    });
    setSubTotal(total);
  }, []);

  useEffect(() => {
    setTotal(subTotal);
  }, [subTotal]);

  const checkoutHandler = (e) => {
    e.preventDefault();
    console.log(termCheck);
  };
  return (
    <>
      <BreadCrumb page1={"Cart"} />
      <div className={styles.cart}>
        <h2>Your Cart</h2>
        <div className={styles.cartWrap}>
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

          <div className={styles.orderSummary}>
            <h6>ORDER SUMMARY</h6>

            <div className={styles.subTotal}>
              <label>
                <b>Subtotal</b>
              </label>
              <p>${subTotal.toFixed(2)}</p>
            </div>

            {/* Shipping estimate */}
            <div className={styles.shippingEstimate}>
              <label>
                <b>Get Shipping Estimate</b>
              </label>
              <select>
                <option>United State</option>
                <option>Canada</option>
              </select>
              <input type="text" placeholder="Postal Code" />
              <button>CALCULATE SHIPPING</button>
            </div>

            {/*Coupon code  */}
            <div className={styles.coupon}>
              <label>
                <b>Coupon Code</b>
              </label>
              <input type="text" placeholder="Enter Coupon Code" />
              <p>Coupon code will be applied on the checkout page</p>
            </div>

            {/* Total */}
            <div className={styles.total}>
              <label>
                <b>Total</b>
              </label>
              <p>${total.toFixed(2)}</p>
            </div>

            {/** Checkout */}
            <div className={styles.checkout}>
              <p>Tax included and shipping calculated at checkout</p>
              <form onSubmit={checkoutHandler}>
                <input
                  type="checkbox"
                  id="acceptTerm"
                  className="form-check-input"
                  checked={termCheck}
                  onChange={() => setTermCheck(!termCheck)}
                />
                <label htmlFor="acceptTerm">
                  I agree with <a href="/#">Terms & Conditions</a>
                </label>
                <button type="submit" disabled={!termCheck}>
                  PROCEED TO CHECKOUT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
