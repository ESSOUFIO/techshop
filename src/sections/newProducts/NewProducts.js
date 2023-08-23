import React, { useEffect, useState } from "react";
import styles from "./NewProducts.module.scss";
import bannerImg from "../../assets/images/banners/we-have-vr.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import CardProduct from "../../components/cardProduct/CardProduct";

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const NewProducts = ({ products }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "New Products");
    setProds(array);
  }, [products]);
  return (
    <>
      {prods.length && (
        <div className={styles.newProducts}>
          <h2>New Products</h2>
          <div className={styles.container}>
            <div className={styles.carousel}>
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
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  500: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                {prods.map((prod) => {
                  return (
                    <SwiperSlide key={prod.id}>
                      <CardProduct
                        img1={prod.images[0].url}
                        img2={prod.images[1].url}
                        title={prod.name}
                        brand={prod.brand}
                        offValue={prod.offValue}
                        newPrice={prod.newPrice}
                        price={prod.price}
                        id={prod.id}
                      />
                    </SwiperSlide>
                  );
                })}
                <MarginPagination />
              </Swiper>
            </div>
            <div className={styles.banner}>
              <img src={bannerImg} alt="We have VR" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProducts;
