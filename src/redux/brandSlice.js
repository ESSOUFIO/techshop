import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    STORE_BRAND: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const { STORE_BRAND } = brandSlice.actions;

export const selectBrands = (state) => state.brand.brands;

export default brandSlice.reducer;
