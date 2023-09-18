import styles from "./FeaturedBrands.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import useFetchCollection from "../../customHooks/useFetchCollection";
import spinner from "../../assets/images/loader/Spinner.png";
import { useEffect, useState } from "react";

const Brand = ({ brandImg, name }) => {
  return (
    <div className={styles.card}>
      <div className={styles.brand}>
        <img src={brandImg} alt={name} style={{ width: "100%" }} />
      </div>
    </div>
  );
};

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const FeaturedBrands = () => {
  const [dispBrands, setDispBrands] = useState([]);
  const brands = useFetchCollection("brands", "name");

  useEffect(() => {
    const array = brands.data.filter((brand) => brand.image !== null);
    setDispBrands(array);
  }, [brands.data]);

  return (
    <div className={styles.featuredBrands}>
      <h2>Featured Brands</h2>
      {brands.isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={spinner} alt="Loading.." width={100} />
        </div>
      ) : (
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
          {dispBrands.map((brand) => {
            return (
              <SwiperSlide key={brand.name}>
                <Brand brandImg={brand.image.url} name={brand.name} />
              </SwiperSlide>
            );
          })}

          <MarginPagination />
        </Swiper>
      )}
    </div>
  );
};

export default FeaturedBrands;
