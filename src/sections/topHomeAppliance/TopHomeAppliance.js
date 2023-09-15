import React, { useEffect, useState } from "react";
import CardSlider from "../../components/cardSlider/CardSlider";

const TopHomeAppliance = ({ products }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "home_appliance");
    setProds(array);
  }, [products]);

  return (
    <>
      {prods.length !== 0 && (
        <CardSlider
          title={"Top Home Appliance"}
          productList={prods}
          banner={"home_appliance"}
        />
      )}
    </>
  );
};

export default TopHomeAppliance;
