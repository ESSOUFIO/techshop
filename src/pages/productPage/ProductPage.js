import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";

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
import spinner from "../../assets/images/loader/Spinner.png";

import trustImg from "../../assets/images/trust-banner.webp";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import CardSlider from "../../components/cardSlider/CardSlider";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import FormatPrice from "../../components/formatPrice/FormatPrice";
import { ADD_TO_CART } from "../../redux/cartSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";

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
  const [reviewAverage, setReviewAverage] = useState(0);
  const [reviewNbr, setReviewNbr] = useState(0);

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useFetchCollection(`products/${id}/reviews`);

  const incrementQty = () => {
    setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity >= 2) setQuantity(quantity - 1);
  };

  useEffect(() => {
    setSubtotal(product?.newPrice * quantity);
  }, [quantity, product]);

  useEffect(() => {
    if (reviews.data !== null) {
      setReviewNbr(reviews.data.length);
      let averg = 0;
      reviews.data.forEach((review) => {
        averg += review.rating;
      });
      setReviewAverage(averg / reviewNbr);
    }
  }, [reviews.data, reviewNbr]);

  useEffect(() => {
    const array = products.filter(
      (prod) => prod.category === product?.category
    );
    setSameProds(array);
  }, [id, product, products]);

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
      <BreadCrumb page1={product?.name} />

      {product && (
        <div className={styles.productPage}>
          <div className={`--container ${styles.contentWrap}`}>
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
                      <StarsRating value={reviewAverage} disabled={true} />
                    </div>
                    <a href="#reviews" className={styles.nbrReview}>
                      {reviewNbr} reviews
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

          {/* Reviews */}
          {reviews.isLoading ? (
            <div>
              <img src={spinner} alt="Loading.." width={100} />
            </div>
          ) : (
            <div id="reviews" className={styles.reviewsWrap}>
              <h5>Customers Reviews</h5>
              {reviews.data.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                  This product doesn't have any reviews yet.
                </p>
              ) : (
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
                  {reviews.data.map((review, index) => {
                    const { userName, address, rating, text } = review;
                    return (
                      <SwiperSlide key={index}>
                        <ReviewCard
                          userName={userName}
                          address={address}
                          rating={rating}
                          text={text}
                        />
                      </SwiperSlide>
                    );
                  })}

                  <MarginPagination />
                </Swiper>
              )}
            </div>
          )}

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
