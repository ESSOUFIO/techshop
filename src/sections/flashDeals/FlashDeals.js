import React from "react";
import styles from "./FlashDeals.module.scss";
import CardProduct from "../../components/cardProduct/CardProduct";

import prodImg1 from "../../assets/images/products/1/1.jpg";
import prodImg2 from "../../assets/images/products/1/2.jpg";

const FlashDeals = () => {
  return (
    <div className={styles.flashDeals}>
      <h1>Flash Deals</h1>
      <CardProduct
        img1={prodImg1}
        img2={prodImg2}
        title={"Computer & Accessories for Sale - Black"}
        offValue={"50%"}
        lastPrice={"$99.00"}
        price={"$49.00"}
      />
    </div>
  );
};

export default FlashDeals;
