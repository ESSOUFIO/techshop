import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";

const TopTelevision = () => {
  const [prods, setProds] = useState([]);
  const products = useSelector(selectProducts);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "Top Televisions");
    setProds(array);
  }, [products]);
  return (
    <>
      {prods.length !== 0 && (
        <CardSlider title={"Top Televisions"} productList={prods} />
      )}
    </>
  );
};

export default TopTelevision;
