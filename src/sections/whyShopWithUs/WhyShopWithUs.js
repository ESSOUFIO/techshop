import React from "react";
import styles from "./WhyShopWithUs.module.scss";
import { Link } from "react-router-dom";
import freeShipIcon from "../../assets/icons/free-shipping-128.png";
import flashIcon from "../../assets/icons/flash-sale-128.png";
import calendarIcon from "../../assets/icons/calendar-128.png";
import cashbackIcon from "../../assets/icons/refund-128.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const Card = ({ iconImg, title, desc, width }) => {
  return (
    <div className={styles.card}>
      <img src={iconImg} alt={title} style={{ width: width }} />
      <h4>{title}</h4>
      <p>{desc}</p>
      <Link to="">Learn more</Link>
    </div>
  );
};

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const WhyShopWithUs = () => {
  return (
    <div className={styles.whyShopXithUs}>
      <div className={styles.container}>
        <h2>
          <span>Why shop </span>with us?
        </h2>
        <div className={styles.carousel}>
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "38px",
            }}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            className={styles.mySwipe}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            breakpoints={{
              520: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              850: {
                slidesPerView: 3,
                spaceBetween: 30,
              },

              1100: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide>
              <Card
                iconImg={freeShipIcon}
                title={"Free Shipping On First Order"}
                desc={"Place your first order and get free shipping"}
                width={"80px"}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card
                iconImg={flashIcon}
                title={"Weekly Flash Sale"}
                desc={"We offer best deal each week"}
                width={"80px"}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card
                iconImg={calendarIcon}
                title={"Annual Payment Discount"}
                desc={"Don't miss our annual payment discount"}
                width={"80px"}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card
                iconImg={cashbackIcon}
                title={"Cashback Reward Program"}
                desc={"Enjoy our interesting cashback reward program"}
                width={"80px"}
              />
            </SwiperSlide>

            <MarginPagination />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default WhyShopWithUs;
