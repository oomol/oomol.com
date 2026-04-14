import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React, { useRef, useState } from "react";

const zhCopy = {
  slogan: `把自己的工具更快
带进 oo-cli`,
  overview: `把 Studio 里的自定义工具交付到 oo-cli，让 Agent、Codex 和 OpenCrawl 直接调用。`,
  primaryCta: "开始使用 oo-cli",
  secondaryCta: "下载 OOMOL Studio",
  playAriaLabel: "播放演示视频",
};

const enCopy = {
  slogan: `Bring your own tools
to oo-cli faster`,
  overview: `Deliver the custom tools from Studio to oo-cli, so Agents, Codex, and OpenCrawl can use them directly.`,
  primaryCta: "Start with oo-cli",
  secondaryCta: "Download OOMOL Studio",
  playAriaLabel: "Play demo video",
};

export default function CloudPageFirstScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const videoRef = useRef<HTMLVideoElement>(null);
  const studioDownloadsHref = useBaseUrl("/downloads");
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
            <Button asChild size="lg" className={styles.primaryCta}>
              <Link to="/docs/cloud-services/cli">{copy.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryCta}
            >
              <Link to={studioDownloadsHref}>
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
