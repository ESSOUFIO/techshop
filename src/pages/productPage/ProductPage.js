import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import reviews from "../../reviews.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import StarsRating from "react-star-rate";
import { GoHeart } from "react-icons/go";
import { FaShippingFast } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { GoShieldCheck } from "react-icons/go";

import trustImg from "../../assets/images/trust-banner.webp";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import CardSlider from "../../components/cardSlider/CardSlider";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";

const MarginPagination = () => {
  return <div style={{ height: "30px" }}></div>;
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainPhoto, setMainPhoto] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(null);
  const [sameProds, setSameProds] = useState([]);

  const products = useSelector(selectProducts);

  const incrementQty = () => {
    setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity >= 2) setQuantity(quantity - 1);
  };

  useEffect(() => {
    setSubtotal(product?.price * quantity);
  }, [quantity, product]);

  useEffect(() => {
    const array = products.filter(
      (prod) => prod.category === product?.category
    );
    setSameProds(array);
  }, [id, product, products]);

  //Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const prod = products.find((item) => item.id === id);
    if (prod) {
      setProduct(prod);
      setMainPhoto(prod.images[0].url);
      setSubtotal(Number(prod.price));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, products]);

  return (
    <>
      <BreadCrumb page1={product?.title} />

      {product && (
        <div className={styles.productPage}>
          <div className={`--container ${styles.contentWrap}`}>
            <div className={styles.content}>
              <div className={styles.topSection}>
                <div className={styles.photos}>
                  <div className={styles.img}>
                    <img src={mainPhoto} alt={product.title} />
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
                              <img src={image.url} alt={product.title} />
                            </div>
                          </SwiperSlide>
                        );
                      })}

                      <MarginPagination />
                    </Swiper>
                  </div>
                </div>

                <div className={styles.details}>
                  <h3>{product.title}</h3>
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
                      ${product.price}
                      <span>${product.lastPrice}</span>
                    </div>

                    {product.offValue && (
                      <div className={styles.save}>
                        <p>{product.offValue} OFF</p>
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

                  {/* Free Shipping */}
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <FaShippingFast
                            size={22}
                            style={{ marginRight: "20px" }}
                          />
                        </td>
                        <td>
                          <h6>
                            Free Shipping{" "}
                            <IoIosHelpCircle
                              size={18}
                              color="lightgray"
                              style={{ marginLeft: "10px" }}
                            />
                          </h6>

                          <p>Free standard shipping on orders over $99</p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <GoShieldCheck
                            size={22}
                            style={{ marginRight: "20px" }}
                          />
                        </td>
                        <td>
                          <h6>
                            Free Return{" "}
                            <IoIosHelpCircle
                              size={18}
                              color="lightgray"
                              style={{ marginLeft: "10px" }}
                            />
                          </h6>

                          <a href="#/">Lean more</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Trust */}
                  <div className={styles.trust}>
                    <img src={trustImg} alt="trust" />
                  </div>
                </div>
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

          <CardSlider
            title={"Related Products"}
            textAlign={"center"}
            productList={sameProds}
          />
        </div>
      )}
    </>
  );
};

export default ProductPage;
