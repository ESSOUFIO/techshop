import React, { useState } from "react";
import styles from "./TopCategories.module.scss";
import categories from "../../categories.json";
import { useMediaQuery } from "react-responsive";

const TopCategories = () => {
  const [showMore, setShowMore] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const firstRows = categories.filter((cat) => cat.id <= 6);
  const secondRows = categories.filter((cat) => cat.id >= 7);

  return (
    <div className={styles.TopCategories}>
      <h2>Top Categories</h2>

      {/* for large screen */}
      {!isTabletOrMobile && (
        <div className={styles.categoriesWrap}>
          {categories.map((category) => {
            return (
              <div className={styles.card} key={category.id}>
                <div>
                  <img src={category.image} alt={category.title} />
                </div>
                <p>{category.title}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* for mobile */}
      {isTabletOrMobile && (
        <div className={styles.categoriesWrap}>
          {firstRows.map((category) => {
            return (
              <div className={styles.card} key={category.id}>
                <div>
                  <img src={category.image} alt={category.title} />
                </div>
                <p>{category.title}</p>
              </div>
            );
          })}

          {showMore &&
            secondRows.map((category) => {
              return (
                <div className={styles.card} key={category.id}>
                  <div>
                    <img src={category.image} alt={category.title} />
                  </div>
                  <p>{category.title}</p>
                </div>
              );
            })}
        </div>
      )}

      {isTabletOrMobile && (
        <div className={styles.showMoreBtn}>
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TopCategories;
