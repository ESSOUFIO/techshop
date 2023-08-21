import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";

const FlashDeals = () => {
  const [prods, setProds] = useState([]);
  const products = useSelector(selectProducts);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "Flash Deal");
    setProds(array);
  }, [products]);

  return (
    <CardSlider
      title={"Flash Deal"}
      titleColor={"var(--color-red)"}
      productList={prods}
    />
  );
};

export default FlashDeals;
