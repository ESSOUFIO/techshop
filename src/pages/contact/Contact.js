import styles from "./Contact.module.scss";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { FaPhone, FaLocationDot, FaTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import Input from "../../components/input/Input";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast.success("Your email sent successfully.");
        },
        (error) => {
          toast.error(error.message);
        }
      );
  };
  return (
    <div className={`--container ${styles.contact}`}>
      <h2>Contact Us</h2>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name: </label>
            <Input type="text" name="user_name" required={true} />

            <label>Email: </label>
            <Input type="email" name="user_email" required={true} />

            <label>Subject: </label>
            <Input type="text" name="subject" required={true} />

            <label>Message: </label>
            <textarea rows="10" name="message" required={true} />

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
