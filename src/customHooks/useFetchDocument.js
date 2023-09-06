import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchDocument = (collection, docID) => {
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      setIsLoading(true);
      const docRef = doc(db, collection, docID);
      const docSnap = await getDoc(docRef);
      setIsLoading(false);

      if (docSnap.exists()) {
        setDocument(docSnap.data());
      } else toast.error("Document not found!");
    };

    if (docID !== "new" && docID) getDocument();
  }, [collection, docID]);

  return { data: document, isLoading };
};

export default useFetchDocument;
