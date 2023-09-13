import React from "react";
import styles from "./Contact.module.scss";
import { useState } from "react";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { FaPhone, FaLocationDot, FaTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import Input from "../../components/input/Input";
const initForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initForm);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`--container ${styles.contact}`}>
      <h2>Contact Us</h2>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <form onSubmit={submitHandler}>
            <label>Name: </label>
            <Input
              type="text"
              name="name"
              onChange={inputHandler}
              required={true}
            />

            <label>Email: </label>
            <Input
              type="email"
              name="email"
              onChange={inputHandler}
              required={true}
            />

            <label>Subject: </label>
            <Input
              type="text"
              name="subject"
              onChange={inputHandler}
              required={true}
            />

            <label>Message: </label>
            <textarea
              rows="10"
              name="message"
              onChange={inputHandler}
              required={true}
            />

            <div style={{ display: "flex", justifyContent: "right" }}>
              <ButtonPrimary
                text={"Send Message"}
                style={{ width: "180px" }}
                type={"submit"}
              />
            </div>
          </form>
        </div>

        <div className={styles.info}>
          <h5>Our Contact Informations</h5>
          <p>Fill the form or contact us via other channels listed bellow</p>
          <div className={styles.icon}>
            <FaPhone size={16} color="#fff" />
            <span>(00 216)695 985 69</span>
          </div>

          <div className={styles.icon}>
            <IoMail size={16} color="#fff" />
            <span>omar.essoufi@gmail.com</span>
          </div>

          <div className={styles.icon}>
            <FaLocationDot size={16} color="#fff" />
            <span>Ariana, Tunisia</span>
          </div>

          <div className={styles.icon}>
            <FaTwitter size={16} color="#fff" />
            <span>@Omar__ESSOUFI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
