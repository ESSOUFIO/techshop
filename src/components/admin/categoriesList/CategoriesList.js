import React from "react";
import styles from "./CategoriesList.module.scss";
import { useState } from "react";
import { selectCategories } from "../../../redux/categorySlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

const CategoriesList = () => {
  const [loading, setLoading] = useState(false);
  const [filtredCateg, setFiltredCateg] = useState([]);

  const categories = useSelector(selectCategories);
  const navigate = useNavigate();

  const deleteCategory = (item) => {
    Notiflix.Confirm.show(
      "Delete a Category",
      `Are you sure to delete "${item.name}"?`,
      "Delete",
      "Cancel",
      async function okCb() {
        setLoading(true);
        try {
          await deleteDoc(doc(db, "categories", item.id));
          const imageRef = ref(storage, `categories/${item.image.id}`);
          deleteObject(imageRef);

          toast.success("Category deleted successfully.");
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
    const array = categories.filter(
      (item) =>
        item.name.toLowerCase().includes(input) ||
        item.id.toLowerCase().includes(input)
    );
    setFiltredCateg(array);
  };

  useEffect(() => {
    setFiltredCateg(categories);
  }, [categories]);

  return (
    <>
      <div className={styles.categoriesList}>
        <h2>Categories List</h2>
        <p>
          <b>{filtredCateg.length}</b> Categories found.
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

        {filtredCateg.lenght === 0 ? (
          <p>No categories founds.</p>
        ) : (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th style={{ textAlign: "left" }}>ID</th>
                  <th style={{ textAlign: "left" }}>Name</th>
                  <th className={styles.actions}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {filtredCateg.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image.url}
                            alt={item.name}
                            width={100}
                          />
                        </td>
                        <td style={{ textAlign: "left" }}>{item.id}</td>
                        <td style={{ textAlign: "left" }}>{item.name}</td>

                        <td className={styles.actions}>
                          <GoTrash
                            className={styles.icon}
                            style={{ marginRight: "10px" }}
                            size={20}
                            color="green"
                            onClick={() => deleteCategory(item)}
                          />
                          <FiEdit
                            className={styles.icon}
                            size={20}
                            color="red"
                            onClick={() =>
                              navigate(`/admin/category/${item.id}`)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {loading && <Loader />}
    </>
  );
};

export default CategoriesList;
