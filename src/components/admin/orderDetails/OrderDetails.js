import React from "react";
import { useParams } from "react-router";
import styles from "./OrderDetails.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../../firebase/config";
import Select from "react-select";
import { useRef } from "react";
import ButtonPrimary from "../../buttonPrimary/ButtonPrimary";
import { toast } from "react-toastify";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import spinner from "../../../assets/images/loader/Spinner.png";

const OrderDetails = () => {
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const statusRef = useRef();

  const statusOptions = [
    { value: "Order Placed", label: "Order Placed" },
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
  ];

  const order = useFetchDocument("orders", id);

  const updateHandler = async () => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        status,
      });
      toast.success("Order updated successfully.");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Undefined Error occurred!");
    }
  };

  return (
    <>
      <div className={styles.orderDetails}>
        <h3>Order Details</h3>
        <Link to={"/admin/orders"}>&larr; Back to Orders</Link>

        {order.isLoading ? (
          <div>
            <img src={spinner} alt="Loading.." width={100} />
          </div>
        ) : (
          order.data && (
            <div className={styles.content}>
              <div className={styles.orderInfo}>
                <table>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <b>Order ID</b>
                      </th>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Order Status</b>
                      </th>
                      <td>{order.data.status}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Order Date</b>
                      </th>
                      <td>
                        {order.data.orderDate + " at " + order.data.orderTime}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <b>Amount</b>
                      </th>
                      <td>${order.data.amount.toFixed(2)}</td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <b>Shipping</b>
                      </th>
                      <td>
                        <p>
                          Address: {order.data.shipping.line1},{" "}
                          {order.data.shipping.line2},{" "}
                          {order.data.shipping.postal_code}
                        </p>
                        <p>State: {order.data.shipping.state}</p>
                        <p>Country: {order.data.shipping.country.name}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {order.data.orderItems === [] ? (
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
                      {order.data.orderItems.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <p>{item.name}</p>
                              <img
                                src={item.image}
                                alt={item.name}
                                width={100}
                              />
                            </td>
                            <td>${item.newPrice.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>
                              ${(item.newPrice * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <div className={styles.card}>
                <h5>Update Status</h5>
                <label>Select the new order Status: </label>
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
          )
        )}
      </div>

      {/* {isLoading && <Loader />} */}
    </>
  );
};

export default OrderDetails;
