import styles from "./styles.module.scss";

import React from "react";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { translate } from "@docusaurus/Translate";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "../Button";
import { GradualSpacing } from "../magic-ui/GradualSpacing";
import { BlurFade } from "../magic-ui/BlurFade";
import clsx from "clsx";
import { DownloadButton } from "../DownloadButton";
import LinkBtn from "../Button/LinkBtn";

export default function HomepageFirstScreen() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;

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
            <div className={styles.overview}>
              {translate({
                message: "HOME.FirstScreen.script",
              })}
            </div>
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
      <BlurFade>
        <div className={styles["image-box"]}>
          <div className={styles["image-bg"]}>
            <img fetchPriority="high" src={useBaseUrl("/img/background.svg")} />
          </div>
          <Image
            className={styles.image}
            sources={{
              light: useBaseUrl("/img/first-screen.png"),
              dark: useBaseUrl("/img/first-screen.png"),
            }}
          />
        </div>
      </BlurFade>
    </section>
  );
}
