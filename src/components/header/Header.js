import React, { useEffect, useState } from "react";
import HeaderLaptop from "./headerLaptop/HeaderLaptop";
import HeaderMobile from "./headerMobile/HeaderMobile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_USER,
  SET_ACTIVE_USER,
  selectIsLoggedIn,
  selectUserName,
} from "../../redux/authSlice";
import Loader from "../loader/Loader";
import { STORE_ITEMS, selectCartItems } from "../../redux/cartSlice";

const Header = ({ isAdmin }) => {
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  // console.log(cartItems);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(SET_ACTIVE_USER(user));
      } else {
        dispatch(LOGOUT_USER());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const array = localStorage.getItem("cartItems");
    if (array?.length > 0) {
      dispatch(STORE_ITEMS(JSON.parse(array)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      {!isAdmin && (
        <HeaderLaptop
          isLoggedIn={isLoggedIn}
          userName={userName}
          nbrCartItems={cartItems.length}
        />
      )}
      <HeaderMobile
        isLoggedIn={isLoggedIn}
        userName={userName}
        nbrCartItems={cartItems.length}
        style={{ display: `${isAdmin ? "block" : ""}` }}
      />
      {loading && <Loader />}
    </>
  );
};

export default Header;
