import React from "react";
import styles from "./WishList.module.scss";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productSlice";
import { selectWishList } from "../../redux/wishSlice";
import CardProduct from "../../components/cardProduct/CardProduct";
import BackHomeBtn from "../../components/backHomeBtn/BackHomeBtn";
import { selectIsLoggedIn } from "../../redux/authSlice";
import ButtonPrimary from "../../components/buttonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const [prods, setProds] = useState([]);

  const products = useSelector(selectProducts);
  const wishList = useSelector(selectWishList);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const getProd = (id) => {
      const prod = products.find((item) => item.id === id);
      return prod;
    };

    let array = [];
    wishList.forEach((item) => {
      const prod = getProd(item);
      array.push(prod);
    });
    setProds(array);
  }, [wishList, products]);

  useEffect(() => {
    //Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
      <BreadCrumb page1={"Wish List"} />
      <div className={`--container ${styles.wishList}`}>
        <h2>Wish List</h2>

        {!isLoggedIn ? (
          <div style={{ margin: "30px 0" }}>
            <p>You should log in to access your wish list.</p>
            <ButtonPrimary
              text={"Login Page"}
              style={{ maxWidth: "200px", marginTop: "20px" }}
              onClick={() => navigate("/auth/login")}
            />
          </div>
        ) : prods.length === 0 ? (
          <div style={{ margin: "30px 0" }}>
            <p>You haven't added any products to your wishlist yet.</p>
            <BackHomeBtn />
          </div>
        ) : (
          <div className={styles.content}>
            {prods.map((prod, index) => {
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
                <CardProduct
                  key={index}
                  img1={images[0].url}
                  img2={images[1] ? images[1].url : images[0].url}
                  name={name}
                  offValue={offValue}
                  newPrice={newPrice}
                  price={price}
                  brand={brand}
                  id={id}
                  desc={desc}
                  listView={true}
                  reviewsNbr={reviewsNbr}
                  reviewsRate={reviewsRate}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
