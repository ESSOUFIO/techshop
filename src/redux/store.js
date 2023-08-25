import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  category: categoryReducer,
  brand: brandReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
