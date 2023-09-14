import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../sections";
import { Header } from "..";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAdmin } from "../../redux/authSlice";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import { STORE_PRODUCTS } from "../../redux/productSlice";

const RootLayout = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();

  //Get Real-Time of Products List
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      const array = [];
      snapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });

      dispatch(STORE_PRODUCTS(array));
    });
    return () => unsub();
  }, [dispatch]);

  return (
    <>
      <Header isAdmin={isAdmin} />
      <Outlet />

      {!isAdmin && <Footer />}
    </>
  );
};

export default RootLayout;
