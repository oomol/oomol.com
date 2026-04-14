import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React, { useRef, useState } from "react";

import { DownloadButton } from "../DownloadButton";

const zhCopy = {
  ownershipNote: "开源还是闭源，",
  ownershipHighlight: "都由你自己决定。",
  slogan: `让 Agent 用上你的工具
代码依然由你掌控`,
  overview: `用 OOMOL 做出来的工具，背后的函数和逻辑在云端稳定执行；
用户安装 oo-cli 后即可直接在 Codex 和 Claude Code 中使用。`,
  secondaryCta: "先用 oo-cli",
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
  ownershipNote: "Open source or closed source,",
  ownershipHighlight: "it is your call.",
  slogan: `Let agents use your tools.
You stay in control of the code.`,
  overview: `Tools built with OOMOL run their underlying functions and logic reliably in the cloud;
once users install oo-cli, they can use them directly in Codex and Claude Code.`,
  secondaryCta: "Start with oo-cli",
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
          <p className={styles.ownershipNote}>
            <span>{copy.ownershipNote}</span>
            <strong className={styles.ownershipHighlight}>
              {copy.ownershipHighlight}
            </strong>
          </p>
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
              <Link to="/docs/cloud-services/cli">{copy.secondaryCta}</Link>
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
