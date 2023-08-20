import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
    DELETE_PRODUCT: (state, action) => {
      const array = Array.from(state.products);
      state.products = array.filter((item) => item.id !== action.payload);
    },
  },
});

export const { STORE_PRODUCTS, DELETE_PRODUCT } = productSlice.actions;

export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;