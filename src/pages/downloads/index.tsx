import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DownloadsCliPanel from "@site/src/components/DownloadsCliPanel";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import { DownloadUrl } from "@site/src/download_url";
import { downloadStable } from "@site/src/lib/utils";
import Layout from "@theme/Layout";
import React, { useEffect } from "react";

const OOMOL_AI_DOWNLOAD_URLS = {
  web: "https://app.oomol.com",
  ios: "https://apps.apple.com/app/id6749377154",
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
          description: "Download for macOS (Apple silicon)",
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
    type: translate({ message: "HOME.Downloads.Stable.title" }),
    subTitle: translate({ message: "HOME.Downloads.Stable.subtitle" }),
    downloads: [
      {
        text: translate({
          message: "HOME.Downloads.download.macos.applesilicon",
          description: "Download for macOS (Apple silicon)",
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
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const copy = isZh
    ? {
        pageTitle: "获取与安装 OOMOL",
        pageDescription:
          "以 oo-cli 作为主入口，把 Agent 接到现成工具与能力上；如果你更喜欢图形界面，可以使用 OOMOL AI；如果你要自己做工具，再下载 OOMOL Studio。",
        heroEyebrow: "获取与安装",
        heroTitle: "选择最适合你的 OOMOL 入口",
        heroSubtitle:
          "如果你想在终端里让 Agent 直接使用工具，就从 oo-cli 开始；如果你更喜欢图形界面，可以使用 OOMOL AI；如果你要自己做工具，再下载 OOMOL Studio。",
        recommended: "推荐",
        cliEyebrow: "命令行入口",
        aiEyebrow: "图形界面入口",
        studioEyebrow: "构建工具入口",
        ai: {
          title: "如果你更喜欢图形界面，可以使用 OOMOL AI",
          subtitle:
            "OOMOL AI 是同一套能力的官方 GUI 入口，适合在 Web、桌面和 iOS 中直接对话、查看结果并继续处理任务。如果你只是想更轻松地使用工具，从这里开始就可以。",
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
          "Use oo-cli as the primary entry point to connect agents to ready-made tools and capabilities. If you prefer a GUI, use OOMOL AI. Download OOMOL Studio when you want to build your own tools.",
        heroEyebrow: "Downloads",
        heroTitle: "Choose the OOMOL entry point that fits you best",
        heroSubtitle:
          "Start with oo-cli if you want agents to use tools in the terminal. Use OOMOL AI if you prefer a GUI. Download OOMOL Studio when you want to build your own tools.",
        recommended: "Recommended",
        cliEyebrow: "Command line",
        aiEyebrow: "GUI",
        studioEyebrow: "Tool builder",
        ai: {
          title: "If you prefer a GUI, use OOMOL AI",
          subtitle:
            "OOMOL AI is the official GUI for the same tools, giving you an easier way to chat, review results, and keep working across web, desktop, and iOS. If you mainly want an easier way to use tools, start here.",
          actions: {
            openWeb: "Open Web App",
            desktopMac: "Download for macOS",
            desktopWindows: "Download for Windows",
            openStore: "Open App Store",
          },
        },
      };
  const cliGuideUrl = useBaseUrl("/docs/oo-cli");
  const studioDownloadsUrl = useBaseUrl("/downloads?section=studio-downloads");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const currentUrl = new URL(window.location.href);
    const sectionId =
      currentUrl.searchParams.get("section") ??
      (currentUrl.hash ? currentUrl.hash.slice(1) : "");

    if (!sectionId) {
      return;
    }

    const scrollToSection = () => {
      const target = document.getElementById(sectionId);
      if (!target) {
        return false;
      }

      target.scrollIntoView({ block: "start" });
      return true;
    };

    if (scrollToSection()) {
      return;
    }

    const rafId = window.requestAnimationFrame(scrollToSection);
    const timeoutId = window.setTimeout(scrollToSection, 120);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>{copy.pageTitle}</title>
        <meta name="description" content={copy.pageDescription} />
      </Head>
      <main className={`${styles.page} oomol-landing-main`}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>{copy.heroEyebrow}</span>
            <div className={styles.titleBox}>
              <h1 className={styles.title}>{copy.heroTitle}</h1>
              <p className={styles["sub-title"]}>{copy.heroSubtitle}</p>
            </div>
          </div>
        </section>

        <div className={styles.container}>
          <section className={styles.pageSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeadingBlock}>
                <span className={styles.eyebrow}>{copy.cliEyebrow}</span>
                <h2 className={styles.sectionTitle}>
                  {translate({ message: "HOME.Downloads.cli.info.title" })}
                </h2>
                <p className={styles.sectionSubtitle}>
                  {translate({
                    message: "HOME.Downloads.cli.info.description",
                  })}
                </p>
              </div>
              <div className={styles.sectionActions}>
                <Button asChild variant="outline" size="sm">
                  <Link to={cliGuideUrl}>
                    {translate({ message: "HOME.Downloads.cli.action.guide" })}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/oomol-lab/oo-cli"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {translate({ message: "HOME.Downloads.cli.action.github" })}
                  </a>
                </Button>
              </div>
            </div>
            <DownloadsCliPanel />
          </section>

          <section className={styles.pageSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeadingBlock}>
                <span className={styles.eyebrow}>{copy.aiEyebrow}</span>
                <h2 className={styles.sectionTitle}>{copy.ai.title}</h2>
                <p className={styles.sectionSubtitle}>{copy.ai.subtitle}</p>
              </div>
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.type}>Web</div>
                  <span className={styles.description}>
                    {isZh ? "对话式图形入口" : "Chat-based interface"}
                  </span>
                </div>
                <div className={styles.downloads}>
                  <Button asChild size="sm">
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
                  </Button>
                </div>
              </div>
              <div className={`${styles.card} ${styles.stable}`}>
                <span className={styles.cardBadge}>{copy.recommended}</span>
                <div className={styles.content}>
                  <div className={styles.type}>Desktop</div>
                  <span className={styles.description}>
                    {isZh ? "桌面应用" : "Desktop app"}
                  </span>
                </div>
                <div className={styles.downloads}>
                  <Button asChild size="sm">
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
                  </Button>
                  <Button asChild variant="outline" size="sm">
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
                  </Button>
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
                  <Button asChild size="sm">
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
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section id="studio-downloads" className={styles.pageSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeadingBlock}>
                <span className={styles.eyebrow}>{copy.studioEyebrow}</span>
                <h2 className={styles.sectionTitle}>
                  {translate({ message: "HOME.Downloads.studioSection.title" })}
                </h2>
                <p className={styles.sectionSubtitle}>
                  {translate({
                    message: "HOME.Downloads.studioSection.subtitle",
                  })}
                </p>
              </div>
            </div>
            <div className={`${styles.cards} ${styles.cardsTwo}`}>
              {downloadData.map((item, index) => {
                const isRecommended = !!item.mostRecommended;
                return (
                  <div
                    className={`${styles.card} ${item.className ?? ""}`}
                    key={`download-${index}`}
                  >
                    {isRecommended && (
                      <span className={styles.cardBadge}>
                        {copy.recommended}
                      </span>
                    )}
                    <div className={styles.content}>
                      <div className={styles.type}>{item.type}</div>
                      <span className={styles.description}>
                        {item.subTitle}
                      </span>
                    </div>
                    <div className={styles.downloads}>
                      {item.downloads.map((download, i) => (
                        <Button
                          key={`download-${index}-${i}`}
                          asChild
                          variant={i === 0 ? "default" : "outline"}
                          size="sm"
                        >
                          <a
                            href={download.url}
                            onClick={
                              isRecommended
                                ? event => downloadStable(event, download.url)
                                : undefined
                            }
                          >
                            <i
                              className={`${styles["download-icon"]} i-codicon-desktop-download`}
                            />
                            {download.text}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <SiteCta
          title={translate({ message: "HOME.Downloads.cta.title" })}
          description={translate({ message: "HOME.Downloads.cta.description" })}
          actions={
            <>
              <Button asChild size="lg">
                <Link to={cliGuideUrl}>
                  {translate({ message: "HOME.Downloads.cta.primary" })}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={studioDownloadsUrl}>
                  {translate({ message: "HOME.Downloads.cta.secondary" })}
                </Link>
              </Button>
            </>
          }
        />
      </main>
    </Layout>
  );
}
