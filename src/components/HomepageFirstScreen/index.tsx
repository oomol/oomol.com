import styles from "./styles.module.scss";

import React from "react";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { translate } from "@docusaurus/Translate";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DownloadUrl } from "@site/src/download_url";
import { Button } from "../Button";
import { GradualSpacing } from "../magic-ui/GradualSpacing";
import { BlurFade } from "../magic-ui/BlurFade";
import { Popover } from "../Popover";
import clsx from "clsx";

enum OS {
  Windows = "Windows",
  MacOS = "MacOS",
}

function detectOSAndArchitecture(): OS {
  const userAgent = navigator.userAgent;
  let os = OS.Windows;

  if (userAgent.indexOf("Win") !== -1) {
    os = OS.Windows;
  } else if (userAgent.indexOf("Mac") !== -1) {
    os = OS.MacOS;
  }

  return os;
}

export default function HomepageFirstScreen() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;

  const content = (
    <div className={styles.popoverBox}>
      <a download href={DownloadUrl.Stable.MacOS.AppleSilicon}>
        <div className={styles.popoverBtn}>
          <div className={`${styles.icon} i-ic-baseline-apple`} />
          <span style={{ marginLeft: 8 }}>Apple Silicon</span>
        </div>
      </a>
      <a download href={DownloadUrl.Stable.MacOS.Intel}>
        <div className={styles.popoverBtn}>
          <div className={`${styles.icon} i-file-icons-intel`} />
          <span style={{ marginLeft: 8 }}>Intel Chip</span>
        </div>
      </a>
    </div>
  );

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
            <div className={styles["button-box"]}>
              {detectOSAndArchitecture() === OS.MacOS ? (
                <Popover
                  trigger={
                    <Button
                      className={styles.download}
                      icon={
                        <div
                          className="i-codicon-desktop-download"
                          style={{ fontSize: 18 }}
                        />
                      }
                    >
                      {translate({
                        message: "HOME.FirstScreen.download-macos",
                      })}
                    </Button>
                  }
                  content={content}
                />
              ) : (
                <div className={styles.windowsBox}>
                  <Button
                    className={styles.download}
                    href={DownloadUrl.Stable.Windows.x64}
                    icon={
                      <div
                        className="i-codicon-desktop-download"
                        style={{ fontSize: 18 }}
                      />
                    }
                  >
                    {translate({
                      message: "HOME.FirstScreen.download-windows",
                    })}
                  </Button>

                  <span className={styles.windowsSubtitle}>
                    {translate({
                      message: "HOME.FirstScreen.download-windows-subtitle",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BlurFade>
        <div className={styles["image-box"]}>
          <div className={styles["image-bg"]}>
            <img src={useBaseUrl("/img/background.svg")} />
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
