import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { DownloadUrl } from "@site/src/download_url";
import React from "react";

import { BlurFade } from "../magic-ui/BlurFade";
import { Button } from "../ui/button";

type DownloadBtnProps = {
  text: string;
  icon: string;
  downloadingUrl?: string;
  disabled?: boolean;
};

const DownloadBtn: DownloadBtnProps[] = [
  {
    text: "Windows x64",
    icon: "i-mage-microsoft-windows",
    downloadingUrl: DownloadUrl.Stable.Windows.x64,
  },
  {
    text: "macOS Apple Silicon",
    icon: "i-ic-baseline-apple",
    downloadingUrl: DownloadUrl.Stable.MacOS.AppleSilicon,
  },
  {
    text: "macOS Intel Chip",
    icon: "i-file-icons-intel",
    downloadingUrl: DownloadUrl.Stable.MacOS.Intel,
  },
];

export default function HomepageDownloads() {
  return (
    <div className={styles.container}>
      <BlurFade className={styles["overview-blur-fade"]}>
        <img className={styles.image} src={"/img/logo2x.png"} />
        <div className={styles.content}>
          <p className={styles.overview}>
            {translate({
              message: "HOME.FirstScreen.slogan",
            })}
          </p>
          <p className={styles.description}>
            {translate({
              message: "HOME.FirstScreen.script",
            })}
          </p>
        </div>
        <div className={styles.downloads}>
          {DownloadBtn.map((data, index) => {
            return (
              <Button
                asChild
                key={`download-${index}`}
                className={styles["download-btn"]}
                disabled={data.disabled}
              >
                <a href={data.downloadingUrl}>
                  <i className={`${data.icon} ${styles.icon}`} />
                  {data.text}
                </a>
              </Button>
            );
          })}
        </div>
      </BlurFade>
    </div>
  );
}
