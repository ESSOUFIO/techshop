import React from "react";
import styles from "./Home.module.scss";
import HeroSection from "../../sections/heroSection/HeroSection";
import PoliciesBanner from "../../sections/policiesBanner/PoliciesBanner";
import SpotLight from "../../sections/spotlight/SpotLight";
import FlashDeals from "../../sections/flashDeals/FlashDeals";
import cyberMondayImg from "../../assets/images/cyber-monday.jpg";
import cyberMondayMBImg from "../../assets/images/cyber-monday-mb.jpg";

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
    </div>
  );
};

export default Home;
