import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../products.json";
import CardProduct from "../../components/cardProduct/CardProduct";
import styles from "./CollectionPage.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";

const CollectionPage = () => {
  const { id } = useParams();
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.category === id);
    setProds(array);
  }, [id]);

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <BreadCrumb page1={"Collections"} page2={id} />

      <div className={styles.collectionPage}>
        {prods.map((prod, index) => {
          const { id, title, image_1, image_2, price, lastPrice, offValue } =
            prod;
          return (
            <CardProduct
              key={index}
              img1={image_1}
              img2={image_2}
              title={title}
              offValue={offValue}
              lastPrice={lastPrice}
              price={price}
              id={id}
            />
          );
        })}
      </div>
    </>
  );
};

export default CollectionPage;
