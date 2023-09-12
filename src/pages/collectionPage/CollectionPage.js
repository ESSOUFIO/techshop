import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/cardProduct/CardProduct";
import styles from "./CollectionPage.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useSelector } from "react-redux";

const CollectionPage = () => {
  const { id } = useParams();
  const [prods, setProds] = useState([]);
  const products = useSelector();

  useEffect(() => {
    const array = products.filter((prod) => prod.category === id);
    setProds(array);
  }, [id, products]);

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
          const { id, name, images, price, newPrice, offValue } = prod;
          return (
            <CardProduct
              key={index}
              img1={images[0].url}
              img2={images[0].url}
              name={name}
              offValue={offValue}
              newPrice={newPrice}
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
