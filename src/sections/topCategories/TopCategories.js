import React, { useEffect, useState } from "react";
import styles from "./TopCategories.module.scss";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";

const TopCategories = () => {
  const [showMore, setShowMore] = useState(false);
  const [categories, setCategories] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const firstRows = categories.filter((cat) => cat.index <= 5);
  const secondRows = categories.filter((cat) => cat.index >= 6);

  useEffect(() => {
    const getBrands = async () => {
      const q = query(collection(db, "categories"), orderBy("name"));

      const querySnapshot = await getDocs(q);
      let array = [];
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setCategories(array);
    };
    getBrands();
  }, []);

  return (
    <div className={styles.TopCategories}>
      <h2>Top Categories</h2>

      {/* for large screen */}
      {!isTabletOrMobile && (
        <div className={styles.categoriesWrap}>
          {categories.map((category) => {
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
    </div>
  );
};

export default TopCategories;
