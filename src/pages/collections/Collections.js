import React from "react";
import styles from "./Collections.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import TopCategories from "../../sections/topCategories/TopCategories";
import { useEffect } from "react";

const Collections = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className={styles.collections}>
      <BreadCrumb page1={"Collections"} />
      <TopCategories />
    </div>
  );
};

export default Collections;
