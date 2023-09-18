import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import CollectionComponent from "../../components/collectionComponent/CollectionComponent";

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
    <>
      <BreadCrumb page1={id} />
      <CollectionComponent collectionID={id} collectionName={"banners"} />
    </>
  );
};

export default CollectionPage;
