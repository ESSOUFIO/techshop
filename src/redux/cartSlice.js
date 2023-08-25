import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
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
  },
});

export const { ADD_TO_CART, STORE_ITEMS, INCREASE_QTY, DECREASE_QTY } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
