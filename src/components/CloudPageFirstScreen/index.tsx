import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React, { useRef, useState } from "react";

const zhCopy = {
  eyebrow: "Cloud 交付层",
  slogan: `把工具的交付、托管运行
和访问控制交给 Cloud`,
  overview: `Studio 负责把工具做出来并验证；Cloud 负责把同一份实现交付出去，承接运行配置、Secrets、权限和使用关系。`,
  highlights: ["交付", "托管运行", "Secrets", "访问控制"],
  primaryCta: "查看 Cloud 文档",
  secondaryCta: "打开 Cloud 控制台",
  playAriaLabel: "播放演示视频",
};

const enCopy = {
  eyebrow: "Cloud delivery layer",
  slogan: `Hand delivery, hosted runtime,
and access control to Cloud`,
  overview: `Studio is where the tool gets built and validated. Cloud is where the same implementation gets delivered, with runtime settings, secrets, access, and usage relationships handled in one place.`,
  highlights: ["Delivery", "Hosted runtime", "Secrets", "Access control"],
  primaryCta: "Read Cloud docs",
  secondaryCta: "Open Cloud Console",
  playAriaLabel: "Play demo video",
};

export default function CloudPageFirstScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoUrl =
    "https://static.oomol.com/assets/homepage/oomol-flow-en.webm";
  const heroVideoPosterUrl =
    "/img/pages/home/homepage-first-screen-workflow-poster.png";

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
          <div className={styles.eyebrow}>{copy.eyebrow}</div>
          <h1 className={styles.slogan}>{copy.slogan}</h1>
          <p className={styles.overview}>{copy.overview}</p>
          <div className={styles.highlights}>
            {copy.highlights.map(item => (
              <span key={item} className={styles.highlightPill}>
                {item}
              </span>
            ))}
          </div>
          <div className={styles.actions}>
            <Button asChild size="lg" className={styles.primaryCta}>
              <Link to="/docs/cloud-services/cloud-function">
                {copy.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryCta}
            >
              <a
                href="https://console.oomol.com/cloud-function"
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
              <source src={heroVideoUrl} type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
