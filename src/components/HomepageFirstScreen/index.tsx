import styles from "./styles.module.scss";

import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import clsx from "clsx";
import { DownloadButton } from "../DownloadButton";
import { AuroraText } from "../magic-ui/AuroraText";

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
          <div className={styles["hero-content"]}>
            <div className={styles["slogan-box"]}>
              <h1
                className={clsx(
                  styles["slogan"],
                  i18n.currentLocale === "zh-CN" && styles["slogan-cn"]
                )}
              >
                {i18n.currentLocale === "zh-CN" ? (
                  translate({
                    message: "HOME.FirstScreen.slogan",
                  })
                ) : (
                  <>
                    <span style={{ whiteSpace: "nowrap" }}>
                      Build, Deploy & Share AI-Powered Workflows
                    </span>
                    <AuroraText className={styles["aurora-slogan"]}>
                      From Your Own Machine
                    </AuroraText>
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

            <div className={styles.buttons}>
              <DownloadButton />
            </div>
          </div>
        </div>
        <div className={styles["screenshot-row"]}>
          <img
            src={useBaseUrl("/img/screen1.svg")}
            alt="OOMOL Product Screenshot"
            className={styles["product-screenshot"]}
          />
        </div>
      </div>
    </section>
  );
}
