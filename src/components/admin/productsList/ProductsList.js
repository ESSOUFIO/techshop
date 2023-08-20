import React from "react";
import styles from "./ProductsList.module.scss";
import { FiTrash2 } from "react-icons/fi";

const ProductsList = () => {
  return (
    <div className={styles.productList}>
      <h2>Products List</h2>
      <p>
        <b>2</b> Products found.
      </p>
      <input className="form-item" type="text" placeholder="Search by Name" />
      <table>
        <thead>
          <tr>
            <th>s/n</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>s/n</td>
            <td>Image</td>
            <td>Name </td>
            <td>Category</td>
            <td>Price</td>
            <td>
              <FiTrash2 size={20} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
