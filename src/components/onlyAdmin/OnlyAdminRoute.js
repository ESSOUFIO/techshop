import { useSelector } from "react-redux";
import { selectIsAdmin } from "../../redux/authSlice";
import styles from "./OnAdminRoute.module.scss";
import BackHomeBtn from "../backHomeBtn/BackHomeBtn";

const OnlyAdminRoute = ({ children }) => {
  const isAdmin = useSelector(selectIsAdmin);
  return (
    <>
      {isAdmin ? (
        children
      ) : (
        <div className={styles.permissionDenied}>
          <h2>Permission Denied</h2>
          <p>This page can be viewed only by admins.</p>
          <BackHomeBtn />
        </div>
      )}
    </>
  );
};

export default OnlyAdminRoute;
