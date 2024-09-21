import styles from "./styles.module.scss";

import React, { useState } from "react";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { translate } from "@docusaurus/Translate";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DownloadUrl } from "@site/src/download_url";
import { Button } from "../Button";

const data = {
  slogan: translate({
    message: "HOME.FirstScreen.slogan",
  }),
  script: translate({
    message: "HOME.FirstScreen.script",
  }),
};

enum Platform {
  ARM = "Apple Silicon",
  X64 = "Intel Chip",
}
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
          <div
            className="i-ic-baseline-apple"
            style={{ fontSize: 20, marginLeft: 12 }}
          />
          <span style={{ marginLeft: 8 }}>Apple Silicon</span>
        </div>
      </a>
      <a download href={DownloadUrl.MacOS.Intel}>
        <div className={styles.popoverBtn}>
          <div
            className="i-file-icons-intel"
            style={{ fontSize: 20, marginLeft: 12 }}
          />
          <span style={{ marginLeft: 8 }}>Intel Chip</span>
        </div>
      </a>
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
    <div className={styles.sectionOne}>
      <div className={styles.sectionOneBox}>
        <div className={styles.sectionOneMid}>
          <div className={styles.sectionOneText}>
            <div className={styles.sectionOneTextBox}>
              <div className={styles.sectionOneTextTitle}>{data.slogan}</div>
              <div className={styles.sectionOneTextInner}>{data.script}</div>
              <div className={styles.sectionOneBtnBox}>
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
                        className={styles.sectionOneBtn}
                        icon={
                          <div
                            className="i-material-symbols-download-rounded"
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
                      <Button className={styles.sectionOneBtn}>
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
          <div className={styles.sectionOneImageBox}>
            <Image
              className={styles.sectionOneImage}
              sources={{
                light: useBaseUrl("/img/oomol_studio.jpg"),
                dark: useBaseUrl("/img/oomol_studio.jpg"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
