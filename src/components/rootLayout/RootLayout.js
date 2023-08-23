import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../sections";
import { Header } from "..";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAdmin } from "../../redux/authSlice";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import { STORE_PRODUCTS } from "../../redux/productSlice";
import Loader from "../loader/Loader";

const RootLayout = () => {
  const [loading, setLoading] = useState(false);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();

  //Get Real-Time of Products List
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "products"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      const array = [];
      snapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });

      dispatch(STORE_PRODUCTS(array));
      setLoading(false);
    });
    return () => unsub();
  }, [dispatch]);

  return (
    <>
      <Header isAdmin={isAdmin} />
      <Outlet />
      {!isAdmin && <Footer />}

      {loading && <Loader />}
    </>
  );
};

export default RootLayout;
