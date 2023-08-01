import React, { useState } from "react";
import styles from "./CardProduct.module.scss";
import { GoHeart } from "react-icons/go";
import QuickView from "../quickView/QuickView";

const CardProduct = ({ img1, img2, title, offValue, lastPrice, price, id }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.images}>
          <div className={styles.img1}>
            <img src={img1} alt="product" />
          </div>

          <div className={styles.img2}>
            <img src={img2} alt="product" />
          </div>

          <button onClick={() => setShowQuickView(true)}>Quick View</button>
        </div>

        <div className={styles.desc}>
          <div className={styles.title}>{title}</div>

          {offValue && (
            <div className={styles.deal}>
              <div className={styles.off}>{offValue} off</div>
              <span>Deal</span>
            </div>
          )}

          <div className={styles.price}>
            <span>{price}</span>
            <span>{lastPrice}</span>
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
          <button className="--rounded">Add to Cart</button>
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
