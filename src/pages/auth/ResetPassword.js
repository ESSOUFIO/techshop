import React, { useState } from "react";
import styles from "./auth.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import resetImg from "../../assets/images/login/password-edited.png";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const resetHandler = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        navigate("/auth/login");
      })
      .catch((error) => {
        toast.error("error.message");
        // ..
      });
  };
  return (
    <>
      <BreadCrumb page1={"Reset"} />
      <div className={styles.auth}>
        <div className={styles.card}>
          <h2>Reset Password</h2>
          <form onSubmit={resetHandler}>
            <Input
              type="email"
              placeholder="Email Address"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
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
