import React from "react";
import styles from "./auth.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import resetImg from "../../assets/images/login/password-edited.png";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const resetHandler = () => {};
  return (
    <>
      <BreadCrumb page1={"Reset"} />
      <div className={styles.auth}>
        <div className={styles.card}>
          <h2>Reset Password</h2>
          <form onSubmit={resetHandler}>
            <Input type="email" placeholder="Email Address" required={true} />
            <ButtonPrimary text={"Reset Password"} type={"submit"} />
          </form>
          <div className={styles.links}>
            <Link to={"/auth/register"}>Register</Link>
            <Link to={"/auth/login"}>Login</Link>
          </div>
        </div>
        <div className={styles.img}>
          <img src={resetImg} alt="reset" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
