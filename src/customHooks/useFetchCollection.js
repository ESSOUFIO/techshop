import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName, order) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collect, setCollect] = useState([]);

  useEffect(() => {
    const getCollection = async () => {
      const q = query(collection(db, collectionName), orderBy(order));
      setIsLoading(true);
      const querySnapshot = await getDocs(q);
      let array = [];
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setCollect(array);
      setIsLoading(false);
    };
    if (collectionName) getCollection();
  }, [collectionName, order]);

  return { data: collect, isLoading };
};

export default useFetchCollection;
