import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React, { useRef, useState } from "react";

import { DownloadButton } from "../DownloadButton";

const zhCopy = {
  slogan: `把自己的工具更快
带进 oo-cli`,
  overview: `现成工具不够用时，用 Studio 做出并验证第一版工具，再通过 Cloud 发布到 oo-cli，让 Codex、Claude Code 和终端都能直接调用。`,
  secondaryCta: "查看 Cloud 文档",
  playAriaLabel: "播放演示视频",
  downloadButtonTexts: {
    macos: "下载适用于 macOS 的版本",
    macosStable: "下载适用于 macOS 的版本（稳定版）",
    macosNote: "仅支持 Apple Silicon Mac",
    windows: "下载适用于 Windows 的版本",
    windowsStable: "下载适用于 Windows 的版本（稳定版）",
    windowsSubtitle: "仅支持 x64 版本",
  },
};

const enCopy = {
  slogan: `Bring your own tools
to oo-cli faster`,
  overview: `When ready-made tools stop short, use Studio to build and validate the first version, then publish through Cloud so it shows up in oo-cli for Codex, Claude Code, and terminal workflows.`,
  secondaryCta: "Read Cloud docs",
  playAriaLabel: "Play demo video",
  downloadButtonTexts: {
    macos: "Download for macOS",
    macosStable: "Download for macOS (Stable)",
    macosNote: "Apple Silicon Mac only",
    windows: "Download for Windows",
    windowsStable: "Download for Windows (Stable)",
    windowsSubtitle: "only supports x64",
  },
};

export default function CloudPageFirstScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoUrl = useBaseUrl(
    "https://static.oomol.com/assets/homepage/oomol-flow-en.webm"
  );
  const heroVideoPosterUrl = useBaseUrl(
    "/img/pages/home/homepage-first-screen-workflow-poster.png"
  );

  const handlePlay = async () => {
    if (!videoRef.current) {
      return;
    }

    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.titleGroup}>
          <h1 className={styles.slogan}>{copy.slogan}</h1>
          <p className={styles.overview}>{copy.overview}</p>
          <div className={styles.actions}>
            <DownloadButton centered texts={copy.downloadButtonTexts} />
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryCta}
            >
              <Link to="/docs/cloud-services/cloud-function">
                {copy.secondaryCta}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.videoShowcase}>
        <div className={styles.videoShowcaseInner}>
          <div className={styles.videoFrame}>
            {!isPlaying && (
              <button
                type="button"
                className={styles.playOverlay}
                onClick={handlePlay}
                aria-label={copy.playAriaLabel}
              >
                <span className={styles.playButton}>
                  <span className={styles.playTriangle} aria-hidden="true" />
                </span>
              </button>
            )}
            <video
              ref={videoRef}
              className={styles.heroVideo}
              controls={isPlaying}
              poster={heroVideoPosterUrl}
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => {
                if (videoRef.current && videoRef.current.currentTime === 0) {
                  setIsPlaying(false);
                }
              }}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={heroVideoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
