import styles from "./styles.module.scss";

import React, { useState } from "react";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { translate } from "@docusaurus/Translate";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DownloadUrl } from "@site/src/download_url";
import { Button } from "../Button";
import { GradualSpacing } from "../magic-ui/GradualSpacing";
import { BlurFade } from "../magic-ui/BlurFade";

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

  const [isBtnPopView, setBtnPopState] = useState(false);
  const [isPopView, setPopState] = useState(false);

  const content = (
    <div className={styles.popoverBox}>
      <a download href={DownloadUrl.MacOS.AppleSilicon}>
        <div className={styles.popoverBtn}>
          <div className={`${styles.icon} i-ic-baseline-apple`} />
          <span style={{ marginLeft: 8 }}>Apple Silicon</span>
        </div>
      </a>
      {/* TODO: 等 x64 版准备好后再恢复 */}
      {/* <a download href={DownloadUrl.MacOS.Intel}>
        <div className={styles.popoverBtn}>
          <div className={`${styles.icon} i-file-icons-intel`} />
          <span style={{ marginLeft: 8 }}>Intel Chip</span>
        </div>
      </a> */}
    </div>
  );

  const isNeedPopView = (btn: boolean, pop: boolean): boolean => {
    if (btn || pop) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles["slogan-box"]}>
            <GradualSpacing
              text={translate({ message: "HOME.FirstScreen.slogan" })}
              className={styles["slogan-one"]}
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
                <div className={styles.downloadBtnBox}>
                  <div
                    onMouseOver={() => {
                      setBtnPopState(true);
                    }}
                    onMouseLeave={() => {
                      setBtnPopState(false);
                    }}
                  >
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
                  </div>
                  <div
                    onMouseEnter={() => {
                      setPopState(true);
                    }}
                    onMouseLeave={() => {
                      setPopState(false);
                    }}
                    style={{
                      display: isNeedPopView(isBtnPopView, isPopView)
                        ? "block"
                        : "none",
                    }}
                    className={styles.popover}
                  >
                    <div className={styles.mid}>{content}</div>
                  </div>
                </div>
              ) : (
                <div className={styles.windowsBox}>
                  <a download href={DownloadUrl.Windows.X64}>
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
                        message: "HOME.FirstScreen.download-windows",
                      })}
                    </Button>
                  </a>
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
