import React, { useEffect, useState } from "react";
import styles from "./CardProduct.module.scss";
import { GoHeart, GoHeartFill } from "react-icons/go";
import QuickView from "../quickView/QuickView";
import { useNavigate } from "react-router-dom";
import FormatPrice from "../formatPrice/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/cartSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectIsLoggedIn, selectUserID } from "../../redux/authSlice";
import { selectWishList } from "../../redux/wishSlice";
import { toast } from "react-toastify";
import LoginMenu from "../header/loginMenu/LoginMenu";

const CardProduct = ({
  img1,
  img2,
  name,
  brand,
  offValue,
  newPrice,
  price,
  id,
}) => {
  const [isWish, setIsWish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector(selectUserID);
  const wishList = useSelector(selectWishList);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const addToCard = () => {
    const item = { id, name, newPrice, image: img1, brand, quantity: 1 };
    dispatch(ADD_TO_CART(item));
  };

  const triggerShowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const wishListHandler = async () => {
    if (!isLoggedIn) {
      triggerShowUserMenu();
      return;
    }

    let newList = Array.from(wishList);
    setIsLoading(true);

    if (isWish) {
      const array = Array.from(wishList);
      newList = array.filter((item) => item !== id);
      toast.success(
        `"${name.substring(0, 20)}..." removed from your Wish List.`
      );
    } else {
      newList.push(id);
      toast.success(`"${name.substring(0, 20)}..." added to your Wish List.`);
    }

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      wishList: newList,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const array = Array.from(wishList);
    const addedToWish = array.includes(id);
    setIsWish(addedToWish);
  }, [wishList, id]);

  if (isLoading) {
    document.body.style.cursor = "wait";
  } else {
    document.body.style.cursor = "default";
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.images}>
          <div
            className={styles.img1}
            onClick={() => navigate(`/product/${id}`)}
          >
            <img src={img1} alt="product" />
          </div>

          <div
            className={styles.img2}
            onClick={() => navigate(`/product/${id}`)}
          >
            <img src={img2} alt="product" />
          </div>

          <button onClick={() => setShowQuickView(true)}>Quick View</button>
        </div>

        <p className={styles.brand}>{brand}</p>

        <div className={styles.desc}>
          <div className={styles.title}>{name}</div>

          {offValue !== 0 && (
            <div className={styles.deal}>
              <div className={styles.off}>{offValue}% off</div>
              <span>Deal</span>
            </div>
          )}

          <div className={styles.priceWrap}>
            <div className={styles.newPrice}>
              <FormatPrice price={newPrice} />
            </div>
            {offValue !== 0 && (
              <div className={styles.price}>${Number(price).toFixed(2)}</div>
            )}
          </div>

          {/* <div className={styles.choices}>
            <div className={styles.choice}>
              <div style={{ background: "#000" }}></div>
            </div>
            <div className={styles.choice}>
              <div style={{ background: "#708090" }}></div>
            </div>
            <div className={styles.choice}>
              <div style={{ background: "#F4A460" }}></div>
            </div>
          </div> */}
        </div>

        <div className={styles.buttons}>
          <button className="--rounded" onClick={addToCard}>
            Add to Cart
          </button>
          <div className={styles.wish} onClick={wishListHandler}>
            {!isWish && <GoHeart className={styles.wishIcon} size={24} />}
            {isWish && (
              <GoHeartFill className={styles.wishIcon} color="red" size={24} />
            )}
          </div>
        </div>
      </div>
      {showQuickView && (
        <QuickView onHide={() => setShowQuickView(false)} prodID={id} />
      )}

      <LoginMenu show={showUserMenu} onHide={triggerShowUserMenu} />
    </>
  );
};

export default CardProduct;
