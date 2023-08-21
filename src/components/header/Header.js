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

const Header = ({ isAdmin }) => {
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

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

  return (
    <>
      {!isAdmin && <HeaderLaptop isLoggedIn={isLoggedIn} userName={userName} />}
      <HeaderMobile
        isLoggedIn={isLoggedIn}
        userName={userName}
        style={{ display: `${isAdmin ? "block" : ""}` }}
      />
      {loading && <Loader />}
    </>
  );
};

export default Header;
