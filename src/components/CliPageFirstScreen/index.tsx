import styles from "../CloudPageFirstScreen/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React, { useRef, useState } from "react";

const CLI_DEMO_VIDEO_URL =
  "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm";

const zhCopy = {
  slogan: `先在 oo-cli 里
把任务跑起来`,
  overview: `让 Codex、Claude Code 和本地终端先搜索、查看并调用现成工具。现成工具不够时，再自然进入 Studio 和 Cloud 继续扩展。`,
  primaryCta: "查看安装文档",
  secondaryCta: "查看 GitHub",
  playAriaLabel: "播放 CLI 演示视频",
};

const enCopy = {
  slogan: `Start in oo-cli
before you build anything else`,
  overview: `Let Codex, Claude Code, and local terminal workflows search, inspect, and run ready-made tools first. When they stop short, continue naturally in Studio and Cloud.`,
  primaryCta: "Open install guide",
  secondaryCta: "View GitHub",
  playAriaLabel: "Play CLI demo video",
};

export default function CliPageFirstScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoPosterUrl = useBaseUrl(
    i18n.currentLocale === "zh-CN"
      ? "/img/docs/cn/terminal.png"
      : "/img/docs/terminal.png"
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
            <Button asChild size="lg" className={styles.primaryCta}>
              <Link to="/docs/cloud-services/cli">{copy.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryCta}
            >
              <a
                href="https://github.com/oomol-lab/oo-cli"
                rel="noreferrer"
                target="_blank"
              >
                {copy.secondaryCta}
              </a>
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
              <source src={CLI_DEMO_VIDEO_URL} type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
