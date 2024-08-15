import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button, Tag } from "@arco-design/web-react";
import { IconDownload } from "@arco-design/web-react/icon";

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
        platform: Platform.X64,
        url: "https://static.oomol.com/release/beta/darwin/x64/1.0.0-beta.1.dmg",
        isReady: true,
      },
      {
        platform: Platform.ARM64,
        url: "https://static.oomol.com/release/beta/darwin/arm64/1.0.0-beta.1.dmg",
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
          type="outline"
          href={btn.url}
          icon={<IconDownload />}
        >
          <span className={styles.os}>{data.os}</span>
          <Tag bordered={true} color={btn.isReady && "green"}>
            {btn.platform}
          </Tag>
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
