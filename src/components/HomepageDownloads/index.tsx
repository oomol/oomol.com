import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

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
  platform: Platform;
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
        url: "",
        isReady: false,
      },
      {
        platform: Platform.ARM64,
        url: "",
        isReady: false,
      },
    ],
  },
  {
    imageUrl: "/img/linux.svg",
    width: 120,
    os: OS.Linux,
    package: [
      {
        platform: Platform.X64,
        url: "",
        isReady: false,
      },
      {
        platform: Platform.ARM64,
        url: "",
        isReady: false,
      },
    ],
  },
  {
    imageUrl: "/img/macos.svg",
    width: 100,
    os: OS.MacOS,
    package: [
      {
        platform: Platform.X64,
        url: "https://oomol-studio-dev.s3.ap-southeast-1.amazonaws.com/nightlies/20230713/oomol-studio-nightly.20230713-x64.dmg",
        isReady: true,
      },
      {
        platform: Platform.ARM64,
        url: "https://oomol-studio-dev.s3.ap-southeast-1.amazonaws.com/nightlies/20230712/oomol-studio-nightly.20230712-arm64.dmg",
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
          size={"large"}
          key={`btn-${index}`}
          href={btn.url}
          icon={<DownloadOutlined />}
        >
          <span>{data.os}</span>
          <Tag color={btn.isReady && "green"}>{btn.platform}</Tag>
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
        {btnNodes}
      </div>
    );
  });
  return (
    <div id="download" className={styles.sectionDownload}>
      {downloadNodes}
    </div>
  );
}
