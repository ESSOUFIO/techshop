import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/cardProduct/CardProduct";
import styles from "./CategoryPage.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFiltredProducts,
} from "../../redux/productSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import BackHomeBtn from "../../components/backHomeBtn/BackHomeBtn";
import Input from "../../components/input/Input";
import spinner from "../../assets/images/loader/Spinner.png";

const CategoryPage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const filtredProds = useSelector(selectFiltredProducts);
  const category = useFetchDocument("categories", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      FILTER_PRODUCTS({
        category: category.data?.id,
        search,
        sortedBy: sort,
      })
    );
  }, [dispatch, search, category.data, sort]);

  console.log(sort);

  //Scroll to top
  useEffect(() => {
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
          <div className={styles.filterWrap}>
            <Input
              type={"text"}
              placeholder={"Search Product"}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
            />
            <div className={styles.select}>
              <label>Sort By: </label>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value={"Latest"}>Latest</option>
                <option value={"Lowest Price"}>Lowest Price</option>
                <option value={"Highest Price"}>Highest Price</option>
                <option value={"A - Z"}>A - Z</option>
                <option value={"Z - A"}>Z - A</option>
              </select>
            </div>
          </div>

          {filtredProds.length === 0 ? (
            <div>
              <p>No products founds in "{category.data?.name}" category.</p>

              {category.isLoading && (
                <div>
                  <img src={spinner} alt="Loading..." width={100} />
                </div>
              )}

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
