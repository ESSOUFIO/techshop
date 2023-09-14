import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/cardProduct/CardProduct";
import styles from "./CategoryPage.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import BackHomeBtn from "../../components/backHomeBtn/BackHomeBtn";

const CategoryPage = () => {
  const { id } = useParams();
  const [prods, setProds] = useState([]);
  const products = useSelector(selectProducts);
  const category = useFetchDocument("categories", id);

  useEffect(() => {
    const array = products.filter((prod) => prod.category === id);
    setProds(array);
  }, [id, products]);

  console.log(id, category);

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
      <div className={`--container ${styles.categories}`}>
        <h2>{category.data?.name}</h2>
        {prods.length === 0 ? (
          <div>
            <p>No products founds in "{category.data?.name}" category.</p>
            <BackHomeBtn />
          </div>
        ) : (
          <div className={styles.categoriesPage}>
            {prods.map((prod, index) => {
              const { id, name, brand, images, price, newPrice, offValue } =
                prod;
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
        )}
      </div>
    </>
  );
};

export default CategoryPage;
