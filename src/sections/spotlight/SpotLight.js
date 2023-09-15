import React from "react";
import styles from "./SpotLight.module.scss";
import consoleImg from "../../assets/images/consoles.jpg";
import soundBarImg from "../../assets/images/soundbars_430x.jpg";
import massageImg from "../../assets/images/msssages_chairs_430x.jpg";
import ephoneImg from "../../assets/images/ephone_665x.jpg";
import laptopImg from "../../assets/images/laptop_665x.jpg";
import { Link } from "react-router-dom";

const SpotLight = () => {
  return (
    <>
      <div className={styles.spotlight}>
        <div className={styles.firstRow}>
          <Link to={"/categories/gaming"} className={styles.img}>
            <img src={consoleImg} alt="Console" />
          </Link>
          <Link to={"/categories/audio_video"} className={styles.img}>
            <img src={soundBarImg} alt="Sound Bars" />
          </Link>
          <Link to={"/categories/massage_chairs"} className={styles.img}>
            <img src={massageImg} alt="Massage Chair" />
          </Link>
        </div>

        <div className={styles.secondRow}>
          <Link to={"categories/phone"} className={styles.img}>
            <img src={ephoneImg} alt="ePhone" />
          </Link>
          <Link to={"categories/laptop_tablet"} className={styles.img}>
            <img src={laptopImg} alt="Laptopo" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SpotLight;
