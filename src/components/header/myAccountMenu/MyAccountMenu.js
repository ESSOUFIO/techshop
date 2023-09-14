import React, { useState } from "react";
import styles from "./MyAccountMenu.module.scss";
import SideMenu from "../../sideMenu/SideMenu";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loader from "../../loader/Loader";
import { FaHouseUser } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { LuFileHeart } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import OnlyAdmin from "../../onlyAdmin/OnlyAdmin";

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

  const toAdminDashboard = () => {
    navigate("/admin/dashboard");
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
            <OnlyAdmin>
              <li onClick={toAdminDashboard}>
                <MdOutlineAdminPanelSettings size={25} />
                <span>
                  <b>ADMIN DASHBOARD</b>
                </span>
              </li>
            </OnlyAdmin>

            <li onClick={myAccount}>
              <FaHouseUser size={20} />
              <span>My Account Informations</span>
            </li>
            <li onClick={myOrders}>
              <TbReportMoney size={20} />
              <span>My Orders</span>
            </li>
            <li onClick={myAddress}>
              <IoLocationSharp size={20} /> <span>My Addresses</span>
            </li>
            <li onClick={myWishList}>
              <LuFileHeart size={20} />
              <span>My Wish List</span>
            </li>
            <li onClick={logoutHandler}>
              <BiLogOutCircle size={20} />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      </SideMenu>
      {loading && <Loader />}
    </>
  );
};

export default MyAccountMenu;
