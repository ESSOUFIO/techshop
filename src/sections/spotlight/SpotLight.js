import React from "react";
import styles from "./SpotLight.module.scss";
import consoleImg from "../../assets/images/consoles.jpg";
import soundBarImg from "../../assets/images/soundbars_430x.jpg";
import massageImg from "../../assets/images/msssages_chairs_430x.jpg";
import ephoneImg from "../../assets/images/ephone_665x.jpg";
import laptopImg from "../../assets/images/laptop_665x.jpg";

const SpotLight = () => {
  return (
    <>
      <div className={styles.spotlight}>
        <div className={styles.firstRow}>
          <div className={styles.img}>
            <img src={consoleImg} alt="Console" />
          </div>
          <div className={styles.img}>
            <img src={soundBarImg} alt="Sound Bars" />
          </div>
          <div className={styles.img}>
            <img src={massageImg} alt="Massage Chair" />
          </div>
        </div>

        <div className={styles.secondRow}>
          <div className={styles.img}>
            <img src={ephoneImg} alt="ePhone" />
          </div>
          <div className={styles.img}>
            <img src={laptopImg} alt="Laptopo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotLight;
