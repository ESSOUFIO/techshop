import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import CollectionComponent from "../../components/collectionComponent/CollectionComponent";
import styles from "./CollectionPage.module.scss";

const CollectionPage = () => {
  const { id } = useParams();

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={styles.collections}>
      <BreadCrumb page1={id} />
      <CollectionComponent collectionID={id} collectionName={"banners"} />
    </div>
  );
};

export default CollectionPage;
