import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DownloadsCliPanel from "@site/src/components/DownloadsCliPanel";
import { DownloadUrl } from "@site/src/download_url";
import { downloadStable } from "@site/src/lib/utils";
import Layout from "@theme/Layout";
import React from "react";

const OOMOL_AI_DOWNLOAD_URLS = {
  web: "https://app.oomol.com",
  ios: "https://apps.apple.com/cn/app/%E6%82%9F%E5%A2%A8-ai-oomol-%E5%AF%B9%E8%AF%9D%E5%BC%8F%E4%BA%91%E5%87%BD%E6%95%B0/id6749377154",
  macos: "https://app-downloads.oomol.com/oomol-ai/darwin/arm64",
  windows: "https://app-downloads.oomol.com/oomol-ai/win32/x64",
} as const;

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
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const copy = isZh
    ? {
        pageTitle: "获取与安装 OOMOL",
        pageDescription:
          "先安装 oo-cli；需要生产、组合或编排新工具时再下载 OOMOL Studio；如果你更想通过图形界面使用同一套能力，就打开 OOMOL AI。",
        heroTitle: "获取与安装 OOMOL",
        heroSubtitle:
          "先安装 oo-cli；需要生产、组合或编排新工具时再下载 OOMOL Studio；如果你更想通过图形界面使用同一套能力，也可以在下方直接打开 OOMOL AI。",
        ai: {
          title: "如果你更想用图形界面，就用 OOMOL AI",
          subtitle:
            "OOMOL AI 是使用 oo-cli 能力的对话式图形入口，适合在 Web、桌面和 iOS 中更自然地连续完成任务；如果你要生产或编排新工具，请进入 OOMOL Studio。",
          actions: {
            openWeb: "打开网页版",
            desktopMac: "下载 Mac 版",
            desktopWindows: "下载 Windows 版",
            openStore: "打开 App Store",
          },
        },
      }
    : {
        pageTitle: "Get and Install OOMOL",
        pageDescription:
          "Install oo-cli first, move into OOMOL Studio when you need to produce or orchestrate new tools, and open OOMOL AI when you want a GUI entry point for the same capabilities.",
        heroTitle: "Get and Install OOMOL",
        heroSubtitle:
          "Install oo-cli first, move into OOMOL Studio when you need to produce or orchestrate new tools, and open OOMOL AI below when you want a GUI entry point for the same capabilities.",
        ai: {
          title: "If you prefer a GUI, use OOMOL AI",
          subtitle:
            "OOMOL AI is the chat-based GUI entry point for using oo-cli capabilities across web, desktop, and iOS. If you want to build, combine, or orchestrate new tools, move into OOMOL Studio.",
          actions: {
            openWeb: "Open Web App",
            desktopMac: "Download for macOS",
            desktopWindows: "Download for Windows",
            openStore: "Open App Store",
          },
        },
      };
  const logoUrl = useBaseUrl("/img/logo2x.png");
  const cliGuideUrl = useBaseUrl("/docs/oo-cli");
  const studioDownloadsUrl = useBaseUrl("/downloads#studio-downloads");

  return (
    <Layout>
      <Head>
        <title>{copy.pageTitle}</title>
        <meta name="description" content={copy.pageDescription} />
      </Head>
      <div className={styles.container}>
        <img className={styles.image} src={logoUrl} />
        <div className={styles.titleBox}>
          <h1 className={styles.title}>{copy.heroTitle}</h1>
          <p className={styles["sub-title"]}>{copy.heroSubtitle}</p>
        </div>

        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.Downloads.cli.info.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.Downloads.cli.info.description" })}
          </p>
          <div className={styles.sectionActions}>
            <a className={styles.sectionAction} href={cliGuideUrl}>
              {translate({ message: "HOME.Downloads.cli.action.guide" })}
            </a>
            <a
              className={styles.sectionAction}
              href="https://github.com/oomol-lab/oo-cli"
              rel="noreferrer"
              target="_blank"
            >
              {translate({ message: "HOME.Downloads.cli.action.github" })}
            </a>
          </div>
        </div>
        <DownloadsCliPanel />
        <div id="studio-downloads" className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.Downloads.studioSection.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.Downloads.studioSection.subtitle" })}
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
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>{copy.ai.title}</h2>
          <p className={styles.sectionSubtitle}>{copy.ai.subtitle}</p>
          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.content}>
                <div className={styles.type}>Web</div>
                <span className={styles.description}>
                  {isZh ? "对话式图形入口" : "Chat GUI"}
                </span>
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
                  {copy.ai.actions.openWeb}
                </a>
              </div>
            </div>
            <div className={`${styles.card} ${styles.stable}`}>
              <div className={styles.content}>
                <div className={styles.type}>Desktop</div>
                <span className={styles.description}>
                  {isZh ? "桌面应用" : "Desktop app"}
                </span>
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
                  {copy.ai.actions.desktopMac}
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
                  {copy.ai.actions.desktopWindows}
                </a>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.content}>
                <div className={styles.type}>iOS</div>
                <span className={styles.description}>
                  {isZh ? "移动应用" : "Mobile app"}
                </span>
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
                  {copy.ai.actions.openStore}
                </a>
              </div>
            </div>
          </div>
        </div>
        <section className={styles.pageCtaSection}>
          <div className={styles.pageCtaPanel}>
            <div className={styles.pageCtaContent}>
              <h2 className={styles.pageCtaTitle}>
                {translate({ message: "HOME.Downloads.cta.title" })}
              </h2>
              <p className={styles.pageCtaDescription}>
                {translate({ message: "HOME.Downloads.cta.description" })}
              </p>
            </div>
            <div className={styles.pageCtaActions}>
              <a className={styles.pageCtaPrimaryAction} href={cliGuideUrl}>
                {translate({ message: "HOME.Downloads.cta.primary" })}
              </a>
              <a
                className={styles.pageCtaSecondaryAction}
                href={studioDownloadsUrl}
              >
                {translate({ message: "HOME.Downloads.cta.secondary" })}
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
