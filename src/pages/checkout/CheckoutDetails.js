import React, { useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import { ReactCountryDropdown } from "react-country-dropdown";
import "react-country-dropdown/dist/index.css";

import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/checkoutSlice";
import { useEffect } from "react";
import { selectUserID } from "../../redux/authSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useFetchDocument from "../../customHooks/useFetchDocument";

const shippingInit = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: {
    name: "",
    code: "",
  },
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState(shippingInit);
  const [billingAddress, setBillingAddress] = useState(shippingInit);
  const [sameAddress, setSameAddress] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState(true);
  const [saveDefaultAddress, setSaveDefaultAddress] = useState(true);
  const [myAddress, setMyAddress] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector(selectUserID);

  const handleShipping = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const user = useFetchDocument("users", uid);

  const handleBilling = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  const updateUserAddress = async (shippingAddress) => {
    const userRef = doc(db, "users", uid);
    console.log(uid, shippingAddress);

    await updateDoc(userRef, {
      address: shippingAddress,
    });

    navigate("/checkout");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    if (saveDefaultAddress && !defaultAddress) {
      updateUserAddress(shippingAddress);
    }
  };

  const handleCheckAddress = () => {
    if (sameAddress) {
      setBillingAddress(shippingInit);
    } else {
      setBillingAddress(shippingAddress);
    }
    setSameAddress(!sameAddress);
  };

  const handleCheckSaveDefaultAddress = () => {
    setSaveDefaultAddress(!saveDefaultAddress);
  };

  const handleCheckDefaultAddress = () => {
    setDefaultAddress(!defaultAddress);
  };

  useEffect(() => {
    if (defaultAddress && myAddress) setShippingAddress(myAddress);
    if (!defaultAddress) setShippingAddress(shippingInit);
  }, [defaultAddress, myAddress]);

  useEffect(() => {
    if (user.data) setMyAddress(user.data.address);
  }, [user, uid]);

  //scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={`--container ${styles.checkoutDetails}`}>
      <h2>Checkout Details</h2>
      <form onSubmit={submitHandler}>
        <div className={styles.container}>
          <div className={styles.address}>
            {/* My Address */}
            {myAddress && (
              <div className={styles.card}>
                <h4>Shipping Address</h4>
                <input
                  type="checkbox"
                  onChange={handleCheckDefaultAddress}
                  checked={defaultAddress}
                  id="default-address"
                />
                <label
                  style={{ marginBottom: "10px" }}
                  htmlFor="default-address"
                >
                  I'd choose my default Shipping Address
                </label>

                <table>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <b>Name</b>
                      </th>
                      <td>{myAddress.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Address</b>
                      </th>
                      <td>
                        {myAddress.line1 + ", " + myAddress.line2}

                        <br />
                        {myAddress.postal_code + ", " + myAddress.city}

                        <br />
                        {myAddress.state}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Country</b>
                      </th>
                      <td>{myAddress.country.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Phone</b>
                      </th>
                      <td>{myAddress.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {!defaultAddress && (
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
                  <ReactCountryDropdown
                    onSelect={(val) =>
                      handleShipping({
                        target: {
                          name: "country",
                          value: { name: val.name, code: val.code },
                        },
                      })
                    }
                    countryCode={shippingAddress.country.code}
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
                <input
                  type="checkbox"
                  onChange={handleCheckSaveDefaultAddress}
                  checked={saveDefaultAddress}
                  id="save-default-address"
                />
                <label
                  style={{ marginBottom: "10px" }}
                  htmlFor="save-default-address"
                >
                  Set as my default address.
                </label>
              </div>
            )}

            {/* Billing Address */}
            <div className={styles.card}>
              <h4>Billing Address</h4>

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
                    <ReactCountryDropdown
                      onSelect={(val) =>
                        handleBilling({
                          target: {
                            name: "country",
                            value: { name: val.name, code: val.code },
                          },
                        })
                      }
                      countryCode={billingAddress.country.code}
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
          </div>

          <div style={{ width: "100%" }}>
            <CheckoutSummary />
            <ButtonPrimary type="submit" text={"Proceed To Checkout"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutDetails;
