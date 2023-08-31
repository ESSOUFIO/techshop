import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    SAVE_WISH_LIST: (state, action) => {
      state.wishList = action.payload;
    },
  },
});

export const { SAVE_WISH_LIST } = wishSlice.actions;

export const selectWishList = (state) => state.wish.wishList;

export default wishSlice.reducer;
