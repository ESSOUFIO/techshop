import React from "react";
import styles from "./NewsLetter.module.scss";

const NewsLetter = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.newsLetter}>
      <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
      <p>Get the latest updates on new products and upcoming sales</p>
      <form onSubmit={submitHandler}>
        <div className={`--rounded ${styles.input}`}>
          <input
            className="--input-theme"
            type="text"
            placeholder="enter your email address"
          />
        </div>
        <button className="--btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
