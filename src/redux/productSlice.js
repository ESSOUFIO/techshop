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
      let array = [];

      //Category Page
      if (action.payload.category !== null) {
        array = state.products.filter((item) => {
          return (
            (item.name
              .toUpperCase()
              .includes(action.payload.search.toUpperCase()) ||
              item.brand
                .toUpperCase()
                .includes(action.payload.search.toUpperCase()) ||
              item.category
                .toUpperCase()
                .includes(action.payload.search.toUpperCase())) &&
            item.category === action.payload.category &&
            item.newPrice <= action.payload.price
          );
        });
      } else if (action.payload.banner !== null) {
        array = state.products.filter((item) => {
          return (
            (item.name
              .toUpperCase()
              .includes(action.payload.search.toUpperCase()) ||
              item.brand
                .toUpperCase()
                .includes(action.payload.search.toUpperCase()) ||
              item.category
                .toUpperCase()
                .includes(action.payload.search.toUpperCase())) &&
            item.banner === action.payload.banner &&
            item.newPrice <= action.payload.price
          );
        });
      }

      switch (action.payload.sortedBy) {
        case "Latest":
          array.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
          );
          break;

        case "Lowest Price":
          array.sort((a, b) =>
            a.newPrice > b.newPrice ? 1 : a.newPrice < b.newPrice ? -1 : 0
          );
          break;

        case "Highest Price":
          array.sort((a, b) =>
            b.newPrice > a.newPrice ? 1 : b.newPrice < a.newPrice ? -1 : 0
          );
          break;

        case "A - Z":
          array.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          break;

        case "Z - A":
          array.sort((a, b) =>
            b.name > a.name ? 1 : b.name < a.name ? -1 : 0
          );
          break;

        default:
          break;
      }

      state.filtredProducts = array;
    },
  },
});

export const { STORE_PRODUCTS, FILTER_PRODUCTS } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectFiltredProducts = (state) => state.product.filtredProducts;

export default productSlice.reducer;
