import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
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
        </div>
        <div className={styles.screenshotFrame}>
          <ThemedImage
            sources={{
              light: useBaseUrl("/img/pages/home/hero-light.png"),
              dark: useBaseUrl("/img/pages/home/hero-dark.png"),
            }}
            alt="OOMOL Product Screenshot"
            className={styles["product-screenshot"]}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
