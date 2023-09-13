import React from "react";
import styles from "./SearchModule.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import { useEffect } from "react";
import { useState } from "react";
import CardProduct from "../../components/cardProduct/CardProduct";

const SearchResult = () => {
  const [filtredProd, setFiltredProds] = useState([]);
  const { input } = useParams();
  const products = useSelector(selectProducts);

  useEffect(() => {
    let prods = [];
    if (products) {
      prods = products.filter((prod) => {
        return (
          prod.name.toUpperCase().includes(input.toUpperCase()) ||
          prod.brand.toUpperCase().includes(input.toUpperCase()) ||
          prod.category.toUpperCase().includes(input.toUpperCase())
        );
      });
      setFiltredProds(prods);
    }
  }, [products, input]);

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={`--container ${styles.searchResult}`}>
      <BreadCrumb page1={"Search Results"} />
      <h2>Search Results</h2>

      <div className={styles.content}>
        {filtredProd.length === 0 ? (
          <div>
            <h6>No results for {input}.</h6>
            <p>Try checking your spelling or use more general terms.</p>
          </div>
        ) : (
          filtredProd.map((prod, index) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default SearchResult;
