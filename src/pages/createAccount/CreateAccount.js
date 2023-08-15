import React from "react";
import styles from "./CreateAccount.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";

const CreateAccount = () => {
  return (
    <>
      <BreadCrumb page1={"Register"} />
      <div className={styles.createAccount}>
        <div className={styles.card}>
          <h2>Create Account</h2>
          <p>Please register below to create an account</p>
          <form>
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name." />
            <input type="email" placeholder="Email Address" required />
            <input type="password" placeholder="Password" required />
            <input type="checkbox" id="emailMarketing" />
            <label htmlFor="emailMarketing">Subscribe To Email Marketing</label>
            <button>Create An Account</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
