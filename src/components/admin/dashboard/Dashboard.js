import React from "react";
import styles from "./Dashboard.module.scss";
import InfoBox from "../infoBox/InfoBox";
import { TbReportMoney } from "react-icons/tb";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../redux/orderSlice";
import { useEffect } from "react";
import { useState } from "react";
import { selectProducts } from "../../../redux/productSlice";

const Dashboard = () => {
  const [earning, setEarning] = useState(0);
  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);

  useEffect(() => {
    let amount = 0;
    orders.forEach((order) => {
      amount += order.amount;
    });
    setEarning(Math.round(amount));
  }, [orders]);
  return (
    <div className={styles.dashboard}>
      <h5>Dashboard</h5>
      <div className={styles.infoBoxes}>
        <InfoBox
          name={"Earning"}
          value={`$${earning}`}
          color={"#AA1643"}
          icon={<TbReportMoney size={30} color="#AA1643" />}
        />

        <InfoBox
          name={"Orders"}
          value={orders.length}
          color={"#F9BB25"}
          icon={<BsFillCartCheckFill size={30} color="#F9BB25" />}
        />

        <InfoBox
          name={"Products"}
          value={products.length}
          color={"#52AB7D"}
          icon={<FaTags size={30} color="#52AB7D" />}
        />

        <InfoBox
          name={"Customers"}
          value={"250"}
          color={"#1F93FF"}
          icon={<HiUsers size={30} color="#1F93FF" />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
