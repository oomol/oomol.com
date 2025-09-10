import styles from "./styles.module.scss";

import React, { useState } from "react";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import clsx from "clsx";
import { DownloadButton } from "../DownloadButton";
import LinkBtn from "../Button/LinkBtn";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";

export default function HomepageFirstScreen() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles["content-left"]}>
            <div className={styles["slogan-box"]}>
              <h1
                className={clsx(
                  styles["slogan"],
                  i18n.currentLocale === "zh-CN" && styles["slogan-cn"]
                )}
              >
                {i18n.currentLocale === "zh-CN" ? (
                  <>
                    创造，分享和使用{" "}
                    <span className={styles["ai-tool-text"]}>AI 工具</span>
                  </>
                ) : (
                  <>
                    Create, Share and Use{" "}
                    <span className={styles["ai-tool-text"]}>AI Tools</span>
                  </>
                )}
              </h1>
            </div>
            <div className={styles["description-box"]}>
              <span className={styles.overview}>
                {translate({
                  message: "HOME.FirstScreen.script",
                })}
              </span>
            </div>
          </div>
          <div className={styles["content-right"]}>
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
            videoSrc="https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM"
            thumbnailSrc={useBaseUrl("/img/pages/home/first-screen.webp")}
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </section>
  );
}
