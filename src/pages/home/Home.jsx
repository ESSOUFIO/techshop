import React from "react";
import styles from "./Home.module.css";
import { HeaderLargeScreen } from "../../components/index";

const Home = () => {
  return (
    <div className={styles.home}>
      <HeaderLargeScreen />
    </div>
  );
};

export default Home;
