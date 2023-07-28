import React, { useEffect, useState } from "react";
import products from "../..//products.json";
import CardSlider from "../../components/cardSlider/CardSlider";

const FlashDeals = () => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.flashDeal === "true");
    setProds(array);
  }, []);
  return (
    <CardSlider
      title={"Flash Deal"}
      titleColor={"var(--color-red)"}
      productList={prods}
    />
  );
};

export default FlashDeals;
