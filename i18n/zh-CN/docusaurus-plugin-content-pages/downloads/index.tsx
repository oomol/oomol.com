import styles from "@site/src/pages/downloads/styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DownloadsCliPanel from "@site/src/components/DownloadsCliPanel";
import { DownloadUrl } from "@site/src/download_url";
import { downloadStable } from "@site/src/lib/utils";
import Layout from "@theme/Layout";
import React from "react";

const downloadData = [
  {
    type: translate({
      message: "HOME.Downloads.Nightly.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Nightly.subtitle",
    }),
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
    type: translate({
      message: "HOME.Downloads.Stable.title",
    }),
    subTitle: translate({
      message: "HOME.Downloads.Stable.subtitle",
    }),
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
  const cliGuideUrl = useBaseUrl("/docs/oo-cli");
  const studioDownloadsUrl = useBaseUrl("/downloads#studio-downloads");

  return (
    <Layout>
      <div className={styles.container}>
        <img className={styles.image} src={logoUrl} />
        <div className={styles.titleBox}>
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
        </div>
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>
            {translate({
              message: "HOME.Downloads.cli.info.title",
            })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({
              message: "HOME.Downloads.cli.info.description",
            })}
          </p>
          <div className={styles.sectionActions}>
            <a className={styles.sectionAction} href={cliGuideUrl}>
              {translate({
                message: "HOME.Downloads.cli.action.guide",
              })}
            </a>
            <a
              className={styles.sectionAction}
              href="https://github.com/oomol-lab/oo-cli"
              rel="noreferrer"
              target="_blank"
            >
              {translate({
                message: "HOME.Downloads.cli.action.github",
              })}
            </a>
          </div>
        </div>
        <DownloadsCliPanel />
        <div id="studio-downloads" className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>
            {translate({
              message: "HOME.Downloads.studioSection.title",
            })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({
              message: "HOME.Downloads.studioSection.subtitle",
            })}
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
                  <div className={styles.type}>{item.type}</div>
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
        <section className={styles.pageCtaSection}>
          <div className={styles.pageCtaPanel}>
            <div className={styles.pageCtaContent}>
              <h2 className={styles.pageCtaTitle}>
                {translate({
                  message: "HOME.Downloads.cta.title",
                })}
              </h2>
              <p className={styles.pageCtaDescription}>
                {translate({
                  message: "HOME.Downloads.cta.description",
                })}
              </p>
            </div>
            <div className={styles.pageCtaActions}>
              <a className={styles.pageCtaPrimaryAction} href={cliGuideUrl}>
                {translate({
                  message: "HOME.Downloads.cta.primary",
                })}
              </a>
              <a
                className={styles.pageCtaSecondaryAction}
                href={studioDownloadsUrl}
              >
                {translate({
                  message: "HOME.Downloads.cta.secondary",
                })}
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
