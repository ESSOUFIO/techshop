import React, { useEffect, useState } from "react";
import CardProduct from "../../components/cardProduct/CardProduct";
import styles from "./CollectionComponent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFiltredProducts,
} from "../../redux/productSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import BackHomeBtn from "../../components/backHomeBtn/BackHomeBtn";
import Input from "../../components/input/Input";
import spinner from "../../assets/images/loader/Spinner.png";

import { BiSolidGridAlt } from "react-icons/bi";
import { PiListBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useFetchCollection from "../../customHooks/useFetchCollection";
import FilterSideMenu from "../filterSideMenu/FilterSideMenu";

const CollectionComponent = ({ collectionID, collectionName }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [listView, setListView] = useState(true);
  const [price, setPrice] = useState(+Infinity);
  const [maxPrice, setMaxPrice] = useState(null);
  const [calc, setCalc] = useState(true);
  const [showFilterSide, setShowFilterSide] = useState(false);

  const filtredProds = useSelector(selectFiltredProducts);
  const collection = useFetchDocument(collectionName, collectionID);
  const categories = useFetchCollection("categories");
  const dispatch = useDispatch();

  const listViewHandler = () => {
    setListView(!listView);
  };

  useEffect(() => {
    setCalc(true);
    setPrice(+Infinity);
    setMaxPrice(null);
  }, [collection.data]);

  useEffect(() => {
    if (collectionName === "categories") {
      dispatch(
        FILTER_PRODUCTS({
          category: collection.data?.id,
          banner: null,
          price,
          search,
          sortedBy: sort,
        })
      );
    } else if (collectionName === "banners") {
      dispatch(
        FILTER_PRODUCTS({
          category: null,
          banner: collection.data?.id,
          search,
          price,
          sortedBy: sort,
        })
      );
    }
  }, [dispatch, search, collectionName, price, collection.data, sort]);

  useEffect(() => {
    if (calc && filtredProds.length !== 0) {
      const prices = filtredProds.map((item) => item.newPrice);
      const max = Math.max(...prices);
      setMaxPrice(Math.ceil(max));
      setPrice(Math.ceil(max));
      setCalc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredProds, calc]);

  const activeLink = ({ isActive }) => (isActive ? styles.active : "");

  const hideFilterSide = () => {
    setShowFilterSide(false);
  };

  const showFilterSideHandler = () => {
    setShowFilterSide(true);
  };

  return (
    <>
      <div className={styles.collectionWrapper}>
        <h2>{collection.data?.name}</h2>

        <div className={styles.contentWrapper}>
          <div className={styles.filterSide}>
            <h5 className={styles.categoriesTitle}>Categories</h5>
            {categories.data.map((cat, index) => {
              return (
                <NavLink
                  to={`/categories/${cat.id}`}
                  className={activeLink}
                  key={index}
                >
                  {cat.name}
                </NavLink>
              );
            })}
            <br />
            {!collection.isLoading && (
              <div className={styles.price}>
                <h5>Price</h5>
                <p>${price}</p>
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}
            <br />
            {collection.data?.image && (
              <div className={styles.catImage}>
                <img
                  src={collection.data.image.url}
                  alt={collection.data.name}
                />
                <p>{collection.data.name}</p>
              </div>
            )}
          </div>

          <div className={styles.content}>
            <div className={styles.topFilter}>
              <div className={styles.filterWrap}>
                <div className={styles.viewIcons}>
                  <PiListBold
                    size={26}
                    color={listView ? "#32a9d1" : "#7c7f80"}
                    className={styles.icon}
                    onClick={listViewHandler}
                  />
                  <BiSolidGridAlt
                    size={24}
                    color={!listView ? "#32a9d1" : "#7c7f80"}
                    className={styles.icon}
                    onClick={listViewHandler}
                  />
                  <p>{listView ? "List" : "Grid"} View.</p>
                </div>
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
              <div
                className={styles.showFilterBtn}
                onClick={showFilterSideHandler}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaFilter size={22} color="var(--color-shine-blue)" />
                  <span>Show Filter</span>
                </div>
              </div>
            </div>

            <p className={styles.prodFound}>
              <b>{filtredProds.length}</b> products found.
            </p>

            {filtredProds.length === 0 ? (
              <div>
                <p>No products founds in "{collection.data?.name}" category.</p>

                {collection.isLoading && (
                  <div>
                    <img src={spinner} alt="Loading..." width={100} />
                  </div>
                )}

                <BackHomeBtn />
              </div>
            ) : (
              <div
                className={styles.productsWrap}
                // style={{ flexWrap: `${listView ? "wrap" : "nowrap"}` }}
              >
                {filtredProds.map((prod, index) => {
                  const {
                    id,
                    name,
                    brand,
                    images,
                    price,
                    newPrice,
                    offValue,
                    desc,
                    reviewsNbr,
                    reviewsRate,
                  } = prod;
                  return (
                    <CardProduct
                      key={index}
                      img1={images[0].url}
                      img2={images[1] ? images[1].url : images[0].url}
                      name={name}
                      brand={brand}
                      offValue={offValue}
                      newPrice={newPrice}
                      price={price}
                      id={id}
                      desc={desc}
                      listView={listView}
                      reviewsNbr={reviewsNbr}
                      reviewsRate={reviewsRate}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterSideMenu
        show={showFilterSide}
        onHide={hideFilterSide}
        categories={categories}
        price={price}
        setPrice={setPrice}
        maxPrice={maxPrice}
      />
    </>
  );
};

export default CollectionComponent;
