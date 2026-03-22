import styles from "./styles.module.scss";

import { useColorMode } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import { DownloadButton } from "../DownloadButton";

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
  const { colorMode } = useColorMode();

  const scriptText = translate({
    message: "HOME.FirstScreen.script",
  });

  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.kicker}>
            {translate({
              message: "HOME.FirstScreen.kicker",
            })}
          </div>
          <h1 className={styles.slogan}>
            {translate({
              message: "HOME.FirstScreen.slogan",
            })}
          </h1>
          <p className={styles.overview}>{parseHighlightText(scriptText)}</p>
          <div className={styles.buttons}>
            <DownloadButton />
          </div>
          <div className={styles.offerLine}>
            <span className={styles.offerItem}>
              {translate({
                message: "HOME.FirstScreen.offer1",
              })}
            </span>
            <span className={styles.offerDivider}>/</span>
            <span className={styles.offerItemStrong}>
              {translate({
                message: "HOME.FirstScreen.offer2",
              })}
            </span>
          </div>
        </div>
        <div className={styles.screenshotFrame}>
          <img
            src={useBaseUrl(
              colorMode === "dark"
                ? "/img/pages/home/hero-dark.png"
                : "/img/pages/home/hero-light.png"
            )}
            alt="OOMOL Product Screenshot"
            className={styles["product-screenshot"]}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
