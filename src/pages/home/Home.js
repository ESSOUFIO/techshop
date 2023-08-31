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
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import { BiSolidUpArrow } from "react-icons/bi";

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
  const products = useSelector(selectProducts);

  const topPageHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    topPageHandler();
  }, []);

  return (
    <div className={styles.home}>
      <HeroSection />
      <PoliciesBanner />
      <SpotLight />
      <FlashDeals products={products} />
      <CyberMondayBanner />
      <TopCategories />
      <NewProducts products={products} />
      <PoliciesSection />
      <TopTelevision products={products} />
      <TelevisionBanner />
      <TopHomeAppliance products={products} />
      <HomeApplianceBanner />
      <FeaturedBrands />
      <WhyShopWithUs />

      <div className={styles.topPageBtn} onClick={topPageHandler}>
        <BiSolidUpArrow color="#fff" size={20} />
      </div>
    </div>
  );
};

export default Home;
