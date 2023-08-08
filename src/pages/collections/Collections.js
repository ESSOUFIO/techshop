import React from "react";
import styles from "./Collections.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import TopCategories from "../../sections/topCategories/TopCategories";

const Collections = () => {
  return (
    <div className={styles.collections}>
      <BreadCrumb page1={"Collections"} />
      <TopCategories />
    </div>
  );
};

export default Collections;
