import React from "react";
import { useEffect } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import CollectionComponent from "../../components/collectionComponent/CollectionComponent";

const FlashDeal = () => {
  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <BreadCrumb page1={"Flash Deal"} />
      <CollectionComponent
        collectionID={"flash_deal"}
        collectionName={"banners"}
      />
    </>
  );
};

export default FlashDeal;
