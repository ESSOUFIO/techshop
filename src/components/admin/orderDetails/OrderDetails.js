import React from "react";
import { useParams } from "react-router";
import styles from "./OrderDetails.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import Select from "react-select";
import { useRef } from "react";
import ButtonPrimary from "../../buttonPrimary/ButtonPrimary";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const statusRef = useRef();

  const statusOptions = [
    { value: "Order Placed", label: "Order Placed" },
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
  ];

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
  }, [id, refresh]);

  const updateHandler = async () => {
    try {
      setIsLoading(true);
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, {
        status,
      });
      toast.success("Order updated successfully.");
      setRefresh(!refresh);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Undefined Error occurred!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.orderDetails}>
        <h3>Order Details</h3>
        <Link to={"/admin/orders"}>&larr; Back to Orders</Link>
        {order && (
          <div className={styles.content}>
            {
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

            <div className={styles.card}>
              <h5>Update Status</h5>
              <label>Select new Status: </label>
              <Select
                ref={statusRef}
                value={{ value: status, label: status }}
                className={styles.select}
                onChange={(e) => setStatus(e?.value)}
                options={statusOptions}
                placeholder="Choose Brand"
              />
              <ButtonPrimary
                text="Update Order"
                className={styles.btn}
                disabled={status === ""}
                onClick={updateHandler}
              />
            </div>
          </div>
        )}
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default OrderDetails;
