import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";

const FlashDeals = ({ products }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "flash_deal");
    setProds(array);
  }, [products]);

  return (
    <div>
      {prods.length !== 0 && (
        <CardSlider
          title={"Flash Deal"}
          titleColor={"var(--color-red)"}
          productList={prods}
          banner={"flash_deal"}
        />
      )}
    </div>
  );
};

export default FlashDeals;
