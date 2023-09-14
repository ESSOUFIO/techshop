import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";

const TopTelevision = ({ products }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "Top Televisions");
    setProds(array);
  }, [products]);
  return (
    <>
      {prods.length !== 0 && (
        <CardSlider
          title={"Top Televisions"}
          productList={prods}
          id={"televisions"}
        />
      )}
    </>
  );
};

export default TopTelevision;
