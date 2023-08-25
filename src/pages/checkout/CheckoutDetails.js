import React from "react";
import { useSelector } from "react-redux";
import { selectTotalAmount, selectTotalQuantity } from "../../redux/cartSlice";

const CheckoutDetails = () => {
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);
  return (
    <div>
      <h1>{totalQuantity}</h1>
      <h1>{totalAmount}</h1>
    </div>
  );
};

export default CheckoutDetails;
