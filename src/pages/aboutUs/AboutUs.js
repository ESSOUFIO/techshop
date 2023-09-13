import React from "react";
import styles from "./AboutUs.module.scss";
import aboutImg from "../../assets/images/About_us.png";
import shippingIcon from "../../assets/icons/fast-delivery.png";
import guaranteeIcon from "../../assets/icons/guarantee.png";
import trophyIcon from "../../assets/icons/award.png";
import supportIcon from "../../assets/icons/customer-support.png";

const AboutUs = () => {
  return (
    <div className={`--container ${styles.aboutUs}`}>
      <h2>Who We Are</h2>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={aboutImg} alt="About Us" />
        </div>
        <div className={styles.card}>
          <h4>Omar ESSOUFI</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            velit laoreet id donec ultrices tincidunt. Diam ut venenatis tellus
            in metus. Nibh tellus molestie nunc non blandit massa enim.
            Vestibulum morbi blandit cursus risus at ultrices mi. Arcu cursus
            vitae congue mauris rhoncus aenean vel. Sem viverra aliquet eget sit
            amet tellus. Pretium quam vulputate dignissim suspendisse in est
            ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor
            posuere ac ut.
          </p>
          <p>
            Sit amet cursus sit amet dictum. Nec sagittis aliquam malesuada
            bibendum arcu. Viverra ipsum nunc aliquet bibendum. Lacus sed turpis
            tincidunt id aliquet risus feugiat. Dui vivamus arcu felis bibendum
            ut tristique et egestas quis. Amet consectetur adipiscing elit duis.
            Dolor purus non enim praesent elementum facilisis. Lobortis mattis
            aliquam faucibus purus. Eget gravida cum sociis natoque penatibus.
            Posuere lorem ipsum dolor sit amet consectetur.
          </p>
          <div className={styles.policies}>
            <div className={styles.item}>
              <div>
                <img src={shippingIcon} alt="Free Shipping" />
              </div>
              <p className={styles.text}>Free Shipping & Returns</p>
            </div>
            <div className={styles.item}>
              <div>
                <img src={guaranteeIcon} alt="Lowest Price Guarantee" />
              </div>
              <p className={styles.text}>Lowest Price Guarantee</p>
            </div>
            <div className={styles.item}>
              <div>
                <img src={trophyIcon} alt="Longest Warranties Offer" />
              </div>
              <p className={styles.text}>Longest Warranties Offer</p>
            </div>
            <div className={styles.item}>
              <div>
                <img src={supportIcon} alt="24/7 Customer Support" />
              </div>
              <p className={styles.text}>24/7 Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
