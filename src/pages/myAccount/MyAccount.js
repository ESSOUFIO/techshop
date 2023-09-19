import React, { useState } from "react";
import styles from "./MyAccount.module.scss";
import myAccountImg from "../../assets/images/Personal data-rafiki.png";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/authSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/images/loader/Spinner.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uid = useSelector(selectUserID);
  const user = useFetchDocument("users", uid);
  const navigate = useNavigate();

  const logOutHandler = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully..");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className={`--container ${styles.myAccount}`}>
        <h3>My Account Informations</h3>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={myAccountImg} alt="Personal Data" />
          </div>

          <div className={styles.content}>
            <div className={styles.card}>
              <h6>Account informations</h6>
              {user.isLoading ? (
                <div>
                  <img src={spinner} alt="Loading.." width={100} />
                </div>
              ) : (
                user.data && (
                  <table>
                    <tbody>
                      <tr>
                        <th scope="row">User Name</th>
                        <td>{user.data.name}</td>
                      </tr>

                      <tr>
                        <th scope="row">Email</th>
                        <td>{user.data.email}</td>
                      </tr>

                      <tr>
                        <th scope="row">Address</th>
                        {user.data.address !== "" && (
                          <td>
                            <p>{user.data.address.line1}</p>
                            <p>
                              {user.data.address.line2},{" "}
                              {user.data.address.postal_code},{" "}
                              {user.data.address.city}
                            </p>
                            <p>
                              {user.data.address.state},{" "}
                              {user.data.address.country.name}
                            </p>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                )
              )}
            </div>
            <div className={styles.links}>
              <Link to={"/my-address"}>My default Address</Link>
              <Link to={"/my-orders"}>My Orders</Link>
              <Link to={"/wish-list"}>My Wish List</Link>
              <button onClick={logOutHandler}>Log Out</button>
            </div>
          </div>
        </div>

        <div className={styles.links}></div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default MyAccount;
