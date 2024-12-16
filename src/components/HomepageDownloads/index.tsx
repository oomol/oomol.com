import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { DownloadUrl } from "@site/src/download_url";
import { Button } from "../Button";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";

type DownloadBtnProps = {
  text: string;
  icon: string;
  downloadingUrl: string;
  isReady?: boolean;
};

const DownloadBtn: DownloadBtnProps[] = [
  {
    text: "Windows x64",
    icon: "/img/windows.svg",
    downloadingUrl: DownloadUrl.Windows.X64,
  },
  {
    text: "MacOS Intel Chip",
    icon: "/img/macos-intel.svg",
    downloadingUrl: DownloadUrl.MacOS.Intel,
  },
  {
    text: "macOS Apple Silicon",
    icon: "/img/macos-apple-silicon.svg",
    downloadingUrl: DownloadUrl.MacOS.AppleSilicon,
  },
];

export default function HomepageDownloads() {
  return (
    <div className={styles.container}>
      <BlurFade className={styles["overview-blur-fade"]}>
        <img className={styles.image} src={"/img/logo.svg"} />
        <div className={styles.content}>
          <p className={styles.overview}>
            {translate({
              message: "HOME.FirstScreen.slogan",
            })}
          </p>
          <p className={styles.description}>
            Oomol Studio 通过直观的视觉交互轻松连接代码片段和 API 服务
          </p>
        </div>
        <div className={styles.downloads}>
          {DownloadBtn.map((data, index) => {
            return (
              <Button
                key={`download-${index}`}
                className={styles["download-btn"]}
                icon={<img src={data.icon} />}
                href={data.downloadingUrl}
              >
                {data.text}
              </Button>
            );
          })}
        </div>
      </BlurFade>
    </div>
  );
}
