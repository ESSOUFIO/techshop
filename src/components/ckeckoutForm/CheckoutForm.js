import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import styles from "./CheckoutForm.module.scss";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART, selectTotalAmount } from "../../redux/cartSlice";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const totalAmount = useSelector(selectTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000",
        },
        redirect: "if_required",
      })
      .then((result) => {
        // if (result.error) {
        //   toast.error(result.error.message);
        //   setMessage(result.error.message);
        //   return;
        // }

        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment Successful.");
          try {
            saveOrder();
            dispatch(CLEAR_CART());
            navigate("/checkout-success");
          } catch (error) {
            toast.error(error);
          }
        }
      })
      .finally(() => setIsLoading(false));

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    //   toast.success(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    //   toast.success("An unexpected error occurred.");
    // }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const saveOrder = async () => {
    const newOrder = {
      createdAt: Timestamp.now().toDate(),
      status: "Order Placed",
      amount: totalAmount,
    };
    await addDoc(collection(db, "orders"), newOrder);
  };

  return (
    <section className={`--container ${styles.checkoutWrap}`}>
      <h3>Checkout</h3>
      <div className={styles.checkout}>
        <CheckoutSummary />
        <div className={styles.card}>
          <h4>Stripe Checkout</h4>
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner">
                    Processing...
                  </div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
