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
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: firstName + " " + lastName,
        }).then(() => {
          // Signed in
          const user = userCredential.user;
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
