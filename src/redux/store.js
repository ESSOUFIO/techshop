import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  category: categoryReducer,
  brand: brandReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
