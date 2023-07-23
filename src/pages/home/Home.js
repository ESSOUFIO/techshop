import React from "react";
import styles from "./Home.module.scss";
import HeroSection from "../../sections/heroSection/HeroSection";

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
    </div>
  );
};

export default Home;
