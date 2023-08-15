import React from "react";
import styles from "./auth.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import loginImg from "../../assets/images/login/login-edited.png";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/buttonSecondary/ButtonSecondary";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <BreadCrumb page1={"Login"} />
      <div className={styles.auth}>
        <div className={styles.img}>
          <img src={loginImg} alt="register" />
        </div>
        <div className={styles.card}>
          <h2>Login</h2>
          <form>
            <Input type="email" placeholder="Email Address" required={true} />
            <Input type="password" placeholder="Password" required={true} />
            <ButtonPrimary text={"Login"} />
          </form>
          <Link to={"/auth/reset"}>Forgot your password?</Link>
          <ButtonSecondary
            text={"Create Account"}
            onClick={() => navigate("/auth/register")}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
