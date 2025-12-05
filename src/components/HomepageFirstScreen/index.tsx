import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import { useColorMode } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { clsx } from "clsx";
import React from "react";

import { DownloadButton } from "../DownloadButton";
import { AuroraText } from "../magic-ui/AuroraText";
import { GridBackground } from "./GridBackground";

// 解析带高亮标记的文本
function parseHighlightText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      return (
        <span key={index} className={styles.highlight}>
          {content}
        </span>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export default function HomepageFirstScreen() {
  const context = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const { i18n } = context;
  const { colorMode } = useColorMode();

  const scriptText = translate({
    message: "HOME.FirstScreen.script",
  });

  return (
    <section className={styles.section}>
      <div className={styles.background}>
        <GridBackground opacity={0.6} />
      </div>
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
                  <AuroraText className={styles["aurora-slogan"]}>
                    {translate({
                      message: "HOME.FirstScreen.slogan.line1",
                    })}
                    <br />
                    {translate({
                      message: "HOME.FirstScreen.slogan.line2",
                    })}
                  </AuroraText>
                ) : (
                  <AuroraText className={styles["aurora-slogan"]}>
                    {translate({
                      message: "HOME.FirstScreen.slogan.line1",
                    })}
                    <br />
                    {translate({
                      message: "HOME.FirstScreen.slogan.line2",
                    })}
                  </AuroraText>
                )}
              </h1>
            </div>

            <div className={styles["description-box"]}>
              <span className={styles.overview}>
                {parseHighlightText(scriptText)}
              </span>
            </div>

            <div className={styles.buttons}>
              <DownloadButton />
            </div>
          </div>
        </div>
        <div className={styles["screenshot-row"]}>
          <img
            src={useBaseUrl(
              colorMode === "dark"
                ? "/img/pages/home/hero-dark.png"
                : "/img/pages/home/hero-light.png"
            )}
            alt="OOMOL Product Screenshot"
            className={styles["product-screenshot"]}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
