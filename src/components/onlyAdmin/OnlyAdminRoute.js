import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";

const OnlyAdminRoute = ({ children }) => {
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
  return <>{admin ? children : <h2>Permission Denied!!</h2>}</>;
};

export default OnlyAdminRoute;
