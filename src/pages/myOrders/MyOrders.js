import React, { useState } from "react";
import styles from "./MyOrders.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { selectUserID } from "../../redux/authSlice";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);

  useEffect(() => {
    const getMyOrders = async () => {
      setIsLoading(true);
      const q = query(collection(db, "orders"), where("userID", "==", userID));
      const querySnapshot = await getDocs(q);
      let array = [];
      querySnapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      setMyOrders(array);
      setIsLoading(false);
    };
    getMyOrders();
  }, [userID]);

  return (
    <>
      <div className={`--container ${styles.orderList}`}>
        <h2>Orders List</h2>
        <p>
          Open an order to Change <b>Order Status</b>
        </p>

        {myOrders.length === 0 ? (
          <p>-- No orders founds --</p>
        ) : (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th className={styles.mobileItems}>Order</th>
                  <th className={styles.largItems}>Order ID</th>
                  <th className={styles.largItems}>Amount</th>
                  <th className={styles.largItems}>Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order, index) => {
                  return (
                    <tr
                      key={order.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/my-order/details/${order.id}`)}
                    >
                      <td>{index + 1}</td>
                      <td className={styles.largItems}>
                        {order.orderDate + " at " + order.orderTime}
                      </td>
                      <td className={styles.largItems}>{order.id}</td>
                      <td className={styles.largItems}>
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className={styles.mobileItems}>
                        <div>
                          <b>Order ID: </b>
                          {order.id}
                        </div>
                        <div>
                          <b>Date: </b>
                          {order.orderDate + " at " + order.orderTime}
                        </div>
                        <div>
                          <b>Amount: </b>${order.amount.toFixed(2)}
                        </div>
                      </td>
                      <td
                        className={`${styles.status} ${
                          order.status === "Delivered" ? styles.delivered : ""
                        } `}
                        style={{
                          color: ``,
                        }}
                      >
                        {order.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default MyOrders;
