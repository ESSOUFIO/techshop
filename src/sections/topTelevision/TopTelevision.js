import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";

const TopTelevision = ({ products }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "top_televisions");
    setProds(array);
  }, [products]);
  return (
    <>
      {prods.length !== 0 && (
        <CardSlider
          title={"Top Televisions"}
          productList={prods}
          id={"televisions"}
          banner={"top_televisions"}
        />
      )}
    </>
  );
};

export default TopTelevision;
