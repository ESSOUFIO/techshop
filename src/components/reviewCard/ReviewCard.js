import React from "react";
import styles from "./ReviewCard.module.scss";
import profileImg from "../../assets/images/profile.png";
import StarsRating from "react-star-rate";
import { MdVerified } from "react-icons/md";

const ReviewCard = ({ userName, address, rating, title, text }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.user}>
        <div className={styles.photo}>
          <img src={profileImg} alt="User" />
        </div>
        <div className={styles.info}>
          <div className={styles.userName}>
            <p>{userName}</p>
            <span>
              <MdVerified size={14} color="var(--color-blue-verified)" />
            </span>
          </div>
          <p>{address}</p>
        </div>
      </div>
      <div className={styles.rating}>
        <StarsRating value={rating} />
      </div>
      <div className={styles.text}>
        <h6>{title}</h6>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
