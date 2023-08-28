import React, { useEffect, useState } from "react";
import styles from "./OrdersList.module.scss";
import { useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import Notiflix from "notiflix";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { selectOrders } from "../../../redux/orderSlice";

const OrdersList = () => {
  const [loading, setLoading] = useState(false);

  const orders = useSelector(selectOrders);
  const navigate = useNavigate();

  const { pgIndex } = useParams();

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

  useEffect(() => {
    if (pgIndex === "list") {
      setItemOffset(0);
    } else setItemOffset(Number(pgIndex));
  }, [pgIndex]);

  return (
    <>
      <div className={styles.orderList}>
        <h2>Orders List</h2>
        <p>
          Open an order to Change <b>Order Status</b>
        </p>

        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Date</th>
                <th className={styles.name}>Order ID</th>
                <th className={styles.largItems}>Amount</th>
                <th className={styles.largItems}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders === [] ? (
                <p>No orders founds.</p>
              ) : (
                <>
                  {currentItems.map((order, index) => {
                    return (
                      <tr key={order.id}>
                        <td>{index + itemOffset + 1}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.id}</td>
                        <td>{order.amount}</td>
                        <td>{order.status}</td>
                      </tr>
                    );
                  })}
                </>
              )}
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
      </div>

      {loading && <Loader />}
    </>
  );
};

export default OrdersList;
