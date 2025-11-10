import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";
import i18n from "@generated/i18n";
import LinkBtn from "../Button/LinkBtn";

export default function HomepageCreate() {
  return (
    <div className={styles.create}>
      <div className={styles["create-mid"]}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.Create.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.Create.subtitle",
          })}
        </span>
        <div className={styles["image-box"]}>
          <div className={styles.halo}>
            <HeroVideoDialog
              className={styles.video}
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM"
              thumbnailSrc={useBaseUrl("/img/pages/home/first-screen.webp")}
              thumbnailAlt="Hero Video"
              zhCNVideoSrc="https://static.oomol.com/assets/combination-CN.webm"
            />
          </div>
        </div>
        <LinkBtn
          text={translate({ message: "HOME.Guide.link-button-text" })}
          icon="i-codicon:arrow-right"
          url={
            i18n.currentLocale === "zh-CN"
              ? "https://hub.oomol.com/zh-CN"
              : "https://hub.oomol.com/en"
          }
        />
      </div>
    </div>
  );
}
