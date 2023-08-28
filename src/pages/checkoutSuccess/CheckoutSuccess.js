import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutSuccess.module.scss";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";

import successImg from "../../assets/images/Successful purchase.png";
import Card from "../../components/card/Card";
import ButtonSecondary from "../../components/buttonSecondary/ButtonSecondary";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className={`--container ${styles.checkoutSuccess}`}>
        <div className={styles.content}>
          <Card cardClass={styles.card}>
            <h3>Checkout Successful</h3>
            <h6>Your purchase was successful!</h6>
            <p>Thank you for your purchase.</p>
            <br />
            <br />
            <ButtonPrimary
              text={"View Order Status"}
              onClick={() => navigate("/order-status")}
              className={styles.btn}
            />
            <ButtonSecondary
              text={"Back to Home"}
              onClick={() => navigate("/")}
              className={styles.btn}
            />
          </Card>
          <Card cardClass={styles.card}>
            <div className={styles.img}>
              <img src={successImg} alt="Purchase successful" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
