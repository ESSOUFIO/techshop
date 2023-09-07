import React from "react";
import { useParams } from "react-router";
import styles from "./MyOrderDetails.module.scss";
import { Link } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/images/loader/Spinner.png";

const MyOrderDetails = () => {
  const { id } = useParams();
  const order = useFetchDocument("orders", id);

  return (
    <>
      <div className={`--container ${styles.orderDetails}`}>
        <h3>Order Details</h3>
        <Link to={"/my-orders"}>&larr; Back to Orders</Link>

        {order.isLoading ? (
          <div>
            <img src={spinner} alt="Loading.." width={100} />
          </div>
        ) : (
          order.data && (
            <div className={styles.content}>
              {
                <div className={styles.orderInfo}>
                  <p>
                    <b>Order ID: </b>
                    <span>{id}</span>
                  </p>
                  <p>
                    <b>Order Status: </b>
                    <span>{order.data.status}</span>
                  </p>
                  <p>
                    <b>Order Date: </b>
                    <span>
                      {order.data.orderDate + " at " + order.data.orderTime}
                    </span>
                  </p>
                  <p>
                    <b>Amount: </b>
                    <span>${order.data.amount.toFixed(2)}</span>
                  </p>
                  <div>
                    <b>Shipping: </b>
                    <p>
                      Address:{" "}
                      <span>
                        {order.data.shipping.line1}, {order.data.shipping.line2}
                        , {order.data.shipping.postal_code}
                      </span>
                    </p>
                    <p>
                      State: <span>{order.data.shipping.state}</span>
                    </p>
                    <p>
                      Country: <span>{order.data.shipping.country.name}</span>
                    </p>
                  </div>
                </div>
              }

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
            </div>
          )
        )}
      </div>
    </>
  );
};

export default MyOrderDetails;
