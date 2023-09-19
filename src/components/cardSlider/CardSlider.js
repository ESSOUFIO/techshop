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
import { Link } from "react-router-dom";

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

const CardSlider = ({
  title,
  titleColor,
  banner,
  textAlign,
  productList,
  id,
}) => {
  return (
    <div className={styles.cardSlider} id={id}>
      <h1 style={{ color: `${titleColor}`, textAlign: `${textAlign}` }}>
        {title}
      </h1>
      <Link to={`/collections/${banner}`} className={styles.seeAll}>
        See All
      </Link>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        className={styles.mySwipe}
        pagination={{ clickable: true }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: true,
        // }}
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
        {productList?.map((prod) => {
          const {
            id,
            name,
            brand,
            images,
            price,
            newPrice,
            offValue,
            desc,
            reviewsNbr,
            reviewsRate,
          } = prod;
          return (
            <SwiperSlide key={prod.id}>
              <CardProduct
                img1={images[0].url}
                img2={images[1] ? images[1].url : images[0].url}
                name={name}
                brand={brand}
                offValue={offValue}
                newPrice={newPrice}
                price={price}
                id={id}
                desc={desc}
                reviewsNbr={reviewsNbr}
                reviewsRate={reviewsRate}
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
