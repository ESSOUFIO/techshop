import React, { useState } from "react";
import styles from "./MyAccountMenu.module.scss";
import SideMenu from "../../sideMenu/SideMenu";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loader from "../../loader/Loader";

const MyAccountMenu = ({ show, onHide, userName }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully..");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
        onHide();
      });
  };

  const myOrders = () => {
    navigate("/my-orders");
    onHide();
  };

  const myAddress = () => {
    navigate("/my-address");
    onHide();
  };

  const myWishList = () => {
    navigate("wish-list");
    onHide();
  };

  const myAccount = () => {
    navigate("my-account");
    onHide();
  };
  return (
    <>
      <SideMenu
        show={show}
        onHide={onHide}
        position={"right"}
        title={`Hi ${userName},`}
      >
        <div className={styles.myAccount}>
          <ul>
            <li onClick={myAccount}>My Account Informations</li>
            <li onClick={myOrders}>My Orders</li>
            <li onClick={myAddress}>My Addresses</li>
            <li onClick={myWishList}>My Wish List</li>
            <li onClick={logoutHandler}>Log Out</li>
          </ul>
        </div>
      </SideMenu>
      {loading && <Loader />}
    </>
  );
};

export default MyAccountMenu;
