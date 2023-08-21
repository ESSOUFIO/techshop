import { useSelector } from "react-redux";
import { selectIsAdmin } from "../../redux/authSlice";

const OnlyAdmin = ({ children }) => {
  const isAdmin = useSelector(selectIsAdmin);
  return <>{isAdmin ? children : null}</>;
};

export default OnlyAdmin;
