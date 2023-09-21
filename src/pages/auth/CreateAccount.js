import React, { useState } from "react";
import styles from "./auth.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import Input from "../../components/input/Input";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import registerImg from "../../assets/images/login/register-edited.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/authSlice";
import { useEffect } from "react";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  //protect router
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const addUser = async (user) => {
    // create user document on Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      wishList: [],
      address: "",
      createAt: Timestamp.now().toDate(),
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: firstName + " " + lastName,
        }).then(() => {
          // Signed in
          const user = userCredential.user;
          addUser(user);

          toast.success(`Hi ${user.displayName}! Registration Successful..`);
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <BreadCrumb page1={"Register"} />
      <div className={styles.auth}>
        <div className={styles.img}>
          <img src={registerImg} alt="register" />
        </div>
        <div className={styles.card}>
          <h2>Create Account</h2>
          <p>Please register below to create an account</p>
          <form onSubmit={registerHandler}>
            <Input
              type="text"
              placeholder="First Name"
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last Name."
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email Address"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.marketing}>
              <input
                className="form-check-input"
                type="checkbox"
                id="emailMarketing"
              />
              <label htmlFor="emailMarketing">
                Subscribe To Email Marketing
              </label>
            </div>
            <ButtonPrimary text={"Create An Account"} />
            <div className={styles.links}>
              <p>Already have an account?</p>
              <Link to={"/auth/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default CreateAccount;
