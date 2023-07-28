import React from "react";
import styles from "./Home.module.scss";
import cyberMondayImg from "../../assets/images/banners/cyber-monday.jpg";
import cyberMondayMBImg from "../../assets/images/banners/cyber-monday-mb.jpg";
import tvImg from "../../assets/images/banners/televisions.webp";
import tvMbImg from "../../assets/images/banners/televisions-mb.jpg";
import {
  FlashDeals,
  HeroSection,
  NewProducts,
  PoliciesBanner,
  PoliciesSection,
  SpotLight,
  TopCategories,
  TopTelevision,
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

const TelevisionBanner = () => {
  return (
    <>
      <div className={styles.img}>
        <img src={tvImg} alt="Televisions" />
      </div>
      <div className={styles.imgMobile}>
        <img src={tvMbImg} alt="Televisions" />
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
      <PoliciesSection />
      <TopTelevision />
      <TelevisionBanner />
    </div>
  );
};

export default Home;
