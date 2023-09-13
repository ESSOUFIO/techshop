import React from "react";
import styles from "./HotDeal.module.scss";
import { useParams } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import { useEffect } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import CardProduct from "../../components/cardProduct/CardProduct";

const HotDeal = () => {
  const { id } = useParams();
  const [prods, setProds] = useState([]);
  const products = useSelector(selectProducts);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "Flash Deal");
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
      <BreadCrumb page1={"Hot Deal"} />
      <div className={styles.hotDeal}>
        <h2>Hot Deal</h2>
        <div className={styles.content}>
          {prods.map((prod, index) => {
            const { id, name, brand, images, price, newPrice, offValue } = prod;
            return (
              <CardProduct
                key={index}
                img1={images[0].url}
                img2={images[1].url}
                name={name}
                brand={brand}
                offValue={offValue}
                newPrice={newPrice}
                price={price}
                id={id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HotDeal;
