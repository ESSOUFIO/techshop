import React from "react";
import styles from "./Home.module.scss";
import cyberMondayImg from "../../assets/images/banners/cyber-monday.jpg";
import cyberMondayMBImg from "../../assets/images/banners/cyber-monday-mb.jpg";
import {
  FlashDeals,
  HeroSection,
  NewProducts,
  PoliciesBanner,
  SpotLight,
  TopCategories,
} from "../../sections";

const CyberMondayBanner = () => {
  return (
    <>
      <div className={styles.img}>
        <img src={cyberMondayImg} alt="Cyber Monday" />
      </div>
      <div className={styles.imgMobile}>
        <img src={cyberMondayMBImg} alt="Cyber Monday" />
      </div>
    </>
  );
};

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <PoliciesBanner />
      <SpotLight />
      <FlashDeals />
      <CyberMondayBanner />
      <TopCategories />
      <NewProducts />
    </div>
  );
};

export default Home;
