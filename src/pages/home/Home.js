import React from "react";
import styles from "./Home.module.scss";
import HeroSection from "../../sections/heroSection/HeroSection";
import PoliciesBanner from "../../sections/policiesBanner/PoliciesBanner";
import SpotLight from "../../sections/spotlight/SpotLight";
import FlashDeals from "../../sections/flashDeals/FlashDeals";

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <PoliciesBanner />
      <SpotLight />
      <FlashDeals />
    </div>
  );
};

export default Home;
