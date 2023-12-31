import React from "react";
import styles from "./HeroSection.module.scss";
import backLargeImg from "../../assets/images/banners/hero-section.jpg";
import backMobileImg from "../../assets/images/banners/hero-section-mb.jpg";
import affirmImg from "../../assets/icons/affirm.png";

const HeroSection = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.largeImg}>
          <img src={backLargeImg} alt="techshop slider" />
        </div>
        <div className={styles.mobileImg}>
          <img src={backMobileImg} alt="techshop slider" />
        </div>

        <div className={styles.titles}>
          <h1>
            <span>Huge Saving</span> on UHD Televisions
          </h1>
          <p>Sale up to 70% off on selected items*</p>

          <a href="/#televisions" style={{ color: "#fff" }}>
            Shop Now
          </a>
        </div>
      </div>

      <div className={styles.affirm}>
        <div className={styles.logo}>
          <img src={affirmImg} alt="Affirm" />
        </div>
        <p>BUY NOW, PAY LATER STARTING AT 0% APR</p>

        <button>LEARN MORE</button>
      </div>
    </>
  );
};

export default HeroSection;
