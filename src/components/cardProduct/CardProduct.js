import React, { useState } from "react";
import styles from "./CardProduct.module.scss";
import { GoHeart } from "react-icons/go";
import QuickView from "../quickView/QuickView";
import { useNavigate } from "react-router-dom";
import FormatPrice from "../formatPrice/FormatPrice";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../redux/cartSlice";

const CardProduct = ({
  img1,
  img2,
  name,
  brand,
  offValue,
  newPrice,
  price,
  id,
}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addToCard = () => {
    console.log(id);
    const item = { id, name, newPrice, image: img1, brand, quantity: 1 };
    dispatch(ADD_TO_CART(item));
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.images}>
          <div
            className={styles.img1}
            onClick={() => navigate(`/product/${id}`)}
          >
            <img src={img1} alt="product" />
          </div>

          <div
            className={styles.img2}
            onClick={() => navigate(`/product/${id}`)}
          >
            <img src={img2} alt="product" />
          </div>

          <button onClick={() => setShowQuickView(true)}>Quick View</button>
        </div>

        <p className={styles.brand}>{brand}</p>

        <div className={styles.desc}>
          <div className={styles.title}>{name}</div>

          {offValue !== 0 && (
            <div className={styles.deal}>
              <div className={styles.off}>{offValue}% off</div>
              <span>Deal</span>
            </div>
          )}

          <div className={styles.priceWrap}>
            <div className={styles.newPrice}>
              <FormatPrice price={newPrice} />
            </div>
            {offValue !== 0 && (
              <div className={styles.price}>${Number(price).toFixed(2)}</div>
            )}
          </div>

          {/* <div className={styles.choices}>
            <div className={styles.choice}>
              <div style={{ background: "#000" }}></div>
            </div>
            <div className={styles.choice}>
              <div style={{ background: "#708090" }}></div>
            </div>
            <div className={styles.choice}>
              <div style={{ background: "#F4A460" }}></div>
            </div>
          </div> */}
        </div>

        <div className={styles.buttons}>
          <button className="--rounded" onClick={addToCard}>
            Add to Cart
          </button>
          <div className={styles.wish}>
            <GoHeart size={24} />
          </div>
        </div>
      </div>
      {showQuickView && (
        <QuickView onHide={() => setShowQuickView(false)} prodID={id} />
      )}
    </>
  );
};

export default CardProduct;
