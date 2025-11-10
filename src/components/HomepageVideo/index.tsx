import styles from "./styles.module.scss";

import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";
import { translate } from "@docusaurus/Translate";

export default function HomepageVideo() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>{translate({id: 'HOME.Video.title', message: '产品演示'})}</h2>
          <p className={styles.subtitle}>{translate({id: 'HOME.Video.subtitle', message: '通过视频了解 OOMOL 的强大功能和使用方法'})}</p>
        </div>
        <div className={styles["image-box"]}>
          <div className={styles.halo}>
            <HeroVideoDialog
              className={styles.video}
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM"
              thumbnailSrc={useBaseUrl("/img/pages/home/first-screen.svg")}
              thumbnailAlt="Hero Video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}