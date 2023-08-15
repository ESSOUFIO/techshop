import React from "react";
import SideMenu from "../../sideMenu/SideMenu";
import styles from "./LoginMenu.module.scss";
import { useNavigate } from "react-router-dom";
import Input from "../../input/Input";
import ButtonPrimary from "../../buttonPrimary/ButtonPrimary";
import ButtonSecondary from "../../buttonSecondary/ButtonSecondary";

const LoginMenu = ({ show, onHide, position, title }) => {
  const navigate = useNavigate();

  const createAccountClicked = () => {
    navigate("/account/register");
    onHide();
  };

  const resetPassClicked = () => {
    navigate("/account/reset");
    onHide();
  };

  return (
    <SideMenu show={show} onHide={onHide} position={position} title={title}>
      <div className={styles.loginMenu}>
        <form>
          <label>
            Email Address <span style={{ color: "red" }}>*</span>
          </label>
          <Input type={"email"} placeholder={"Email Address"} required={true} />

          <label>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <Input type={"password"} placeholder={"Password"} required={true} />
          <ButtonPrimary text={"Log In"} type={"submit"} />
        </form>

        <p onClick={resetPassClicked}>Forgot your password?</p>
        <ButtonSecondary
          text={"Create Account"}
          onClick={createAccountClicked}
        />
      </div>
    </SideMenu>
  );
};

export default LoginMenu;
