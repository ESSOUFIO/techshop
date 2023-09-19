import React, { useEffect, useState } from "react";
import styles from "./NewProducts.module.scss";
import bannerImg from "../../assets/images/banners/we-have-vr.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import CardProduct from "../../components/cardProduct/CardProduct";
import { Link } from "react-router-dom";

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const NewProducts = ({ products }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const array = products.filter((prod) => prod.banner === "new_products");
    setProds(array);
  }, [products]);

  return (
    <>
      {prods.length && (
        <div className={styles.newProducts}>
          <h2>New Products</h2>
          <Link to={`/collections/new_products`} className={styles.seeAll}>
            See All
          </Link>
          <div className={styles.container}>
            <div className={styles.carousel}>
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                className={styles.mySwipe}
                pagination={{ clickable: true }}
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
                  const {
                    id,
                    name,
                    brand,
                    images,
                    price,
                    newPrice,
                    desc,
                    offValue,
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
                        reviewsNbr={reviewsNbr}
                        reviewsRate={reviewsRate}
                        desc={desc}
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
