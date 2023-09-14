import React from "react";
import styles from "./MyAccount.module.scss";
import myAccountImg from "../../assets/images/Personal data-rafiki.png";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "../../redux/authSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/images/loader/Spinner.png";

const MyAccount = () => {
  const uid = useSelector(selectUserID);
  const user = useFetchDocument("users", uid);

  console.log(uid, user);
  return (
    <div className={`--container ${styles.myAccount}`}>
      <h3>My Account Informations</h3>
      <div className={styles.info}>
        <div className={styles.img}>
          <img src={myAccountImg} alt="Personal Data" />
        </div>
        {user.isLoading ? (
          <div>
            <img src={spinner} alt="Loading.." width={100} />
          </div>
        ) : (
          user.data && (
            <div className={styles.content}>
              <div className={styles.card}>
                <h6>Account informations</h6>
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
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.links}>
                <button>My default Address</button>
                <button>My Orders</button>
                <button>My Wish List</button>
                <button>Log Out</button>
              </div>
            </div>
          )
        )}
      </div>

      <div className={styles.links}></div>
    </div>
  );
};

export default MyAccount;
