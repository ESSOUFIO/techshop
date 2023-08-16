import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";

import { BiSolidCheckShield } from "react-icons/bi";
import trustImg from "../../assets/images/trust-banner.webp";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import cartItems from "../../cartItems.json";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/buttonSecondary/ButtonSecondary";
import QuantityHandler from "../../components/quantityHandler/QuantityHandler";

const CartItem = ({ title, photo, price, qty, brand }) => {
  const [quantity, setQuantity] = useState(Number(qty));
  const [total, setTotal] = useState(2);

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  return (
    <div className={styles["cart-list"]}>
      <div className={styles["cart-list-info"]}>
        <div className={styles.img}>
          <img src={photo} alt={title} />
        </div>

        <div className={styles["product-info-wrap"]}>
          <div className={styles["product-info"]}>
            <h6>{title}</h6>
            <p>{brand}</p>
          </div>
          <div className={styles["product-info-mobile"]}>
            <div className={styles["cart-list-price"]}>${price}</div>
            <div className={styles["cart-list-quantity-wrap"]}>
              <div className={styles["cart-list-quantity"]}>
                <QuantityHandler
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
              <div className={styles["cart-list-action"]}>
                <IoCloseOutline size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["cart-list-price-wrap"]}>
        <div className={styles["cart-list-price"]}>${price}</div>
        <div className={styles["cart-list-quantity"]}>
          <QuantityHandler quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className={styles["cart-list-total"]}>${total.toFixed(2)}</div>
        <div className={styles["cart-list-action"]}>
          <IoCloseOutline size={22} />
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [termCheck, setTermCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var total = 0;
    cartItems?.forEach((item) => {
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

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
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

          {/* Order Summary  */}
          <div className={styles.orderSummary}>
            <div className={styles.orderWrap}>
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
                <div className={styles.countries}>
                  <select>
                    <option>United State</option>
                    <option>Canada</option>
                  </select>
                </div>
                <Input placeholder={"Postal Code"} />
                <ButtonPrimary text={"CALCULATE SHIPPING"} />
              </div>

              {/*Coupon code  */}
              <div className={styles.coupon}>
                <label>
                  <b>Coupon Code</b>
                </label>
                <Input placeholder={"Enter Coupon Code"} />
                <p>Coupon code will be applied on the checkout page</p>
              </div>

              {/* Total */}
              <div className={styles.total}>
                <label>
                  <b>Total</b>
                </label>
                <p>${total.toFixed(2)}</p>
              </div>
              <p>Tax included and shipping calculated at checkout</p>
            </div>

            {/** Checkout */}
            <div className={styles.checkout}>
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
                <ButtonPrimary
                  text={"PROCEED TO CHECKOUT"}
                  type={"submit"}
                  disabled={!termCheck}
                />
                <ButtonSecondary
                  text={"CONTINUE SHOPPING"}
                  onClick={() => navigate("/")}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
