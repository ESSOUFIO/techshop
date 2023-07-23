import React from "react";
import styles from "./Home.module.scss";
import HeroSection from "../../sections/heroSection/HeroSection";
import PoliciesBanner from "../../sections/policiesBanner/PoliciesBanner";

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <PoliciesBanner />
    </div>
  );
};

export default Home;
