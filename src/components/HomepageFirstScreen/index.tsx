import styles from "./styles.module.scss";

import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import clsx from "clsx";
import { DownloadButton } from "../DownloadButton";
import LinkBtn from "../Button/LinkBtn";

import type { DocusaurusContext } from "@docusaurus/types";

export default function HomepageFirstScreen() {
  const context = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
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
                {translate({
                  message: "HOME.FirstScreen.slogan",
                })}
              </h1>
            </div>
            <div className={styles["description-box"]}>
              <span className={styles.overview}>
                {translate({
                  message: "HOME.FirstScreen.script",
                })}
              </span>
            </div>
            {/* 数据亮点 */}
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>3000+</span>
                <span className={styles.statLabel}>
                  {translate({ message: "HOME.FirstScreen.stat1" })}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>
                  {translate({ message: "HOME.FirstScreen.stat2.value" })}
                </span>
                <span className={styles.statLabel}>
                  {translate({ message: "HOME.FirstScreen.stat2.label" })}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>P2P</span>
                <span className={styles.statLabel}>
                  {translate({ message: "HOME.FirstScreen.stat3" })}
                </span>
              </div>
            </div>

            <div className={styles.buttons}>
              <DownloadButton />
              <LinkBtn
                text={translate({ message: "HOME.FirstScreen.cta.secondary" })}
                icon="i-codicon-globe"
                url="https://hub.oomol.com/"
              />
            </div>
          </div>
          <div className={styles["content-right"]}>
            <div className={styles["screenshot-container"]}>
              <img
                src={useBaseUrl("/img/screen1.svg")}
                alt="OOMOL Product Screenshot"
                className={styles["product-screenshot"]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
