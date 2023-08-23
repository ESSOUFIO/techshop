import React from "react";
import styles from "./FormatPrice.module.scss";

const FormatPrice = ({ price }) => {
  const originalPrice = Number(price).toFixed(2).toString();
  const decimal = originalPrice.substring(0, originalPrice.indexOf("."));
  const fraction = originalPrice.substring(
    originalPrice.indexOf(".") + 1,
    originalPrice.length
  );
  return (
    <div className={styles.formatPrice}>
      <div className={styles.currency}>$</div>
      <div className={styles.decimal}>{decimal}</div>
      <div className={styles.fraction}>{fraction}</div>
    </div>
  );
};

export default FormatPrice;
