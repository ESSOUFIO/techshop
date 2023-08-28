import styles from "./Admin.module.scss";
import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "../../components/admin/dashboard/Dashboard";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDashboard, AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { VscNewFile } from "react-icons/vsc";
import { TbDatabaseDollar } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import { BsApple } from "react-icons/bs";
import { TfiApple } from "react-icons/tfi";
import ProductsList from "../../components/admin/productsList/ProductsList";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import CategoriesList from "../../components/admin/categoriesList/CategoriesList";
import AddCategory from "../../components/admin/addCategory/AddCategory";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { STORE_CATEGORIES } from "../../redux/categorySlice";
import Loader from "../../components/loader/Loader";
import AddBrand from "../../components/admin/addBrand/AddBrand";
import BrandsList from "../../components/admin/brandsList/BrandsList";
import { STORE_BRAND } from "../../redux/brandSlice";
import { STORE_ORDERS } from "../../redux/orderSlice";
import OrdersList from "../../components/admin/ordersList/OrdersList";

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

  //Get Real-Time of Brands List
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

            <h6>ORDERS</h6>
            <NavItem
              icon={<TbDatabaseDollar size={19} />}
              label={"View Orders"}
              path={"orders"}
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
        </Routes>
      </div>

      {loading && <Loader />}
    </>
  );
};

export default Admin;
