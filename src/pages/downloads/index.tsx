import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
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
        <title>{translate({ message: "HOME.Downloads.page.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "HOME.Downloads.page.description" })}
        />
      </Head>
      <main className={`${styles.page} oomol-landing-main`}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>
              {translate({ message: "HOME.Downloads.hero.eyebrow" })}
            </span>
            <div className={styles.titleBox}>
              <h1 className={styles.heroTitle}>
                {translate({ message: "HOME.Downloads.hero.title" })}
              </h1>
              <p className={styles.heroSubtitle}>
                {translate({ message: "HOME.Downloads.hero.subtitle" })}
              </p>
            </div>
          </div>
        </section>

        <div className={styles.container}>
          <section className={styles.pageSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeadingBlock}>
                <span className={styles.eyebrow}>
                  {translate({ message: "HOME.Downloads.cli.eyebrow" })}
                </span>
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

          <section id="studio-downloads" className={styles.pageSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeadingBlock}>
                <span className={styles.eyebrow}>
                  {translate({ message: "HOME.Downloads.studio.eyebrow" })}
                </span>
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
                        {translate({ message: "HOME.Downloads.recommended" })}
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

          <section className={styles.pageSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeadingBlock}>
                <span className={styles.eyebrow}>
                  {translate({ message: "HOME.Downloads.ai.eyebrow" })}
                </span>
                <h2 className={styles.sectionTitle}>
                  {translate({ message: "HOME.Downloads.ai.title" })}
                </h2>
                <p className={styles.sectionSubtitle}>
                  {translate({ message: "HOME.Downloads.ai.subtitle" })}
                </p>
              </div>
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.type}>Web</div>
                  <span className={styles.description}>
                    {translate({
                      message: "HOME.Downloads.ai.web.description",
                    })}
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
                      {translate({
                        message: "HOME.Downloads.ai.action.openWeb",
                      })}
                    </a>
                  </Button>
                </div>
              </div>
              <div className={`${styles.card} ${styles.stable}`}>
                <span className={styles.cardBadge}>
                  {translate({ message: "HOME.Downloads.recommended" })}
                </span>
                <div className={styles.content}>
                  <div className={styles.type}>Desktop</div>
                  <span className={styles.description}>
                    {translate({
                      message: "HOME.Downloads.ai.desktop.description",
                    })}
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
                      {translate({
                        message: "HOME.Downloads.ai.action.desktopMac",
                      })}
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
                      {translate({
                        message: "HOME.Downloads.ai.action.desktopWindows",
                      })}
                    </a>
                  </Button>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.type}>iOS</div>
                  <span className={styles.description}>
                    {translate({
                      message: "HOME.Downloads.ai.ios.description",
                    })}
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
                      {translate({
                        message: "HOME.Downloads.ai.action.openStore",
                      })}
                    </a>
                  </Button>
                </div>
              </div>
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
