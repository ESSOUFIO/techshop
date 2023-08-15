import React, { useState } from "react";
import styles from "./auth.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import loginImg from "../../assets/images/login/login-edited.png";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/buttonSecondary/ButtonSecondary";

// firebase
import { auth } from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <BreadCrumb page1={"Login"} />
      <div className={styles.auth}>
        <div className={styles.img}>
          <img src={loginImg} alt="register" />
        </div>
        <div className={styles.card}>
          <h2>Login</h2>
          <form onSubmit={loginHandler}>
            <Input type="email" placeholder="Email Address" required={true} />
            <Input type="password" placeholder="Password" required={true} />
            <ButtonPrimary text={"Login"} type={"submit"} />
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
