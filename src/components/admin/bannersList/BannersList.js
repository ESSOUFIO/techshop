import React from "react";
import styles from "./BannersList.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useEffect } from "react";

const BannersList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const banners = useFetchCollection("banners");
  const navigate = useNavigate();

  const deleteBanner = (item) => {
    Notiflix.Confirm.show(
      "Delete a Banner",
      `Are you sure to delete "${item.name}"?`,
      "Delete",
      "Cancel",
      async function okCb() {
        setIsLoading(true);
        try {
          await deleteDoc(doc(db, "banners", item.id));
          toast.success("Banner deleted successfully.");
        } catch (error) {
          toast.error(error.message);
        }
        setIsLoading(false);
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.bannersList}>
        <h2>Banners List</h2>
        <p>
          <b>{banners.data.length}</b> Categories found.
        </p>

        {banners.data.lenght === 0 ? (
          <p>No banners founds.</p>
        ) : (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th style={{ textAlign: "left" }}>ID</th>
                  <th style={{ textAlign: "left" }}>Name</th>
                  <th className={styles.actions}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {banners.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "left" }}>{item.id}</td>
                        <td style={{ textAlign: "left" }}>{item.name}</td>

                        <td className={styles.actions}>
                          <GoTrash
                            className={styles.icon}
                            style={{ marginRight: "10px" }}
                            size={20}
                            color="green"
                            onClick={() => deleteBanner(item)}
                          />
                          <FiEdit
                            className={styles.icon}
                            size={20}
                            color="red"
                            onClick={() => navigate(`/admin/banner/${item.id}`)}
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

      {isLoading && <Loader />}
    </>
  );
};

export default BannersList;
