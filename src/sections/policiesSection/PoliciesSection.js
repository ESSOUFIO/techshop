import React from "react";
import styles from "./PoliciesSection.module.scss";
import { FaWarehouse, FaStarHalfAlt, FaShippingFast } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { IoShieldHalfOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const PoliciyCard = ({ icon, title, desc }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {icon}
        <h5>{title}</h5>
        <p>{desc}</p>
      </div>
    </div>
  );
};

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const PoliciesSection = () => {
  return (
    <div className={styles.policiesSection}>
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
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        breakpoints={{
          520: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          750: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          1100: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <PoliciyCard
            icon={<FaStarHalfAlt size={60} color="#7f1dd8" />}
            title={"QUALITY AND SAVING"}
            desc={"Comprehensive quality control and affordable prices"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PoliciyCard
            icon={<FaWarehouse size={60} color="#7f1dd8" />}
            title={"GLOBAL WAREHOUSE"}
            desc={"37 overseas warehouses"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PoliciyCard
            icon={<FaShippingFast size={60} color="#7f1dd8" />}
            title={"FAST SHIPPING"}
            desc={"Fast and convenient door to door delivery"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PoliciyCard
            icon={<IoShieldHalfOutline size={60} color="#7f1dd8" />}
            title={"PAYMENT SECURITY"}
            desc={"More than 10 different secure payment methods"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PoliciyCard
            icon={<IoMdHelpCircle size={60} color="#7f1dd8" />}
            title={"HAVE QUESTIONS?"}
            desc={"24/7 Customer Service - We’re here and happy to help!"}
          />
        </SwiperSlide>
        <MarginPagination />
      </Swiper>
    </div>
  );
};

export default PoliciesSection;
