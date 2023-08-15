import React, { useState } from "react";
import styles from "./TopCategories.module.scss";
import categories from "../../categories.json";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const TopCategories = () => {
  const [showMore, setShowMore] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const firstRows = categories.filter((cat) => cat.index <= 5);
  const secondRows = categories.filter((cat) => cat.index >= 6);

  return (
    <div className={styles.TopCategories}>
      <h2>Top Categories</h2>

      {/* for large screen */}
      {!isTabletOrMobile && (
        <div className={styles.categoriesWrap}>
          {categories.map((category) => {
            return (
              <Link
                to={`/collection/${category.id}`}
                className={styles.card}
                key={category.id}
              >
                <div>
                  <img src={category.image} alt={category.title} />
                </div>
                <p>{category.title}</p>
              </Link>
            );
          })}
        </div>
      )}

      {/* for mobile */}
      {isTabletOrMobile && (
        <div className={styles.categoriesWrap}>
          {firstRows.map((category) => {
            return (
              <Link
                to={`/collection/${category.id}`}
                className={styles.card}
                key={category.id}
              >
                <div>
                  <img src={category.image} alt={category.title} />
                </div>
                <p>{category.title}</p>
              </Link>
            );
          })}

          {showMore &&
            secondRows.map((category) => {
              return (
                <Link
                  to={`/collection/${category.id}`}
                  className={styles.card}
                  key={category.id}
                >
                  <div>
                    <img src={category.image} alt={category.title} />
                  </div>
                  <p>{category.title}</p>
                </Link>
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
