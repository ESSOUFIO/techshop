import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from "../../redux/cartSlice";
import styles from "./CheckoutDetails.module.scss";
import { CountryDropdown } from "react-country-region-selector";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";

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

const shippingInit = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const billingInit = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState(shippingInit);
  const [billingAddress, setBillingAddress] = useState(billingInit);
  const [sameAddress, setSameAddress] = useState(true);

  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);
  const cartItems = useSelector(selectCartItems);

  const handleShipping = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleBilling = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");

    console.log(shippingAddress, billingAddress);
  };

  const handleCheckAddress = () => {
    if (sameAddress) {
      setBillingAddress(billingInit);
    } else {
      setBillingAddress(shippingAddress);
    }
    setSameAddress(!sameAddress);
  };

  return (
    <div className={styles.checkoutDetails}>
      <h2>Checkout Details</h2>
      <form onSubmit={submitHandler}>
        <div className={styles.container}>
          <div className={styles.address}>
            <div className={styles.card}>
              <h4>Shipping Address</h4>
              <label>Recipient Name</label>
              <Input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
                className={styles.input}
              />
              <label>Address Line 1</label>
              <Input
                type="text"
                placeholder="Address Line 1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
                className={styles.input}
              />
              <label>Address Line 2</label>
              <Input
                type="text"
                placeholder="Address Line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
                className={styles.input}
              />
              <label>City</label>
              <Input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
                className={styles.input}
              />
              <label>State</label>
              <Input
                type="text"
                placeholder="State"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
                className={styles.input}
              />
              <label>Postal Code</label>
              <Input
                type="text"
                placeholder="Postal Code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                className={styles.input}
                onChange={(e) => handleShipping(e)}
              />
              {/* Country Input */}
              <label>Country</label>
              <div
                className="--rounded --light-border"
                style={{ padding: "5px 10px", marginTop: "5px" }}
              >
                <CountryDropdown
                  className={styles.select}
                  valueType="short"
                  value={shippingAddress.country}
                  onChange={(val) =>
                    handleShipping({
                      target: {
                        name: "country",
                        value: val,
                      },
                    })
                  }
                />
              </div>
              <label>Phone</label>
              <Input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
                className={styles.input}
              />
            </div>

            {/* Billing Address */}
            <div className={styles.card}>
              <h3>Billing Address</h3>

              <input
                type="checkbox"
                onChange={handleCheckAddress}
                checked={sameAddress}
                id="same-address"
              />
              <label style={{ marginBottom: "10px" }} htmlFor="same-address">
                My billing address is the same as my shippign address
              </label>
              {!sameAddress && (
                <>
                  <label>Name</label>
                  <Input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={billingAddress.name}
                    className={styles.input}
                    onChange={(e) => handleBilling(e)}
                  />
                  <label>Address Line 1</label>
                  <Input
                    type="text"
                    placeholder="Address Line 1"
                    required
                    name="line1"
                    value={billingAddress.line1}
                    onChange={(e) => handleBilling(e)}
                    className={styles.input}
                  />
                  <label>Address Line 2</label>
                  <Input
                    type="text"
                    placeholder="Address Line 2"
                    name="line2"
                    value={billingAddress.line2}
                    onChange={(e) => handleBilling(e)}
                    className={styles.input}
                  />
                  <label>City</label>
                  <Input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={billingAddress.city}
                    onChange={(e) => handleBilling(e)}
                    className={styles.input}
                  />
                  <label>State</label>
                  <Input
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    value={billingAddress.state}
                    onChange={(e) => handleBilling(e)}
                    className={styles.input}
                  />
                  <label>Postal Code</label>
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    required
                    name="postal_code"
                    value={billingAddress.postal_code}
                    onChange={(e) => handleBilling(e)}
                    className={styles.input}
                  />
                  {/* Country Input */}
                  <label>Country</label>
                  <div
                    className="--rounded --light-border"
                    style={{ padding: "5px 10px", marginTop: "5px" }}
                  >
                    <CountryDropdown
                      className={styles.select}
                      valueType="short"
                      value={billingAddress.country}
                      onChange={(val) =>
                        handleBilling({
                          target: {
                            name: "country",
                            value: val,
                          },
                        })
                      }
                    />
                  </div>
                  <label>Phone</label>
                  <Input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={billingAddress.phone}
                    onChange={(e) => handleBilling(e)}
                    className={styles.input}
                  />
                </>
              )}
            </div>
            <ButtonPrimary type="submit" text={"Proceed To Checkout"} />
          </div>

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
        </div>
      </form>
    </div>
  );
};

export default CheckoutDetails;
