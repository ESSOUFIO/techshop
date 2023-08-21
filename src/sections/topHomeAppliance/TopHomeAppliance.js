import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";

const TopHomeAppliance = () => {
  const [prods, setProds] = useState([]);
  const products = useSelector(selectProducts);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "Home Appliance");
    setProds(array);
  }, [products]);

  return (
    <>
      {prods.length !== 0 && (
        <CardSlider title={"Top Home Appliance"} productList={prods} />
      )}
    </>
  );
};

export default TopHomeAppliance;
