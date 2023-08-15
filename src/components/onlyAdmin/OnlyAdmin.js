import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";

const OnlyAdmin = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          setAdmin(true);
        } else setAdmin(false);
      } else {
        setAdmin(false);
      }
    });
  }, []);
  return <>{admin ? children : null}</>;
};

export default OnlyAdmin;
