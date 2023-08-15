import React from "react";
import styles from "./MyAccountMenu.module.scss";
import SideMenu from "../../sideMenu/SideMenu";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const MyAccountMenu = ({ show, onHide, userName }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully..");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => onHide());
  };
  return (
    <SideMenu
      show={show}
      onHide={onHide}
      position={"right"}
      title={`Hi ${userName},`}
    >
      <div className={styles.myAccount}>
        <ul>
          <li>My Account Informations</li>
          <li>My Orders</li>
          <li>My Addresses</li>
          <li onClick={() => logoutHandler()}>Log Out</li>
        </ul>
      </div>
    </SideMenu>
  );
};

export default MyAccountMenu;
