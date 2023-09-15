import React from "react";
import { useEffect } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { TopCategories } from "../../sections";
import styles from "./Categories.module.scss";

const Categories = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className={styles.categories}>
      <BreadCrumb page1={"Categories"} />
      <TopCategories />
    </div>
  );
};

export default Categories;
