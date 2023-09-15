import { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import { NavLink, Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { STORE_BRAND } from "../../redux/brandSlice";
import { STORE_ORDERS } from "../../redux/orderSlice";
import { STORE_CATEGORIES } from "../../redux/categorySlice";

import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDashboard, AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { VscNewFile } from "react-icons/vsc";
import { TbDatabaseDollar, TbLayoutAlignLeft } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import { BsApple } from "react-icons/bs";
import { TfiLayoutAccordionSeparated, TfiApple } from "react-icons/tfi";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";

import {
  AddBrand,
  AddCategory,
  AddProduct,
  BrandsList,
  CategoriesList,
  Dashboard,
  Loader,
  OrderDetails,
  OrdersList,
  ProductsList,
} from "../../components";
import BannersList from "../../components/admin/bannersList/BannersList";
import AddBanner from "../../components/admin/addBanner/AddBanner";

const NavItem = ({ icon, label, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${styles.active} ${styles.navItem}` : `${styles.navItem}`
      }
    >
      {icon}
      <p>{label}</p>
    </NavLink>
  );
};

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //Get Real-Time of Categories List
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "categories"), orderBy("name"));
    const unsub = onSnapshot(q, (snapshot) => {
      const array = [];
      snapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });

      dispatch(STORE_CATEGORIES(array));
      setLoading(false);
    });
    return () => unsub();
  }, [dispatch]);

  //Get Real-Time of Brands List
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "brands"), orderBy("name"));
    const unsub = onSnapshot(q, (snapshot) => {
      const array = [];
      snapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });

      dispatch(STORE_BRAND(array));
      setLoading(false);
    });
    return () => unsub();
  }, [dispatch]);

  //Get Real-Time of Orders List
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "orders"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      const array = [];
      snapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });

      dispatch(STORE_ORDERS(array));
      setLoading(false);
    });
    return () => unsub();
  }, [dispatch]);

  //Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.admin}>
        <div className={styles.navWrap}>
          <div className={styles.icon}>
            <MdAdminPanelSettings className={styles.adminIcon} />
            <p>TECHSHOP ADMIN</p>
          </div>
          <hr />
          <nav>
            <NavItem
              icon={<AiFillDashboard size={19} />}
              label={"Dashboard"}
              path={"dashboard"}
            />
            <hr />

            <h6>PRODUCTS</h6>
            <NavItem
              icon={
                <HiClipboardDocumentList className={styles["navItem-icon"]} />
              }
              label={"Products List"}
              path={"products/list"}
            />
            <NavItem
              icon={<VscNewFile size={19} />}
              label={"Add Product"}
              path={"product/0/new"}
            />

            <hr />
            <h6>ORDERS</h6>
            <NavItem
              icon={<TbDatabaseDollar size={19} />}
              label={"View Orders"}
              path={"orders"}
            />

            <hr />
            <h6>CATEGORIES</h6>
            <NavItem
              icon={<BiSolidCategory className={styles["navItem-icon"]} />}
              label={"Categories List"}
              path={"categories"}
            />
            <NavItem
              icon={<AiOutlineAppstoreAdd size={19} />}
              label={"Add Category"}
              path={"category/new"}
            />
            <hr />

            <h6>BRANDS</h6>
            <NavItem
              icon={<BsApple className={styles["navItem-icon"]} />}
              label={"Brands List"}
              path={"brands"}
            />
            <NavItem
              icon={<TfiApple size={19} />}
              label={"Add Brand"}
              path={"brand/new"}
            />
            <hr />

            <h6>Home Banners</h6>
            <NavItem
              icon={
                <TfiLayoutAccordionSeparated
                  className={styles["navItem-icon"]}
                />
              }
              label={"Banners List"}
              path={"banners"}
            />
            <NavItem
              icon={<TbLayoutAlignLeft size={19} />}
              label={"Add Banner"}
              path={"banner/new"}
            />
          </nav>
        </div>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products/:pgIndex" element={<ProductsList />} />
          <Route path="product/:pgIndex/:id" element={<AddProduct />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="brands" element={<BrandsList />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
          <Route path="banners" element={<BannersList />} />
          <Route path="banner/:id" element={<AddBanner />} />
        </Routes>
      </div>

      {loading && <Loader />}
    </>
  );
};

export default Admin;
