import React, { useEffect, useState } from "react";
import styles from "./QuickView.module.scss";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import products from "../../products.json";
import reviews from "../../reviews.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import StarsRating from "react-star-rate";
import { GoHeart } from "react-icons/go";
import trustImg from "../../assets/images/trust-banner.webp";
import ReviewCard from "../reviewCard/ReviewCard";

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const QuickView = ({ prodID, onHide }) => {
  const [mainPhoto, setMainPhoto] = useState(products[prodID].image_1);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(Number(products[prodID].price));

  const incrementQty = () => {
    setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity >= 2) setQuantity(quantity - 1);
  };

  useEffect(() => {
    setSubtotal(products[prodID].price * quantity);
  }, [quantity, prodID]);

  return ReactDOM.createPortal(
    <div className={styles.quickView}>
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <div className={styles.topSection}>
            <div className={styles.photos}>
              <div className={styles.img}>
                <img src={mainPhoto} alt={products[prodID].title} />
              </div>
              {/* Carousel */}
              <div className={styles.carousel}>
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-navigation-size": "38px",
                  }}
                  modules={[Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView={3}
                  className={styles.mySwipe}
                  pagination={{ clickable: true }}
                  navigation
                >
                  <SwiperSlide>
                    <div
                      className={styles.img}
                      onClick={() => setMainPhoto(products[prodID].image_1)}
                    >
                      <img
                        src={products[prodID].image_1}
                        alt={products[prodID].title}
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div
                      className={styles.img}
                      onClick={() => setMainPhoto(products[prodID].image_2)}
                    >
                      <img
                        src={products[prodID].image_2}
                        alt={products[prodID].title}
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div
                      className={styles.img}
                      onClick={() => setMainPhoto(products[prodID].image_1)}
                    >
                      <img
                        src={products[prodID].image_1}
                        alt={products[prodID].title}
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={styles.img}>
                      <img
                        src={products[prodID].image_2}
                        alt={products[prodID].title}
                      />
                    </div>
                  </SwiperSlide>

                  <MarginPagination />
                </Swiper>
              </div>
            </div>

            <div className={styles.details}>
              <h3>{products[prodID].title}</h3>
              <p>
                Brand: <b>{products[prodID].brand}</b>
              </p>
              {/* Reviews */}
              <div className={styles.review}>
                <div className={styles.stars}>
                  <StarsRating value={4.5} />
                </div>
                <a href="#reviews" className={styles.nbrReview}>
                  10 reviews
                </a>
              </div>

              <div className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>

              <div className={styles.priceWrap}>
                <div className={styles.price}>
                  ${products[prodID].price}
                  <span>${products[prodID].lastPrice}</span>
                </div>

                {products[prodID].offValue && (
                  <div className={styles.save}>
                    <p>{products[prodID].offValue} OFF</p>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className={styles.quantityWrap}>
                <p>Quantity:</p>
                <div className={styles.quantity}>
                  <button onClick={incrementQty}>+</button>
                  <label>{quantity}</label>
                  <button onClick={decrementQty}>-</button>
                </div>
              </div>

              {/* Subtotal */}
              <div className={styles.subtotal}>
                <p>
                  Subtotal: <span>${subtotal.toFixed(2)}</span>
                </p>
              </div>
              {/* Add To Cart */}
              <div className={styles.addToCart}>
                <button className="--rounded">Add to Cart</button>
                <div className={styles.wish}>
                  <GoHeart size={30} />
                </div>
              </div>

              {/* Checkout*/}
              <div className={styles.checkout}>
                <button className="--rounded">Buy it Now</button>
              </div>

              {/* Trust */}
              <div className={styles.trust}>
                <img src={trustImg} alt="trust" />
              </div>
            </div>
          </div>

          <div id="reviews" className={styles.reviewsWrap}>
            <h5>Customers Reviews</h5>
            <Swiper
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-navigation-size": "38px",
              }}
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              className={styles.mySwipe}
              pagination={{ clickable: true }}
              breakpoints={{
                620: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                860: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1050: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {reviews.map((review, index) => {
                const { userName, address, rating, title, text } = review;
                return (
                  <SwiperSlide>
                    <ReviewCard
                      key={index}
                      userName={userName}
                      address={address}
                      rating={rating}
                      title={title}
                      text={text}
                    />
                  </SwiperSlide>
                );
              })}

              <MarginPagination />
            </Swiper>
          </div>
        </div>

        {/* Close Btn */}
        <div className={styles.closeBtn} onClick={onHide}>
          <IoClose size={22} color="#fff" />
        </div>
      </div>
      <div className={styles.back} onClick={onHide}></div>
    </div>,
    document.getElementById("modal")
  );
};

export default QuickView;
