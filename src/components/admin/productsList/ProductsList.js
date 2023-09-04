import React, { useEffect, useState } from "react";
import styles from "./ProductsList.module.scss";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { selectProducts } from "../../../redux/productSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import Notiflix from "notiflix";
import { useNavigate } from "react-router";
import { deleteObject, ref } from "@firebase/storage";
import { IoSearch } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

const ProductsList = () => {
  const [loading, setLoading] = useState(false);
  const [filtredProd, setFiltredProd] = useState([]);

  const products = useSelector(selectProducts);
  const navigate = useNavigate();

  const { pgIndex } = useParams();

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

          // dispatch(DELETE_PRODUCT(item.id));
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

  const searchHandler = (e) => {
    const input = e.target.value.toLowerCase();
    const array = products.filter(
      (item) =>
        item.name.toLowerCase().includes(input) ||
        item.brand.toLowerCase().includes(input) ||
        item.category.toLowerCase().includes(input)
    );
    setFiltredProd(array);
  };

  useEffect(() => {
    setFiltredProd(products);
  }, [products]);

  //** =======   PAGINATION   ===== */
  const itemsPerPage = 10;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filtredProd.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtredProd.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filtredProd.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (pgIndex === "list") {
      setItemOffset(0);
    } else setItemOffset(Number(pgIndex));
  }, [pgIndex]);

  return (
    <>
      <div className={styles.productList}>
        <h2>Products List</h2>
        <p>
          <b>{filtredProd.length}</b> Products found.
        </p>
        <div className={styles.search}>
          <input
            className="form-item"
            type="text"
            placeholder="Search by Name"
            onChange={searchHandler}
          />
          <IoSearch size={20} className={styles.searchIcon} />
        </div>

        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th className={styles.name}>Name</th>
                <th className={styles.largItems}>Category</th>
                <th className={styles.largItems}>Price</th>
                <th className={styles.largItems}>OFF</th>
                <th className={styles.largItems}>New Price</th>
                <th className={styles.actions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products === [] ? (
                <p>No products founds.</p>
              ) : (
                <>
                  {currentItems.map((prod, index) => {
                    return (
                      <tr key={prod.id}>
                        <td>{index + itemOffset + 1}</td>
                        <td>
                          <img
                            src={prod.images[0].url}
                            alt={prod.name}
                            width={100}
                          />
                        </td>
                        <td style={{ textAlign: "left" }}>
                          {prod.name}
                          <div className={styles.tabletContent}>
                            <p>
                              Price:{" "}
                              <span>${Number(prod.price).toFixed(2)}</span>
                            </p>
                            <p>
                              OFF Value: <span>%{prod.offValue}</span>
                            </p>
                            <p>
                              New Price:{" "}
                              <span>${Number(prod.newPrice).toFixed(2)}</span>
                            </p>
                          </div>
                          <div className={styles.mobileContent}>
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
                              onClick={() =>
                                navigate(`/admin/product/${prod.id}`)
                              }
                            />
                          </div>
                        </td>
                        <td className={styles.largItems}>{prod.category}</td>
                        <td className={styles.largItems}>
                          ${Number(prod.price).toFixed(2)}
                        </td>
                        <td className={styles.largItems}>%{prod.offValue}</td>
                        <td className={styles.largItems}>
                          ${Number(prod.newPrice).toFixed(2)}
                        </td>
                        <td className={styles.actions}>
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
                            onClick={() =>
                              navigate(
                                `/admin/product/${itemOffset}/${prod.id}`
                              )
                            }
                          />
                        </td>
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

      {/* {loading && <Loader />} */}
    </>
  );
};

export default ProductsList;
