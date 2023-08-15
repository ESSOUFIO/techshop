import React from "react";
import styles from "./auth.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import resetImg from "../../assets/images/login/password-cuate-edited.png";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";

const ResetPassword = () => {
  return (
    <>
      <BreadCrumb page1={"Reset"} />
      <div className={styles.auth}>
        <div className={styles.card}>
          <h2>Reset Password</h2>
          <form>
            <Input type="email" placeholder="Email Address" required={true} />
            <ButtonPrimary text={"Reset Password"} />
          </form>
        </div>
        <div className={styles.img}>
          <img src={resetImg} alt="reset" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
