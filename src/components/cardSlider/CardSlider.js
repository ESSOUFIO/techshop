import React from "react";
import styles from "./CardSlider.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useSwiper } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import CardProduct from "../cardProduct/CardProduct";

const NavigationButtons = () => {
  const swiper = useSwiper();
  return (
    <div>
      <button className={styles.navNext} onClick={() => swiper.slideNext()}>
        <GrFormNext size={22} />
      </button>
      <button className={styles.navPrev} onClick={() => swiper.slidePrev()}>
        <GrFormPrevious size={22} />
      </button>
    </div>
  );
};

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const CardSlider = ({ title, titleColor, productList }) => {
  return (
    <div className={styles.cardSlider}>
      <h1 style={{ color: `${titleColor}` }}>{title}</h1>

      <Swiper
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
          400: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {productList.map((prod) => {
          return (
            <SwiperSlide key={prod.id}>
              <CardProduct
                img1={prod.image_1}
                img2={prod.image_2}
                title={prod.title}
                offValue={prod.offValue}
                lastPrice={prod.lastPrice}
                price={prod.price}
              />
            </SwiperSlide>
          );
        })}

        <NavigationButtons />
        <MarginPagination />
      </Swiper>
    </div>
  );
};

export default CardSlider;
