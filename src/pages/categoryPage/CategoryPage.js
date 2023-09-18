import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/cardProduct/CardProduct";
import styles from "./CategoryPage.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import BackHomeBtn from "../../components/backHomeBtn/BackHomeBtn";
import Input from "../../components/input/Input";

const CategoryPage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [prods, setProds] = useState([]);
  const [filtredProds, setFiltredProds] = useState([]);
  const products = useSelector(selectProducts);
  const category = useFetchDocument("categories", id);

  useEffect(() => {
    const array = products.filter((prod) => prod.category === id);
    setProds(array);
    setFiltredProds(array);
  }, [id, products]);

  useEffect(() => {
    const array = prods.filter((item) => {
      return item.name.toUpperCase().includes(search.toUpperCase());
    });
    setFiltredProds(array);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  console.log(filtredProds);

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
      <div className={styles.categories}>
        <h2>{category.data?.name}</h2>
        <div className={styles.content}>
          <p>
            <b>{filtredProds.length}</b> products founds.
          </p>
          <Input
            type={"text"}
            placeholder={"Search Product"}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          {filtredProds.length === 0 ? (
            <div>
              <p>No products founds in "{category.data?.name}" category.</p>
              <BackHomeBtn />
            </div>
          ) : (
            <div className={styles.categoriesPage}>
              {filtredProds.map((prod, index) => {
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
      </div>
    </>
  );
};

export default CategoryPage;
