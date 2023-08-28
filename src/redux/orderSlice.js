import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  myOrders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    STORE_ORDERS: (state, action) => {
      state.orders = action.payload;
    },

    GET_MY_ORDERS: (state, action) => {
      let array = [];
      array = state.orders.filter((order) => order.userID === action.payload);
      state.myOrders = array;
    },
  },
});

export const { STORE_ORDERS, GET_MY_ORDERS } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectMyOrders = (state) => state.order.myOrders;

export default orderSlice.reducer;
