import React from "react";
import { useParams } from "react-router";
import styles from "./OrderDetails.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../../firebase/config";
import Loader from "../../loader/Loader";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      setIsLoading(true);
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({ ...docSnap.data(), id: docSnap.id });
      } else {
        setOrder(null);
      }
      setIsLoading(false);
    };
    getOrder();
  }, [id]);

  console.log(order);

  return (
    <>
      <div className={styles.orderDetails}>
        <h3>Order Details</h3>
        <Link to={"/admin/orders"}>&larr; Back to Orders</Link>
        <div className={styles.orderInfo}>
          <p>
            <b>Order ID: </b>
            {order.id}
          </p>

          <p>
            <b>Order Status: </b>
            {order.status}
          </p>

          <p>
            <b>Order Date: </b>
            {order.orderDate + " at " + order?.orderTime}
          </p>
          <p>
            <b>Amount: </b>${order.amount.toFixed(2)}
          </p>
          <div>
            <b>Shipping: </b>
            <p>
              Address: {order.shipping.line1}, {order.shipping.line2},{" "}
              {order.shipping.postal_code}
            </p>
            <p>State: {order.shipping.state}</p>
            <p>Country: {order.shipping.country}</p>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default OrderDetails;
