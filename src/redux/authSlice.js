import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userID: null,
  userName: null,
  email: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = true;
      state.userID = action.payload.uid;
      state.userName = action.payload.displayName;
      state.email = action.payload.email;
      if (action.payload.email === "admin@gmail.com") {
        state.isAdmin = true;
      } else state.isAdmin = false;
    },
    LOGOUT_USER: (state) => {
      state.isLoggedIn = false;
      state.userID = null;
      state.userName = null;
      state.email = null;
      state.isAdmin = false;
    },
  },
});

export const { SET_ACTIVE_USER, LOGOUT_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserID = (state) => state.auth.userID;
export const selectUserName = (state) => state.auth.userName;
export const selectEmail = (state) => state.auth.email;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;
