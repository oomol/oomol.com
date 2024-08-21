import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { DownloadUrl } from "@site/src/download_url";
import { Button } from "../Button";

enum Platform {
  ARM64 = "ARM64",
  X64 = "X64",
}

enum OS {
  Windows = "Windows",
  Linux = "Linux",
  MacOS = "MacOS",
}

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
        isReady: false,
      },
    ],
  },
  // {
  //   imageUrl: "/img/linux.svg",
  //   width: 120,
  //   os: OS.Linux,
  //   package: [
  //     {
  //       platform: Platform.X64,
  //       url: "",
  //       isReady: false,
  //     },
  //     {
  //       platform: Platform.ARM64,
  //       url: "",
  //       isReady: false,
  //     },
  //   ],
  // },
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
  const downloadNodes = downloadData.map((data, index) => {
    const btnNodes = data.package.map((btn, index) => {
      return (
        <Button
          disabled={!btn.isReady}
          className={styles.btn}
          key={`btn-${index}`}
          href={btn.url}
          // icon={<IconDownload />}
        >
          <span className={styles.os}>{data.os}</span>
          {/* <Tag>{btn.platform}</Tag> */}
          {btn.platform}
        </Button>
      );
    });

    return (
      <div className={styles.sectionDownloadCellBox} key={`download-${index}`}>
        <div className={styles.sectionDownloadCell}>
          <Image
            style={{ width: data.width }}
            sources={{
              light: useBaseUrl(data.imageUrl),
              dark: useBaseUrl(data.imageUrl),
            }}
          />
        </div>
        <div className={styles.btnNodeBox}>{btnNodes}</div>
      </div>
    );
  });
  return (
    <div id="download" className={styles.sectionDownload}>
      {downloadNodes}
    </div>
  );
}
