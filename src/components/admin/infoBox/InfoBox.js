import React from "react";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ name, value, color, icon }) => {
  return (
    <div
      className={styles.infoBox}
      style={{ borderBottom: `3px solid ${color}` }}
    >
      <p>{name}</p>
      <div className={styles.content}>
        <h3>{value}</h3>
        <div>{icon}</div>
      </div>
    </div>
  );
};

export default InfoBox;
