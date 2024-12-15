import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { DownloadUrl } from "@site/src/download_url";
import { Button } from "../Button";
import { translate } from "@docusaurus/Translate";

enum Platform {
  ARM64 = "ARM64",
  X64 = "X64",
}

enum OS {
  Windows = "Windows",
  Linux = "Linux",
  MacOS = "MacOS",
}

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

type PackageType = {
  platform: string;
  url: string;
  isReady: boolean;
};

type DownloadDataType = {
  imageUrl: string;
  width: number;
  os: OS;
  package: PackageType[];
};

const downloadData: DownloadDataType[] = [
  {
    imageUrl: "/img/windows.svg",
    width: 80,
    os: OS.Windows,
    package: [
      {
        platform: Platform.X64,
        url: DownloadUrl.Windows.X64,
        isReady: true,
      },
    ],
  },
  {
    imageUrl: "/img/macos.svg",
    width: 80,
    os: OS.MacOS,
    package: [
      {
        platform: "Intel Chip",
        url: DownloadUrl.MacOS.Intel,
        isReady: true,
      },
      {
        platform: "Apple Silicon",
        url: DownloadUrl.MacOS.AppleSilicon,
        isReady: true,
      },
    ],
  },
];

export default function HomepageDownloads() {
  return (
    <div className={styles.container}>
      <img src={"/img/logo.svg"} />
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
              className={styles["download-btn"]}
              icon={<img src={data.icon} />}
              href={data.downloadingUrl}
            >
              {data.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
