import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    STORE_ITEMS: (state, action) => {
      state.cartItems = action.payload;
    },

    ADD_TO_CART: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.success(
          `"${action.payload.name.substring(0, 15)}..." increased by one`
        );
      } else {
        state.cartItems.push(action.payload);
        toast.success(
          `"${action.payload.name.substring(0, 15)}..." added to the cart`
        );
      }
    },

    INCREASE_QTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[itemIndex].quantity += 1;
    },

    DECREASE_QTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[itemIndex].quantity -= 1;
    },

    REMOVE_ITEM: (state, action) => {
      const array = state.cartItems;
      state.cartItems = array.filter((item) => item.id !== action.payload);
    },

    CALCUL_TOTAL_QUANTITY: (state) => {
      let totalQ = 0;
      state.cartItems.forEach((item) => (totalQ += item.quantity));
      state.totalQuantity = totalQ;
    },

    CALCUL_TOTAL_AMOUNT: (state) => {
      let totalA = 0;
      state.cartItems.forEach(
        (item) => (totalA += item.quantity * item.newPrice)
      );
      state.totalAmount = totalA;
    },
  },
});

export const {
  ADD_TO_CART,
  STORE_ITEMS,
  INCREASE_QTY,
  DECREASE_QTY,
  REMOVE_ITEM,
  CALCUL_TOTAL_QUANTITY,
  CALCUL_TOTAL_AMOUNT,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
