import React, { useEffect, useState } from "react";
import HeaderLaptop from "./headerLaptop/HeaderLaptop";
import HeaderMobile from "./headerMobile/HeaderMobile";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_USER,
  SET_ACTIVE_USER,
  selectIsLoggedIn,
  selectUserID,
  selectUserName,
} from "../../redux/authSlice";
import Loader from "../loader/Loader";
import {
  CALCUL_TOTAL_AMOUNT,
  CALCUL_TOTAL_QUANTITY,
  STORE_ITEMS,
  selectCartItems,
} from "../../redux/cartSlice";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { SAVE_WISH_LIST } from "../../redux/wishSlice";

const Header = ({ isAdmin }) => {
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const uid = useSelector(selectUserID);

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
    dispatch(CALCUL_TOTAL_QUANTITY());
    dispatch(CALCUL_TOTAL_AMOUNT());
  }, [cartItems, dispatch]);

  //Get Real-Time of Wish List
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const unsub = onSnapshot(q, (snapshot) => {
      let array = [];
      snapshot.forEach((doc) => {
        array = doc.data().wishList;
      });

      dispatch(SAVE_WISH_LIST(array));
      setLoading(false);
    });
    return () => unsub();
  }, [dispatch, uid]);

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
