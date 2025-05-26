import styles from "./styles.module.scss";

import React from "react";
import Layout from "@theme/Layout";
// import { DownloadButton } from "@site/src/components/DownloadButton";
import { DownloadUrl } from "@site/src/download_url";
import { translate } from "@docusaurus/Translate";
import CanarySVG from "@site/static/img/canary.svg";

const downloadData = [
  {
    type: translate({
      message: "HOME.Downloads.Canary.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Canary.subtitle",
    }),
    downloads: [
      {
        text: "Download For MacOS Apple Silicon",
        url: DownloadUrl.Canary.MacOS.AppleSilicon,
      },
      {
        text: "Download For MacOS Intel Chip",
        url: DownloadUrl.Canary.MacOS.Intel,
      },
      {
        text: "Download For Windows X64",
        url: DownloadUrl.Canary.Windows.x64,
      },
    ],
  },
  {
    type: translate({
      message: "HOME.Downloads.Stable.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Stable.subtitle",
    }),
    downloads: [
      {
        text: "Download For MacOS Apple Silicon",
        url: DownloadUrl.Stable.MacOS.AppleSilicon,
      },
      {
        text: "Download For MacOS Intel Chip",
        url: DownloadUrl.Stable.MacOS.Intel,
      },
      {
        text: "Download For Windows X64",
        url: DownloadUrl.Stable.Windows.x64,
      },
    ],
    className: styles.stable,
    mostRecommended: true,
  },
  {
    type: translate({
      message: "HOME.Downloads.Nightly.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Nightly.subtitle",
    }),
    downloads: [
      {
        text: "Download For MacOS Apple Silicon",
        url: DownloadUrl.Nightly.MacOS.AppleSilicon,
      },
      {
        text: "Download For MacOS Intel Chip",
        url: DownloadUrl.Nightly.MacOS.Intel,
      },
      {
        text: "Download For Windows X64",
        url: DownloadUrl.Nightly.Windows.x64,
      },
    ],
  },
];

export default function Downloads() {
  return (
    <Layout>
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
                  <div className={styles.type}>
                    {item.type}
                    {item.mostRecommended && (
                      <span className={styles["most-recommended"]}>
                        {translate({
                          message: "HOME.Downloads.mostRecommended",
                        })}
                      </span>
                    )}
                  </div>
                  <span className={styles.description}>{item.subTitle}</span>
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
