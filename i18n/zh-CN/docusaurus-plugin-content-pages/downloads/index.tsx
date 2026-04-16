import styles from "@site/src/pages/downloads/styles.module.scss";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DownloadsCliPanel from "@site/src/components/DownloadsCliPanel";
import { DownloadUrl } from "@site/src/download_url";
import { downloadStable } from "@site/src/lib/utils";
import Layout from "@theme/Layout";
import React from "react";

const OOMOL_AI_DOWNLOAD_URLS = {
  web: "https://app.oomol.com",
  ios: "https://apps.apple.com/app/id6749377154",
  macos: "https://app-downloads.oomol.com/oomol-ai/darwin/arm64",
  windows: "https://app-downloads.oomol.com/oomol-ai/win32/x64",
} as const;

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
      <Head>
        <title>获取与安装 OOMOL</title>
        <meta
          name="description"
          content="选择最适合你的 OOMOL 入口：oo-cli 适合在终端和 Agent 中使用，OOMOL AI 适合图形界面，OOMOL Studio 适合自己做工具。"
        />
      </Head>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <img className={styles.image} src={logoUrl} alt="" />
            <div className={styles.titleBox}>
              <h1 className={styles.title}>选择最适合你的 OOMOL 入口</h1>
              <p className={styles["sub-title"]}>
                如果你想在终端里让 Agent 直接使用工具，就从 oo-cli
                开始；如果你更喜欢图形界面，就用 OOMOL
                AI；如果你要自己做工具，再下载 OOMOL Studio。
              </p>
            </div>
          </div>
        </section>

        <div className={styles.container}>
          <section className={styles.pageSection}>
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
                <Link className={styles.sectionAction} to={cliGuideUrl}>
                  {translate({
                    message: "HOME.Downloads.cli.action.guide",
                  })}
                </Link>
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
          </section>

          <section className={styles.pageSection}>
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>
                如果你更喜欢图形界面，就用 OOMOL AI
              </h2>
              <p className={styles.sectionSubtitle}>
                OOMOL AI 适合在 Web、桌面和 iOS
                中直接对话、查看结果并继续处理任务。如果你只是想更轻松地使用工具，从这里开始就够了。
              </p>
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.type}>Web</div>
                  <span className={styles.description}>对话式图形入口</span>
                </div>
                <div className={styles.downloads}>
                  <a
                    href={OOMOL_AI_DOWNLOAD_URLS.web}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className={`${styles["download-icon"]} i-codicon-link-external`}
                    />
                    打开网页版
                  </a>
                </div>
              </div>
              <div className={`${styles.card} ${styles.stable}`}>
                <div className={styles.content}>
                  <div className={styles.type}>Desktop</div>
                  <span className={styles.description}>桌面应用</span>
                </div>
                <div className={styles.downloads}>
                  <a
                    href={OOMOL_AI_DOWNLOAD_URLS.macos}
                    onClick={event =>
                      downloadStable(event, OOMOL_AI_DOWNLOAD_URLS.macos)
                    }
                  >
                    <i
                      className={`${styles["download-icon"]} i-codicon-desktop-download`}
                    />
                    下载 Mac 版
                  </a>
                  <a
                    href={OOMOL_AI_DOWNLOAD_URLS.windows}
                    onClick={event =>
                      downloadStable(event, OOMOL_AI_DOWNLOAD_URLS.windows)
                    }
                  >
                    <i
                      className={`${styles["download-icon"]} i-codicon-desktop-download`}
                    />
                    下载 Windows 版
                  </a>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.type}>iOS</div>
                  <span className={styles.description}>移动应用</span>
                </div>
                <div className={styles.downloads}>
                  <a
                    href={OOMOL_AI_DOWNLOAD_URLS.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className={`${styles["download-icon"]} i-codicon-link-external`}
                    />
                    打开 App Store
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="studio-downloads" className={styles.pageSection}>
            <div className={styles.sectionHeading}>
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
                      <span className={styles.description}>
                        {item.subTitle}
                      </span>
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
          </section>

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
                <Link className={styles.pageCtaPrimaryAction} to={cliGuideUrl}>
                  {translate({
                    message: "HOME.Downloads.cta.primary",
                  })}
                </Link>
                <Link
                  className={styles.pageCtaSecondaryAction}
                  to={studioDownloadsUrl}
                >
                  {translate({
                    message: "HOME.Downloads.cta.secondary",
                  })}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
