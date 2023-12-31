import React from "react";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import styles from "./BreadCrumb.module.scss";

const BreadCrumb = ({ page1, page2 }) => {
  return (
    <nav className={styles.breadCrumb}>
      <Link to={"/"}>Home</Link>
      <p>
        <MdNavigateNext size={18} />
      </p>
      {page2 ? (
        <Link to={`/${page1.toLowerCase()}`}>{page1}</Link>
      ) : (
        <p>{page1}</p>
      )}
      {page2 && (
        <>
          <p>
            <MdNavigateNext size={18} />
          </p>
          <p>{page2}</p>
        </>
      )}
    </nav>
  );
};

export default BreadCrumb;
