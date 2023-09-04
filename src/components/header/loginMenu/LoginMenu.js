import React, { useState } from "react";
import SideMenu from "../../sideMenu/SideMenu";
import styles from "./LoginMenu.module.scss";
import { useNavigate } from "react-router-dom";
import Input from "../../input/Input";
import ButtonPrimary from "../../buttonPrimary/ButtonPrimary";
import ButtonSecondary from "../../buttonSecondary/ButtonSecondary";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

const LoginMenu = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success(`Hi ${user.displayName}! Login Successful..`);
        onHide();
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createAccountClicked = () => {
    navigate("/auth/register");
    onHide();
  };

  const resetPassClicked = () => {
    navigate("/auth/reset");
    onHide();
  };

  return (
    <>
      <SideMenu show={show} onHide={onHide} position={"right"} title={"Login"}>
        <div className={styles.loginMenu}>
          <form onSubmit={loginHandler}>
            <label>
              Email Address <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              type={"email"}
              placeholder={"Email Address"}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              type={"password"}
              placeholder={"Password"}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonPrimary text={"Log In"} type={"submit"} />
          </form>

          <p onClick={resetPassClicked}>Forgot your password?</p>
          <ButtonSecondary
            text={"Create Account"}
            onClick={createAccountClicked}
          />
        </div>
      </SideMenu>

      {/* {loading && <Loader />} */}
    </>
  );
};

export default LoginMenu;
