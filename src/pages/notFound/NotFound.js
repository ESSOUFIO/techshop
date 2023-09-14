import React from "react";
import styles from "./NotFound.module.scss";
import notFoundImg from "../../assets/images/404_not_Found.png";
import BackHomeBtn from "../../components/backHomeBtn/BackHomeBtn";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.img}>
        <img src={notFoundImg} alt="404 Not Found" />
      </div>

      <BackHomeBtn />
    </div>
  );
};

export default NotFound;
