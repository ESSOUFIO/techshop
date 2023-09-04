import React from "react";
import styles from "./BrandsList.module.scss";
import { useState } from "react";
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
import { selectBrands } from "../../../redux/brandSlice";

const BrandsList = () => {
  const [loading, setLoading] = useState(false);
  const [filtredBrands, setFiltredBrands] = useState([]);

  const brands = useSelector(selectBrands);
  const navigate = useNavigate();

  const deleteBrand = (item) => {
    Notiflix.Confirm.show(
      "Delete a Brand",
      `Are you sure to delete "${item.name}"?`,
      "Delete",
      "Cancel",
      async function okCb() {
        setLoading(true);
        try {
          await deleteDoc(doc(db, "brands", item.name));
          const imageRef = ref(storage, `brands/${item.image.id}`);
          deleteObject(imageRef);

          toast.success("Brand deleted successfully.");
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
    const array = brands.filter((item) =>
      item.name.toLowerCase().includes(input)
    );
    setFiltredBrands(array);
  };

  useEffect(() => {
    setFiltredBrands(brands);
  }, [brands]);

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.brandsList}>
        <h2>Brands List</h2>
        <p>
          <b>{filtredBrands.length}</b> Products found.
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
                <th className={styles.s_n}>s/n</th>
                <th className={styles.images}>Image</th>
                <th className={styles.name}>Name</th>
                <th className={styles.actions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtredBrands === [] ? (
                <p>No brands founds.</p>
              ) : (
                <>
                  {filtredBrands.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ width: "140px" }}>
                          <img
                            src={item.image.url}
                            alt={item.name}
                            width={100}
                          />
                        </td>
                        <td className={styles.name}>{item.name}</td>

                        <td className={styles.actions}>
                          <GoTrash
                            className={styles.icon}
                            style={{ marginRight: "10px" }}
                            size={20}
                            color="green"
                            onClick={() => deleteBrand(item)}
                          />
                          <FiEdit
                            className={styles.icon}
                            size={20}
                            color="red"
                            onClick={() =>
                              navigate(`/admin/brand/${item.name}`)
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
        </div>
      </div>

      {/* {loading && <Loader />} */}
    </>
  );
};

export default BrandsList;
