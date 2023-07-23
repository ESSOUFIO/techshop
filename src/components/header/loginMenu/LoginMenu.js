import React from "react";
import SideMenu from "../../sideMenu/SideMenu";
import styles from "./LoginMenu.module.scss";
import { Link } from "react-router-dom";

const LoginMenu = ({ show, onHide, position, title }) => {
  return (
    <SideMenu show={show} onHide={onHide} position={position} title={title}>
      <div className={styles.loginMenu}>
        <form>
          <label>
            Email Address <span style={{ color: "red" }}>*</span>
          </label>
          <div className="--rounded --light-border">
            <input
              className="--input-theme"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          <label>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <div className="--rounded --light-border">
            <input
              className="--input-theme"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="--btn" type="submit">
            Log In
          </button>
        </form>
        <Link to={"/"}>Forgot your password?</Link>
        <button className="--btn">Create Account</button>
      </div>
    </SideMenu>
  );
};

export default LoginMenu;
