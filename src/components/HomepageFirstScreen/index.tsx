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
    <section>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles["slogan-box"]}>
            <h1 className={styles["slogan-one"]}>WorkFlow based</h1>
            <h1 className={styles["slogan-two"]}>data processing IDE.</h1>
          </div>
          <div className={styles["intro-box"]}>
            <div className={styles.overview}>
              OOMOL Studio makes it easy to connect code snippets and API
              services through intuitive visual interactions.
            </div>
            {/* TODO: restore download feature */}
            <div className={styles["button-box"]}>
              <Button
                icon={<i className="i-codicon-desktop-download" />}
                className={styles.download}
              >
                Download For macOS
              </Button>
              <Button
                icon={<i className="i-codicon-device-camera-video" />}
                className={styles.watch}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["image-box"]}>
        <Image
          className={styles.image}
          sources={{
            light: useBaseUrl("/img/oomol_studio.jpg"),
            dark: useBaseUrl("/img/oomol_studio.jpg"),
          }}
        />
      </div>
    </section>
  );
}
