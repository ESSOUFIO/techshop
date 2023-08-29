import React, { useEffect, useState } from "react";
import styles from "./OrdersList.module.scss";
import { useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import Notiflix from "notiflix";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import { selectOrders } from "../../../redux/orderSlice";

const OrdersList = () => {
  const [loading, setLoading] = useState(false);

  const orders = useSelector(selectOrders);
  const navigate = useNavigate();

  //** =======   PAGINATION   ===== */
  const itemsPerPage = 20;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={styles.orderList}>
        <h2>Orders List</h2>
        <p>
          Open an order to Change <b>Order Status</b>
        </p>

        {orders.length === 0 ? (
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
                {currentItems.map((order, index) => {
                  return (
                    <tr
                      key={order.id}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/admin/order-details/${order.id}`)
                      }
                    >
                      <td>{index + itemOffset + 1}</td>
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

            <div className={`pagination`}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        )}
      </div>

      {loading && <Loader />}
    </>
  );
};

export default OrdersList;
