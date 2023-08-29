import React from "react";
import { useParams } from "react-router";
import styles from "./MyOrderDetails.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const MyOrderDetails = () => {
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

  return (
    <>
      <div className={`--container ${styles.orderDetails}`}>
        <h3>Order Details</h3>
        <Link to={"/my-orders"}>&larr; Back to Orders</Link>
        {order && (
          <div className={styles.content}>
            {
              <div className={styles.orderInfo}>
                <p>
                  <b>Order ID: </b>
                  <span>{order.id}</span>
                </p>
                <p>
                  <b>Order Status: </b>
                  <span>{order.status}</span>
                </p>
                <p>
                  <b>Order Date: </b>
                  <span>{order.orderDate + " at " + order?.orderTime}</span>
                </p>
                <p>
                  <b>Amount: </b>
                  <span>${order.amount.toFixed(2)}</span>
                </p>
                <div>
                  <b>Shipping: </b>
                  <p>
                    Address:{" "}
                    <span>
                      {order.shipping.line1}, {order.shipping.line2},{" "}
                      {order.shipping.postal_code}
                    </span>
                  </p>
                  <p>
                    State: <span>{order.shipping.state}</span>
                  </p>
                  <p>
                    Country: <span>{order.shipping.country}</span>
                  </p>
                </div>
              </div>
            }

            {order.orderItems === [] ? (
              <p>No categories founds.</p>
            ) : (
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <p>{item.name}</p>
                            <img src={item.image} alt={item.name} width={100} />
                          </td>
                          <td>${item.newPrice.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.newPrice * item.quantity).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default MyOrderDetails;
