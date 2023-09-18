import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filtredProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.sort((a, b) => b.createdAt - a.createdAt);
    },
    FILTER_PRODUCTS: (state, action) => {
      const array = state.products.filter((item) => {
        return (
          item.name
            .toUpperCase()
            .includes(action.payload.search.toUpperCase()) &&
          item.category === action.payload.category
        );
      });
      state.filtredProducts = array;
    },
  },
});

export const { STORE_PRODUCTS, FILTER_PRODUCTS } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectFiltredProducts = (state) => state.product.filtredProducts;

export default productSlice.reducer;
