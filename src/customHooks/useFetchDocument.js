import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

const useFetchDocument = (collection, docID) => {
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, collection, docID);
      const docSnap = await getDoc(docRef);
      setIsLoading(false);

      if (docSnap.exists()) {
        setDocument(docSnap.data());
      } else setDocument(null);
    };
    getDocument();
  }, [collection, docID]);

  return { data: document, isLoading };
};

export default useFetchDocument;
