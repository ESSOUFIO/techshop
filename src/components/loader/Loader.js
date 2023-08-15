import React from "react";
import styles from "./Loader.module.scss";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/images/loader/Spinner-150px.png";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.loader}>
      <div className={styles.img}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
