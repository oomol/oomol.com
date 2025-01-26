import styles from "./styles.module.scss";

import React from "react";
import Layout from "@theme/Layout";
import { DownloadButton } from "@site/src/components/DownloadButton";
import { DownloadUrl } from "@site/src/download_url";
import { translate } from "@docusaurus/Translate";
import CanarySVG from "@site/static/img/canary.svg";

const downloadData = [
  {
    icon: "i-codicon-verified-filled",
    type: translate({
      message: "HOME.Downloads.Stable.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Stable.subtitle",
    }),
    downloads: [
      {
        text: "Download for Windows x64",
        url: DownloadUrl.Stable.Windows.x64,
      },
      {
        text: "Download for macOS Apple Silicon",
        url: DownloadUrl.Stable.MacOS.AppleSilicon,
      },
      {
        text: "Download for macOS Intel Chip",
        url: DownloadUrl.Stable.MacOS.Intel,
      },
    ],
    className: styles.stable,
  },
  {
    icon: "./img/canary.svg",
    type: translate({
      message: "HOME.Downloads.Canary.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Canary.subtitle",
    }),
    downloads: [
      {
        text: "Download for Windows x64",
        url: DownloadUrl.Canary.Windows.x64,
      },
      {
        text: "Download for macOS Apple Silicon",
        url: DownloadUrl.Canary.MacOS.AppleSilicon,
      },
      {
        text: "Download for macOS Intel Chip",
        url: DownloadUrl.Canary.MacOS.Intel,
      },
    ],
  },
  {
    icon: "i-codicon-color-mode",
    type: translate({
      message: "HOME.Downloads.Nightly.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Nightly.subtitle",
    }),
    downloads: [
      {
        text: "Download for Windows x64",
        url: DownloadUrl.Nightly.Windows.x64,
      },
      {
        text: "Download for macOS Apple Silicon",
        url: DownloadUrl.Nightly.MacOS.AppleSilicon,
      },
      {
        text: "Download for macOS Intel Chip",
        url: DownloadUrl.Nightly.MacOS.Intel,
      },
    ],
  },
];

export default function Downloads() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div className={styles.container}>
        <img className={styles.image} src={"/img/logo2x.png"} />
        <h1 className={styles.title}>
          {translate({
            message: "HOME.Downloads.title",
          })}
        </h1>
        <p className={styles["sub-title"]}>
          {translate({
            message: "HOME.Downloads.subtitle",
          })}
        </p>
        {/* <div className={styles["download-button"]}>
          <DownloadButton />
        </div> */}
        <div className={styles.cards}>
          {downloadData.map((item, index) => {
            return (
              <div
                className={`${styles.card} ${item.className}`}
                key={`download-${index}`}
              >
                <div className={styles.content}>
                  {item.type === "Canary" ? (
                    <CanarySVG className={styles["icon-canary"]} />
                  ) : (
                    <i className={`${styles.icon} ${item.icon}`} />
                  )}
                  <p className={styles.type}>{item.type}</p>
                  <p className={styles.description}>{item.subTitle}</p>
                </div>
                <div className={styles.downloads}>
                  {item.downloads.map((download, i) => {
                    return (
                      <a key={`download-${index}-${i}`} href={download.url}>
                        <i
                          className={`${styles["download-icon"]} i-codicon-desktop-download`}
                        />
                        {download.text}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
