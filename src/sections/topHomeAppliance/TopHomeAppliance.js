import React, { useEffect, useState } from "react";
import products from "../..//products.json";
import CardSlider from "../../components/cardSlider/CardSlider";

const TopHomeAppliance = () => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.category === "Home Appliance");
    setProds(array);
  }, []);
  return <CardSlider title={"Top Home Appliance"} productList={prods} />;
};

export default TopHomeAppliance;
