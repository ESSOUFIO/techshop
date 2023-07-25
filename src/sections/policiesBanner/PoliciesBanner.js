import styles from "./PoliciesBanner.module.scss";
import shippingIcon from "../../assets/icons/fast-delivery.png";
import guaranteeIcon from "../../assets/icons/guarantee.png";
import trophyIcon from "../../assets/icons/award.png";

//Swiper -- Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./carousel.css";

const PoliciesBanner = () => {
  return (
    <>
      <div className={styles.policiesBanner}>
        <div className={styles.container}>
          <div className={styles["first-item"]}>
            <div>
              <img
                src={shippingIcon}
                alt="Free Shipping"
                style={{ width: "40px" }}
              />
            </div>
            <p className={styles.text}>Free Shipping & Returns</p>
          </div>
          <div className={styles.item}>
            <div>
              <img src={guaranteeIcon} alt="Lowest Price Guarantee" />
            </div>
            <p className={styles.text}>Lowest Price Guarantee</p>
          </div>
          <div className={styles.item}>
            <div>
              <img src={trophyIcon} alt="Longest Warranties Offer" />
            </div>
            <p className={styles.text}>Longest Warranties Offer</p>
          </div>
        </div>
      </div>

      <div className={styles.policiesBanner__cardSlider}>
        <div className={styles.wrapper}>
          <div
            className={`${styles.carousel} ${styles["swiper-button-next"]} `}
          >
            <Swiper
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
              }}
              modules={[Autoplay, Navigation, Pagination]}
              pagination={{ clickable: true }}
              // loop={true}
              navigation={true}
              className="mySwiper"
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },

                768: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
              }}
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <div className={styles.item}>
                  <div>
                    <img
                      src={shippingIcon}
                      alt="Free Shipping"
                      style={{ width: "40px" }}
                    />
                  </div>
                  <p className={styles.text}>Free Shipping & Returns</p>
                </div>
              </SwiperSlide>
              {/* Slide 2 */}
              <SwiperSlide>
                <div className={styles.item}>
                  <div>
                    <img src={guaranteeIcon} alt="Free Shipping" />
                  </div>
                  <p className={styles.text}>Lowest Price Guarantee</p>
                </div>
              </SwiperSlide>
              {/* Slide 3 */}
              <SwiperSlide>
                <div className={styles.item}>
                  <div>
                    <img src={trophyIcon} alt="Longest Warranties Offer" />
                  </div>
                  <p className={styles.text}>Longest Warranties Offer</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoliciesBanner;
