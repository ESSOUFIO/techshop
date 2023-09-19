import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";

const Gaming = ({ products }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "gaming");
    setProds(array);
  }, [products]);

  return (
    <>
      {prods.length !== 0 && (
        <CardSlider
          title={"Gaming Trends"}
          productList={prods}
          banner={"gaming"}
        />
      )}
    </>
  );
};

export default Gaming;
