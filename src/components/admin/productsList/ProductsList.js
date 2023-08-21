import React, { useState } from "react";
import styles from "./ProductsList.module.scss";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { DELETE_PRODUCT } from "../../../redux/productSlice";
import { selectProducts } from "../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import Notiflix from "notiflix";
import { useNavigate } from "react-router";
import { deleteObject, ref } from "@firebase/storage";

const ProductsList = () => {
  const [loading, setLoading] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteProduct = (item) => {
    Notiflix.Confirm.show(
      "Delete a Product",
      `Are you sure to delete "${item.name}"?`,
      "Delete",
      "Cancel",
      async function okCb() {
        setLoading(true);
        try {
          await deleteDoc(doc(db, "products", item.id));
          //delete images from Storage
          item.images.forEach((image) => {
            const imageRef = ref(storage, `products/${image.id}`);
            deleteObject(imageRef);
          });

          dispatch(DELETE_PRODUCT(item.id));
          toast.success("Product deleted successfully.");
        } catch (error) {
          toast.error(error.message);
        }
        setLoading(false);
      },
      function cancelCb() {
        return;
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#ff6060",
        okButtonBackground: "#ff6060",
      }
    );
  };

  return (
    <>
      <div className={styles.productList}>
        <h2>Products List</h2>
        <p>
          <b>{products.length}</b> Products found.
        </p>
        <input className="form-item" type="text" placeholder="Search by Name" />
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>OFF</th>
              <th>New Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products === [] ? (
              <p>No products founds.</p>
            ) : (
              <>
                {products.map((prod, index) => {
                  return (
                    <tr key={prod.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={prod.images[0].url}
                          alt={prod.name}
                          width={100}
                        />
                      </td>
                      <td style={{ textAlign: "left" }}>{prod.name}</td>
                      <td>{prod.category}</td>
                      <td>${Number(prod.price).toFixed(2)}</td>
                      <td>%{prod.offValue}</td>
                      <td>${Number(prod.newPrice).toFixed(2)}</td>
                      <td>
                        <GoTrash
                          className={styles.icon}
                          style={{ marginRight: "10px" }}
                          size={20}
                          color="green"
                          onClick={() => deleteProduct(prod)}
                        />
                        <FiEdit
                          className={styles.icon}
                          size={20}
                          color="red"
                          onClick={() => navigate(`/admin/product/${prod.id}`)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      {loading && <Loader />}
    </>
  );
};

export default ProductsList;
