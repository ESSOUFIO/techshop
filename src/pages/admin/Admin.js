import styles from "./Admin.module.scss";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/admin/dashboard/Dashboard";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { VscNewFile } from "react-icons/vsc";

const NavItem = ({ icon, label }) => {
  return (
    <div className={styles.navItem}>
      {icon}
      <p>{label}</p>
    </div>
  );
};

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navWrap}>
        <div className={styles.icon}>
          <MdAdminPanelSettings size={32} />
          <p>TECHSHOP ADMIN</p>
        </div>
        <hr />
        <nav>
          <NavItem icon={<AiFillDashboard size={19} />} label={"Dashboard"} />
          <hr />
          <h6>PRODUCTS</h6>
          <NavItem
            icon={<HiClipboardDocumentList size={19} />}
            label={"Product List"}
          />
          <NavItem icon={<VscNewFile size={19} />} label={"Add Product"} />
        </nav>
      </div>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Admin;
