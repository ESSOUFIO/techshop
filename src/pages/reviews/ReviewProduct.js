import React from "react";
import styles from "./ReviewProduct.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/images/loader/Spinner.png";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import StarsRating from "react-star-rate";
import { useState } from "react";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loader from "../../components/loader/Loader";

const ReviewProduct = () => {
  const [rateValue, setRateValue] = useState(null);
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const uid = useSelector(selectUserID);
  const product = useFetchDocument("products", id);
  const review = useFetchDocument(`products/${id}/reviews`, uid);
  const user = useFetchDocument("users", uid);

  const navigate = useNavigate();

  const submitHandler = async () => {
    const docRef = doc(db, "products", id, "reviews", uid);
    setIsLoading(true);
    try {
      await setDoc(docRef, {
        userName: user.data.name,
        address:
          user.data.address.state + ", " + user.data.address.country.name,
        rating: rateValue,
        text,
      });
      toast.success("Review submited successfully.");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (review.data !== null) {
      setRateValue(review.data.rating);
      setText(review.data.text);
      setEditMode(true);
    }
  }, [review.data]);

  const editHandler = async () => {
    const docRef = doc(db, "products", id, "reviews", uid);
    setIsLoading(true);
    try {
      await updateDoc(docRef, {
        userName: user.data.name,
        address:
          user.data.address.state + ", " + user.data.address.country.name,
        rating: rateValue,
        text,
      });
      toast.success("Review updated successfully.");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <BreadCrumb page1={"Review Product"} />
      <div className={`--container ${styles.reviewProduct}`}>
        <h3>Rate this Product</h3>
        {product.isLoading ? (
          <div>
            <img src={spinner} alt="Loading.." width={100} />
          </div>
        ) : (
          product.data && (
            <>
              <div className={styles.product}>
                <img
                  src={product.data.images[0].url}
                  alt={product.data.name}
                  width={150}
                />
                <div className={styles.info}>
                  <p>
                    Product Name: <span>{product.data.name}</span>
                  </p>
                  <p>
                    Brand: <span>{product.data.brand}</span>
                  </p>
                  <p>
                    Price: <span>${product.data.newPrice.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <div className={styles.card}>
                <p>Rating: </p>
                <StarsRating
                  value={rateValue}
                  onChange={(value) => setRateValue(value)}
                />
                <p>Review:</p>
                <textarea
                  rows="10"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                ></textarea>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <ButtonPrimary
                    text={editMode ? "Edit Review " : "Submit Review"}
                    onClick={editMode ? editHandler : submitHandler}
                    className={styles.btnSubmit}
                    disabled={!rateValue || isLoading}
                  />
                </div>
              </div>
            </>
          )
        )}
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default ReviewProduct;
