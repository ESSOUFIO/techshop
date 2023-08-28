import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/ckeckoutForm/CheckoutForm";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "../../redux/cartSlice";
import { selectEmail } from "../../redux/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/checkoutSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing to checkout... ");

  const cartItems = useSelector(selectCartItems);
  const customerEmail = useSelector(selectEmail);
  const totalAmount = useSelector(selectTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const description = `techshop payment: email: ${customerEmail}, Amount: $${totalAmount}`;

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage(`Failed to initialize checkout: ${error}`);
        toast.error("Something went wrong");
      });
  }, [cartItems, customerEmail, shippingAddress, billingAddress, description]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <section>
      <div className={`--container`}>
        {!clientSecret && <h4>{message}</h4>}
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </section>
  );
};

export default Checkout;
