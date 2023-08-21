import React, { useEffect, useState } from "react";
import products from "../..//products.json";
import CardSlider from "../../components/cardSlider/CardSlider";

const TopTelevision = () => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.category === "tv");
    setProds(array);
  }, []);
  return <CardSlider title={"Top Televisions"} productList={prods} />;
};

export default TopTelevision;
