import styles from "./styles.module.scss";

import React, { useState } from "react";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import clsx from "clsx";
import { DownloadButton } from "../DownloadButton";
import LinkBtn from "../Button/LinkBtn";

import TypewriterText from "../TypewriterText";
import CyclicTypewriterText from "../CyclicTypewriterText";

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
                    <TypewriterText text="创造，分享和使用 " speed={80} />
                    <span className={styles["ai-tool-text"]}>
                      <CyclicTypewriterText
                        texts={["AI 工具", "AI Agents"]}
                        speed={80}
                        delay={720}
                        cycleInterval={6000}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <TypewriterText text="Create, Share and Use " speed={80} />
                    <span className={styles["ai-tool-text"]}>
                      <CyclicTypewriterText
                        texts={["AI Tools", "AI Agents"]}
                        speed={80}
                        delay={1760}
                        cycleInterval={6000}
                      />
                    </span>
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
              <LinkBtn
                text={translate({ message: "Theme.Navbar.go-to-hub-flow" })}
                iconPos="left"
                icon="i-codicon-globe"
                url="https://hub.oomol.com/"
              />
            </div>
          </div>
          <div className={styles["content-right"]}>
            <div className={styles["screenshot-container"]}>
              <img
                src={useBaseUrl("/img/screen1.png")}
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
