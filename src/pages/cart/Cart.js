import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";

import { BiSolidCheckShield } from "react-icons/bi";
import trustImg from "../../assets/images/trust-banner.webp";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/buttonSecondary/ButtonSecondary";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_ITEM,
  selectCartItems,
} from "../../redux/cartSlice";
import ContinueShopping from "../../components/continueShopping/ContinueShopping";
import FormatPrice from "../../components/formatPrice/FormatPrice";

const CartItem = ({ id, name, image, price, quantity, brand }) => {
  const [total, setTotal] = useState(2);

  console.log(typeof price);

  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  const incrementQty = () => {
    dispatch(INCREASE_QTY(id));
  };

  const removeHandler = () => {
    dispatch(REMOVE_ITEM(id));
  };

  const decrementQty = () => {
    if (quantity !== 1) dispatch(DECREASE_QTY(id));
  };

  return (
    <div className={styles["cart-list"]}>
      <div className={styles["cart-list-info"]}>
        <div className={styles.img}>
          <img src={image} alt={name} />
        </div>

        <div className={styles["product-info-wrap"]}>
          <div className={styles["product-info"]}>
            <h6>{name}</h6>
            <p>{brand}</p>
          </div>
          <div className={styles["product-info-mobile"]}>
            <div className={styles["cart-list-price"]}>${price}</div>
            <div className={styles["cart-list-quantity-wrap"]}>
              <div className={styles["cart-list-quantity"]}>
                <div className={styles.quantityHandler}>
                  <button onClick={incrementQty}>+</button>
                  <label>{quantity}</label>
                  <button onClick={decrementQty}>-</button>
                </div>
              </div>
              <div
                className={styles["cart-list-action"]}
                onClick={removeHandler}
              >
                <IoCloseOutline size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["cart-list-price-wrap"]}>
        <div className={styles["cart-list-price"]}>
          ${Number(price).toFixed(2)}
        </div>
        <div className={styles["cart-list-quantity"]}>
          <div className={styles.quantityHandler}>
            <button onClick={incrementQty}>+</button>
            <label>{quantity}</label>
            <button onClick={decrementQty}>-</button>
          </div>
        </div>
        <div className={styles["cart-list-total"]}>
          ${Number(total).toFixed(2)}
        </div>
        <div className={styles["cart-list-action"]} onClick={removeHandler}>
          <IoCloseOutline size={22} />
        </div>
      </div>
    </div>
  );
};

/*** ============= Cart ============= */
const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  // const [termCheck, setTermCheck] = useState(false);

  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    let total = 0;
    cartItems?.forEach((item) => {
      total += Number(item.quantity * item.newPrice);
    });
    setSubTotal(total);
  }, [cartItems]);

  useEffect(() => {
    setTotal(subTotal);
  }, [subTotal]);

  const checkoutHandler = (e) => {
    e.preventDefault();
    navigate("/checkout-details");
  };

  useEffect(() => {}, []);

  //Scroll to top
  useEffect(() => {
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
        {cartItems?.length === 0 ? (
          <div>
            <p>Your Cart is currently empty.</p>
            <ContinueShopping />
          </div>
        ) : (
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
                    name={item.name}
                    image={item.image}
                    price={item.newPrice}
                    quantity={item.quantity}
                    brand={item.brand}
                    id={item.id}
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
                  <div style={{ transform: "translateX(-15px)" }}>
                    {<FormatPrice price={total} />}
                  </div>
                </div>

                {/* Shipping estimate */}
                {/* <div className={styles.shippingEstimate}>
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
                </div> */}

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
                  <div style={{ transform: "translateX(-15px)" }}>
                    {<FormatPrice price={total} />}
                  </div>
                </div>
                <p>Tax included and shipping calculated at checkout</p>
              </div>

              {/** Checkout */}
              <div className={styles.checkout}>
                <form onSubmit={checkoutHandler}>
                  {/* <input
                    type="checkbox"
                    id="acceptTerm"
                    className="form-check-input"
                    checked={termCheck}
                    onChange={() => setTermCheck(!termCheck)}
                  />
                  <label htmlFor="acceptTerm">
                    I agree with <a href="/#">Terms & Conditions</a>
                  </label> */}
                  <ButtonPrimary text={"PROCEED TO CHECKOUT"} type={"submit"} />
                  <ButtonSecondary
                    text={"CONTINUE SHOPPING"}
                    onClick={() => navigate("/")}
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
