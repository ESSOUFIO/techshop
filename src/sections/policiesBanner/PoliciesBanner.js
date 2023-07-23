import React from "react";
import styles from "./PoliciesBanner.module.scss";
import shippingIcon from "../../assets/icons/fast-delivery.png";
import guaranteeIcon from "../../assets/icons/guarantee.png";
import trophyIcon from "../../assets/icons/award.png";

const PoliciesBanner = () => {
  return (
    <div className={styles.policiesBanner}>
      <div className={styles["first-item"]}>
        <div>
          <img
            src={shippingIcon}
            alt="Free Shipping"
            style={{ width: "40px" }}
          />
        </div>
        <p className={styles.text}>Free Shipping & Returns</p>
      </div>
      <div className={styles.item}>
        <div>
          <img src={guaranteeIcon} alt="Free Shipping" />
        </div>
        <p className={styles.text}>Lowest Price Guarantee</p>
      </div>
      <div className={styles.item}>
        <div>
          <img src={trophyIcon} alt="Free Shipping" />
        </div>
        <p className={styles.text}>Longest Warranties Offer</p>
      </div>
    </div>
  );
};

export default PoliciesBanner;
