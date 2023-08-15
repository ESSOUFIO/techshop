import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import cyberMondayImg from "../../assets/images/banners/cyber-monday.jpg";
import cyberMondayMBImg from "../../assets/images/banners/cyber-monday-mb.jpg";
import tvImg from "../../assets/images/banners/televisions.webp";
import tvMbImg from "../../assets/images/banners/televisions-mb.jpg";
import homeAppImg from "../../assets/images/banners/home-appliance.webp";
import homeAppMbImg from "../../assets/images/banners/home-appliance-mb.jpg";
import {
  FlashDeals,
  HeroSection,
  NewProducts,
  PoliciesBanner,
  PoliciesSection,
  SpotLight,
  TopCategories,
  TopHomeAppliance,
  TopTelevision,
} from "../../sections";
import FeaturedBrands from "../../sections/featuredBrands/FeaturedBrands";
import WhyShopWithUs from "../../sections/whyShopWithUs/WhyShopWithUs";

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

const HomeApplianceBanner = () => {
  return (
    <>
      <div className={styles.img}>
        <img src={homeAppImg} alt="Home Appliance" />
      </div>
      <div className={styles.imgMobile}>
        <img src={homeAppMbImg} alt="Home Appliance" />
      </div>
    </>
  );
};

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    // <div></div>
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
      <TopHomeAppliance />
      <HomeApplianceBanner />
      <FeaturedBrands />
      <WhyShopWithUs />
    </div>
  );
};

export default Home;
