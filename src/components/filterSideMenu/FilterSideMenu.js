import React from "react";
import SideMenu from "../sideMenu/SideMenu";
import { NavLink } from "react-router-dom";
import styles from "./FilterSideMenu.module.scss";

const FilterSideMenu = ({
  show,
  onHide,
  categories,
  price,
  setPrice,
  maxPrice,
}) => {
  const activeLink = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <SideMenu
      show={show}
      onHide={onHide}
      position={"left"}
      title={`Categories`}
    >
      <div className={styles.filterSide}>
        {categories.data.map((cat, index) => {
          return (
            <NavLink
              to={`/categories/${cat.id}`}
              className={activeLink}
              key={index}
            >
              {cat.name}
            </NavLink>
          );
        })}
        <br />
        <div className={styles.price}>
          <h5>Price</h5>
          <p>${price}</p>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
    </SideMenu>
  );
};

export default FilterSideMenu;
