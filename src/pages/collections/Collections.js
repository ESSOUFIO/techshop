import React from "react";
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
    <div>
      <BreadCrumb page1={"Collections"} />
      <TopCategories />
    </div>
  );
};

export default Collections;
