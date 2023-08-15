import React from "react";
import styles from "./CreateAccount.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import registerImg from "../../assets/images/login/login-cuate-edited.png";

const CreateAccount = () => {
  return (
    <>
      <BreadCrumb page1={"Register"} />
      <div className={styles.createAccount}>
        <div className={styles.img}>
          <img src={registerImg} alt="register" />
        </div>
        <div className={styles.card}>
          <h2>Create Account</h2>
          <p>Please register below to create an account</p>
          <form>
            <Input type="text" placeholder="First Name" required={true} />
            <Input type="text" placeholder="Last Name." />
            <Input type="email" placeholder="Email Address" required={true} />
            <Input type="password" placeholder="Password" required={true} />
            <div className={styles.marketing}>
              <input
                className="form-check-input"
                type="checkbox"
                id="emailMarketing"
              />
              <label htmlFor="emailMarketing">
                Subscribe To Email Marketing
              </label>
            </div>

            <ButtonPrimary text={"Create An Account"} />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
