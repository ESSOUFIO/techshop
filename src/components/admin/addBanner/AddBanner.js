import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddBanner.module.scss";
import Card from "../../card/Card";
import { Timestamp, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

import { useParams } from "react-router";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import spinner from "../../../assets/images/loader/Spinner.png";

const initState = {
  id: "",
  name: "",
};

const AddBanner = () => {
  const [banner, setBanner] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const bannerDoc = useFetchDocument("banners", id);

  //Handle Page Mode: "Edit Product" or "Add New Product"
  useEffect(() => {
    if (id !== "new") {
      setBanner(bannerDoc.data);
      setEditMode(true);
    } else {
      setBanner({ ...initState });
      setEditMode(false);
    }
  }, [id, bannerDoc.data]);

  const inputHandler = (target) => {
    setBanner({
      ...banner,
      [target.name]: target.value,
    });
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const prodRef = doc(db, "banners", id);
      await updateDoc(prodRef, banner);
      toast.success("Banner edited successfully.");
      navigate("/admin/banners");
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const addBannerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newBanner = {
        ...banner,
        createdAt: Timestamp.now().toDate(),
      };

      await setDoc(doc(db, "banners", newBanner.id), newBanner);
      // categoryRef.current.clearValue();
      toast.success("New Banner added successfully.");
      setBanner({ ...initState });
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  //Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.addBanner}>
        <h2>{editMode ? "Edit Banner" : "Add New Banner"}</h2>
        {bannerDoc.isLoading ? (
          <div>
            <img src={spinner} alt="Loading.." width={100} />
          </div>
        ) : (
          banner && (
            <Card cardClass={styles.card}>
              <form onSubmit={editMode ? editHandler : addBannerHandler}>
                <label>Banner ID</label>
                <input
                  className="form-item"
                  type="text"
                  placeholder="Banner ID"
                  name="id"
                  value={banner.id}
                  required={true}
                  onChange={(e) => inputHandler(e.target)}
                  disabled={editMode}
                />

                <label>Banner Name</label>
                <input
                  className="form-item"
                  type="text"
                  placeholder="Banner Name"
                  name="name"
                  value={banner.name}
                  required={true}
                  onChange={(e) => inputHandler(e.target)}
                />

                <div className={styles.btn}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={!banner.name}
                  >
                    {editMode ? "Edit Banner" : "Add Banner"}
                  </button>
                </div>
              </form>
            </Card>
          )
        )}
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default AddBanner;
