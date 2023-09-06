import React from "react";
import styles from "./MyAddress.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import Input from "../../components/input/Input";
import { ReactCountryDropdown } from "react-country-dropdown";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";
import { SAVE_SHIPPING_ADDRESS } from "../../redux/checkoutSlice";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/images/loader/Spinner.png";

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

const MyAddress = () => {
  const [shippingAddress, setShippingAddress] = useState(shippingInit);
  const [showForm, setShowForm] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const uid = useSelector(selectUserID);
  const dispatch = useDispatch();
  const user = useFetchDocument("users", uid);

  useEffect(() => {
    if (user.data) {
      if (user.data.address !== "") {
        setShippingAddress(user.data.address);
        setShowAddress(true);
        setShowForm(false);
      } else {
        setShowAddress(false);
        setShowForm(true);
      }
    }
  }, [uid, user.data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (shippingAddress.country.name === "") {
      setShippingAddress({
        ...shippingAddress,
        country: { name: "United States", code: "US" },
      });
    }
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      address: shippingAddress,
    });
    setShowForm(false);
    setShowAddress(true);
    toast.success("Your Address is saved successfully.");

    //scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleInput = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const updateHandler = () => {
    setShowForm(true);
  };

  //scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={`--container ${styles.myAddress}`}>
      <h2>My Shipping Address</h2>
      {user.isLoading ? (
        <div>
          <img src={spinner} alt="Loading.." width={100} />
        </div>
      ) : (
        <div className={styles.content}>
          {showAddress && (
            <div className={styles.defaultAddress}>
              <p>Your default shipping address is:</p>
              <div className={styles.card}>
                <table>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <b>Name</b>
                      </th>
                      <td>{shippingAddress.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Address</b>
                      </th>
                      <td>
                        {shippingAddress.line1 + ", " + shippingAddress.line2}

                        <br />
                        {shippingAddress.postal_code +
                          ", " +
                          shippingAddress.city}

                        <br />
                        {shippingAddress.state}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Country</b>
                      </th>
                      <td>{shippingAddress.country.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Phone</b>
                      </th>
                      <td>{shippingAddress.phone}</td>
                    </tr>
                  </tbody>
                </table>
                <div className={styles.btnUpdate}>
                  <ButtonPrimary
                    text={"Update Address"}
                    onClick={updateHandler}
                    style={{ maxWidth: "180px", padding: "7px" }}
                  />
                </div>
              </div>
            </div>
          )}
          {showForm && (
            <div className={styles.newAddress}>
              <p>Save your default shipping address:</p>
              <form onSubmit={submitHandler}>
                <div className={styles.card}>
                  <label>Recipient Name</label>
                  <Input
                    type="text"
                    placeholder="Recipient Name"
                    required
                    name="name"
                    value={shippingAddress.name}
                    onChange={(e) => handleInput(e)}
                    className={styles.input}
                  />
                  <label>Address Line 1</label>
                  <Input
                    type="text"
                    placeholder="Address Line 1"
                    required
                    name="line1"
                    value={shippingAddress.line1}
                    onChange={(e) => handleInput(e)}
                    className={styles.input}
                  />
                  <label>Address Line 2</label>
                  <Input
                    type="text"
                    placeholder="Address Line 2"
                    name="line2"
                    value={shippingAddress.line2}
                    onChange={(e) => handleInput(e)}
                    className={styles.input}
                  />
                  <label>City</label>
                  <Input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleInput(e)}
                    className={styles.input}
                  />
                  <label>State</label>
                  <Input
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    value={shippingAddress.state}
                    onChange={(e) => handleInput(e)}
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
                    onChange={(e) => handleInput(e)}
                  />
                  {/* Country Input */}
                  <label>Country</label>
                  <div
                    className="--rounded --light-border"
                    style={{ padding: "5px 10px", marginTop: "5px" }}
                  >
                    {/* <CountryDropdown
                    className={styles.select}
                    valueType="short"
                    value={shippingAddress.country.name}
                    onChange={(val) =>
                      handleInput({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                  /> */}
                    <ReactCountryDropdown
                      onSelect={(val) =>
                        handleInput({
                          target: {
                            name: "country",
                            value: { name: val.name, code: val.code },
                          },
                        })
                      }
                      countryCode={shippingAddress?.country.code}
                    />
                  </div>
                  <label>Phone</label>
                  <Input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => handleInput(e)}
                    className={styles.input}
                  />
                  <ButtonPrimary text={"Save Address"} />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAddress;
