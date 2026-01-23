import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { DownloadUrl } from "@site/src/download_url";
import { downloadStable } from "@site/src/lib/utils";
import Layout from "@theme/Layout";
import React from "react";

const downloadData = [
  {
    type: translate({ message: "HOME.Downloads.Nightly.title" }),
    subTitle: translate({ message: "HOME.Downloads.Nightly.subtitle" }),
    downloads: [
      {
        text: translate({
          message: "HOME.Downloads.download.macos.applesilicon",
          description: "Download For MacOS Apple Silicon",
        }),
        url: DownloadUrl.Nightly.MacOS.AppleSilicon,
      },
      // Mac Intel 版本暂时不再更新
      // {
      //   text: translate({
      //     message: "HOME.Downloads.download.macos.intel",
      //     description: "Download For MacOS Intel Chip",
      //   }),
      //   url: DownloadUrl.Nightly.MacOS.Intel,
      // },
      {
        text: translate({
          message: "HOME.Downloads.download.windows.x64",
          description: "Download For Windows X64",
        }),
        url: DownloadUrl.Nightly.Windows.x64,
      },
    ],
  },
  {
    type: translate({ message: "HOME.Downloads.Stable.title" }),
    subTitle: translate({ message: "HOME.Downloads.Stable.subtitle" }),
    downloads: [
      {
        text: translate({
          message: "HOME.Downloads.download.macos.applesilicon",
          description: "Download For MacOS Apple Silicon",
        }),
        url: DownloadUrl.Stable.MacOS.AppleSilicon,
      },
      // Mac Intel 版本暂时不再更新
      // {
      //   text: translate({
      //     message: "HOME.Downloads.download.macos.intel",
      //     description: "Download For MacOS Intel Chip",
      //   }),
      //   url: DownloadUrl.Stable.MacOS.Intel,
      // },
      {
        text: translate({
          message: "HOME.Downloads.download.windows.x64",
          description: "Download For Windows X64",
        }),
        url: DownloadUrl.Stable.Windows.x64,
      },
    ],
    className: styles.stable,
    mostRecommended: true,
  },
];

export default function Downloads() {
  const logoUrl = useBaseUrl("/img/logo2x.png");

  return (
    <Layout>
      <div className={styles.container}>
        <img className={styles.image} src={logoUrl} />
        <div className={styles.titleBox}>
          <h1 className={styles.title}>
            {translate({ message: "HOME.Downloads.title" })}
          </h1>
          <p className={styles["sub-title"]}>
            {translate({ message: "HOME.Downloads.subtitle" })}
          </p>
        </div>
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
                      <a
                        key={`download-${index}-${i}`}
                        href={download.url}
                        onClick={
                          item.mostRecommended
                            ? event => downloadStable(event, download.url)
                            : undefined
                        }
                      >
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
