import React, { useEffect } from "react";
import HeaderLaptop from "./headerLaptop/HeaderLaptop";
import HeaderMobile from "./headerMobile/HeaderMobile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { LOGOUT_USER, SET_ACTIVE_USER } from "../../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(SET_ACTIVE_USER(user));
      } else {
        dispatch(LOGOUT_USER());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <HeaderLaptop />
      <HeaderMobile />
    </>
  );
};

export default Header;
