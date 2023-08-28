import React, { useEffect, useState } from "react";
import styles from "./QuickView.module.scss";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
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
import QuantityHandler from "../quantityHandler/QuantityHandler";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import FormatPrice from "../formatPrice/FormatPrice";
import { ADD_TO_CART } from "../../redux/cartSlice";
import { useNavigate } from "react-router";

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const QuickView = ({ prodID, onHide }) => {
  const [product, setProduct] = useState(null);
  const [mainPhoto, setMainPhoto] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(null);

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCard = () => {
    const item = {
      id: product.id,
      name: product.name,
      newPrice: product.newPrice,
      image: product.images[0].url,
      brand: product.brand,
      quantity: 1,
    };
    dispatch(ADD_TO_CART(item));
  };

  const checkoutHandler = () => {
    addToCard();
    navigate("/checkout-details");
  };

  useEffect(() => {
    setSubtotal(product?.newPrice * quantity);
  }, [quantity, product]);

  useEffect(() => {
    const prod = products.find((item) => item.id === prodID);
    if (prod) {
      setProduct(prod);
      setMainPhoto(prod.images[0].url);
      setSubtotal(Number(prod.price));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodID, products]);

  return ReactDOM.createPortal(
    <div className={styles.quickView}>
      <div className={styles.contentWrap}>
        {product !== null && (
          <div className={styles.content}>
            <div className={styles.topSection}>
              <div className={styles.photos}>
                <div className={styles.img}>
                  <img src={mainPhoto} alt={product.name} />
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
                    {product.images.map((image, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div
                            className={styles.img}
                            onClick={() => setMainPhoto(image.url)}
                          >
                            <img src={image.url} alt={product.name} />
                          </div>
                        </SwiperSlide>
                      );
                    })}

                    <MarginPagination />
                  </Swiper>
                </div>
              </div>

              <div className={styles.details}>
                <h3>{product.name}</h3>
                <p>
                  Brand: <b>{product.brand}</b>
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

                <div className={styles.desc}>{product.desc}</div>

                <div className={styles.priceWrap}>
                  <div className={styles.price}>
                    <FormatPrice price={product.newPrice} />
                    <span>${Number(product.price).toFixed(2)}</span>
                  </div>

                  {product.offValue && (
                    <div className={styles.save}>
                      <p>{product.offValue}% OFF</p>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className={styles.quantityWrap}>
                  <p>Quantity:</p>
                  <QuantityHandler
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </div>

                {/* Subtotal */}
                <div className={styles.subtotal}>
                  <p>
                    Subtotal: <span>${subtotal.toFixed(2)}</span>
                  </p>
                </div>
                {/* Add To Cart */}
                <div className={styles.addToCart}>
                  <button className="--rounded" onClick={addToCard}>
                    Add to Cart
                  </button>
                  <div className={styles.wish}>
                    <GoHeart size={30} />
                  </div>
                </div>

                {/* Checkout*/}
                <div className={styles.checkout}>
                  <button className="--rounded" onClick={checkoutHandler}>
                    Buy it Now
                  </button>
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
                    <SwiperSlide key={index}>
                      <ReviewCard
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
        )}

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
