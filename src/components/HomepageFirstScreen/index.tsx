import styles from "./styles.module.scss";

import React, { useState } from "react";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { GradualSpacing } from "../magic-ui/GradualSpacing";
import clsx from "clsx";
import { DownloadButton } from "../DownloadButton";
import LinkBtn from "../Button/LinkBtn";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";

export default function HomepageFirstScreen() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;

  const [videoError, setVideoError] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles["slogan-box"]}>
            <GradualSpacing
              text={translate({ message: "HOME.FirstScreen.slogan" })}
              className={clsx(
                styles["slogan"],
                i18n.currentLocale === "zh-CN" && styles["slogan-cn"]
              )}
            />
          </div>
          <div className={styles["intro-box"]}>
            <span className={styles.overview}>
              {translate({
                message: "HOME.FirstScreen.script",
              })}
            </span>
            <div className={styles.buttons}>
              <LinkBtn
                text={translate({ message: "Theme.Navbar.go-to-hub-flow" })}
                iconPos="left"
                icon="i-codicon-globe"
                url="https://hub.oomol.com/"
              />
              <DownloadButton />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["image-box"]}>
        <div className={styles.halo}>
          <HeroVideoDialog
            className={styles.video}
            animationStyle="from-center"
            videoSrc={
              i18n.currentLocale === "zh-CN"
                ? "https://static.oomol.com/assets/combination-CN.webm"
                : "https://static.oomol.com/assets/combination-EN.webm"
            }
            thumbnailSrc={useBaseUrl("/img/pages/home/first-screen.webp")}
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </section>
  );
}
