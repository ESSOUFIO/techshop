import React from "react";
import styles from "./Footer.module.scss";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo/logo-wb.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Accordion } from "react-bootstrap";

const SocialMedia = ({ icon }) => {
  return <div className={styles.socialMedia}>{icon}</div>;
};

const companyInfo = (
  <div className={styles.company}>
    <img src={logoImg} alt="techshop" />
    <div className={styles.links}>
      <FaLocationDot size={20} color={"var(--color-text)"} />
      <p>685 Market Street San Francisco, CA 94105, US</p>
      <FaPhoneAlt size={19} color={"var(--color-text)"} />
      <p>
        Call us at <span>(415) 555-5555</span>
      </p>
      <IoMail size={19} color={"var(--color-text)"} />
      <p>
        <span>example@domain.com</span>
      </p>
    </div>
    <div className={styles.socialMediaWrap}>
      <SocialMedia icon={<FaFacebookF size={18} color="#fff" />} />
      <SocialMedia icon={<FaInstagram size={18} color="#fff" />} />
      <SocialMedia icon={<FaTwitter size={18} color="#fff" />} />
    </div>
  </div>
);

const SHOP_Links = (
  <>
    <li>
      <Link to="">Electronics</Link>
    </li>
    <li>
      <Link to="">Computers & Laptops</Link>
    </li>
    <li>
      <Link to="">Smartphones & Tablets</Link>
    </li>
    <li>
      <Link to="">Video Games & Systems</Link>
    </li>
    <li>
      <Link to="">Home Furniture</Link>
    </li>
    <li>
      <Link to="">Weekly Special</Link>
    </li>
  </>
);

const FURTHER_Info = (
  <>
    <li>
      <Link to="">About</Link>
    </li>
    <li>
      <Link to="">Customer Service</Link>
    </li>
    <li>
      <Link to="">Reward Program</Link>
    </li>
    <li>
      <Link to="">Shipping and Returns</Link>
    </li>
    <li>
      <Link to="">Privacy Policy</Link>
    </li>
    <li>
      <Link to="">Terms & Conditions</Link>
    </li>
    <li>
      <Link to="">Blog</Link>
    </li>
  </>
);

const Customer_Service = (
  <>
    <li>
      <Link to="">Search Terms</Link>
    </li>
    <li>
      <Link to="">Advanced Search</Link>
    </li>
    <li>
      <Link to="">Orders and Returns</Link>
    </li>
    <li>
      <Link to="">Contact Us</Link>
    </li>
    <li>
      <Link to="">Store Locations</Link>
    </li>
  </>
);

const Footer = () => {
  return (
    <div className={styles.footer}>
      <NewsLetter />
      <div className={styles.LargeScreen}>
        <div className={styles.navWrap}>
          <ul>
            <h5>SHOP</h5>
            {SHOP_Links}
          </ul>

          <ul>
            <h5>FURTHER INFO.</h5>
            {FURTHER_Info}
          </ul>

          <ul>
            <h5>CUSTOMER SERVICE</h5>
            {Customer_Service}
          </ul>

          {companyInfo}
        </div>
      </div>

      <div className={styles.mobile}>
        <div className={styles.accordion}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <b>SHOP</b>
              </Accordion.Header>
              <Accordion.Body>{SHOP_Links}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <b>FURTHER INFO</b>
              </Accordion.Header>
              <Accordion.Body>{FURTHER_Info}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <b>CUSTOMER SERVICE</b>
              </Accordion.Header>
              <Accordion.Body>{Customer_Service}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        {companyInfo}
      </div>
    </div>
  );
};

export default Footer;
