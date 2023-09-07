import React, { useState } from "react";
import styles from "./TopCategories.module.scss";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import useFetchCollection from "../../customHooks/useFetchCollection";
import spinner from "../../assets/images/loader/Spinner.png";

const TopCategories = () => {
  const [showMore, setShowMore] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const fetchedCategories = useFetchCollection("categories", "name");

  const firstRows = fetchedCategories.data.filter((cat, index) => index <= 5);
  const secondRows = fetchedCategories.data.filter((cat, index) => index >= 6);

  return (
    <div className={styles.TopCategories}>
      <h2>Top Categories</h2>

      {fetchedCategories.isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={spinner} alt="Loading.." width={100} />
        </div>
      ) : (
        fetchedCategories.data && (
          <>
            {/* for large screen */}
            {!isTabletOrMobile && (
              <div className={styles.categoriesWrap}>
                {fetchedCategories.data.map((category) => {
                  return (
                    <Link
                      to={`/categories/${category.id}`}
                      className={styles.card}
                      key={category.id}
                    >
                      <div>
                        <img src={category.image.url} alt={category.name} />
                      </div>
                      <p>{category.name}</p>
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
                      to={`/categories/${category.id}`}
                      className={styles.card}
                      key={category.id}
                    >
                      <div>
                        <img src={category.image.url} alt={category.name} />
                      </div>
                      <p>{category.name}</p>
                    </Link>
                  );
                })}

                {showMore &&
                  secondRows.map((category) => {
                    return (
                      <Link
                        to={`/categories/${category.id}`}
                        className={styles.card}
                        key={category.id}
                      >
                        <div>
                          <img src={category.image.url} alt={category.name} />
                        </div>
                        <p>{category.name}</p>
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
          </>
        )
      )}
    </div>
  );
};

export default TopCategories;
