import React from "react";
import styles from "./FeaturedBrands.module.scss";
import samsungImg from "../../assets/images/brands/Samsung_Logo.svg.webp";
import appleImg from "../../assets/images/brands/apple.png";
import hpImg from "../../assets/images/brands/hp.png";
import asusImg from "../../assets/images/brands/asus.png";
import lgImg from "../../assets/images/brands/lg.png";
import tclImg from "../../assets/images/brands/tcl.png";
import huaweiImg from "../../assets/images/brands/huawei2.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const Brand = ({ brandImg, name, width }) => {
  return (
    <div className={styles.card}>
      <div className={styles.brand}>
        <img src={brandImg} alt={name} style={{ width: width }} />
      </div>
    </div>
  );
};

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const FeaturedBrands = () => {
  return (
    <div className={styles.featuredBrands}>
      <h2>Featured Brands</h2>
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
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          560: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          750: {
            slidesPerView: 4,
            spaceBetween: 20,
          },

          1100: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <Brand brandImg={samsungImg} name={"Samsung"} width={"150px"} />
        </SwiperSlide>

        <SwiperSlide>
          <Brand brandImg={lgImg} name={"LG"} width={"120px"} />
        </SwiperSlide>

        <SwiperSlide>
          <Brand brandImg={appleImg} name={"Apple"} width={"100px"} />
        </SwiperSlide>

        <SwiperSlide>
          <Brand brandImg={huaweiImg} name={"Huawei"} width={"130px"} />
        </SwiperSlide>

        <SwiperSlide>
          <Brand brandImg={asusImg} name={"ASUS"} width={"135px"} />
        </SwiperSlide>

        <SwiperSlide>
          <Brand brandImg={hpImg} name={"HP"} width={"100px"} />
        </SwiperSlide>

        <SwiperSlide>
          <Brand brandImg={tclImg} name={"TCL"} width={"130px"} />
        </SwiperSlide>
        <MarginPagination />
      </Swiper>
    </div>
  );
};

export default FeaturedBrands;
