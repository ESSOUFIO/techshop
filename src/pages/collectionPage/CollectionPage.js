import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/cardProduct/CardProduct";
import styles from "./CollectionPage.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";

const CollectionPage = () => {
  const { id } = useParams();
  const [prods, setProds] = useState([]);
  const products = useSelector(selectProducts);
  const banner = useFetchDocument("banners", id);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === id);
    setProds(array);
  }, [id, products]);

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  console.log(banner, id);
  return (
    <>
      <BreadCrumb page1={id} />
      <div className={styles.collections}>
        <h2>{banner.data?.name}</h2>
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
      </div>
    </>
  );
};

export default CollectionPage;
