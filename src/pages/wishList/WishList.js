import React from "react";
import styles from "./WishList.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import { selectWishList } from "../../redux/wishSlice";
import CardProduct from "../../components/cardProduct/CardProduct";

const WishList = () => {
  const [prods, setProds] = useState([]);

  const products = useSelector(selectProducts);
  const wishList = useSelector(selectWishList);

  useEffect(() => {
    const getProd = (id) => {
      const prod = products.find((item) => item.id === id);
      return prod;
    };

    let array = [];
    wishList.forEach((item) => {
      const prod = getProd(item);
      array.push(prod);
    });
    setProds(array);
  }, [wishList, products]);

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <section>
      <BreadCrumb page1={"Wish List"} />
      <div className={`--container ${styles.wishList}`}>
        <h2>Wish List</h2>

        <div className={styles.content}>
          {prods.map((prod, index) => {
            const { id, name, brand, images, price, newPrice, offValue } = prod;
            return (
              <CardProduct
                key={index}
                img1={images[0].url}
                img2={images[0].url}
                name={name}
                offValue={offValue}
                newPrice={newPrice}
                price={price}
                brand={brand}
                id={id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WishList;
