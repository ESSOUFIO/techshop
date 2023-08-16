import styles from "./Admin.module.scss";
import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "../../components/admin/dashboard/Dashboard";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { VscNewFile } from "react-icons/vsc";
import { TbDatabaseDollar } from "react-icons/tb";
import ProductsList from "../../components/admin/productsList/ProductsList";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Orders from "../../components/admin/orders/Orders";
import { HeaderMobile } from "../../components";

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
  return (
    <>
      <HeaderMobile style={{ display: "block" }} />
      <div className={styles.admin}>
        <div className={styles.navWrap}>
          <div className={styles.icon}>
            <MdAdminPanelSettings size={32} />
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
              icon={<HiClipboardDocumentList size={19} />}
              label={"Products List"}
              path={"products"}
            />
            <NavItem
              icon={<VscNewFile size={19} />}
              label={"Add Product"}
              path={"add-product"}
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
          <Route path="products" element={<ProductsList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  );
};

export default Admin;
