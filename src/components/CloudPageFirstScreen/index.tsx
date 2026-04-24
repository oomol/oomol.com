import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import { HeroVideoDialog } from "@site/src/components/ui/hero-video-dialog";
import React from "react";

const zhCopy = {
  slogan: `把工具的交付、托管运行
和访问控制交给 Cloud`,
  overview: `Studio 负责把工具做出来并验证；Cloud 负责把它交付出去，承接托管运行、配置和权限，并继续主要沿 oo-cli 给 Agent 使用。`,
  highlights: ["AI Agent 能直接用", "在线运行", "保存密钥", "管理谁能用"],
  primaryCta: "查看 Cloud 文档",
  secondaryCta: "打开 Cloud 控制台",
  playAriaLabel: "播放演示视频",
};

const enCopy = {
  slogan: `Put delivery, hosted runtime,
and access control in Cloud`,
  overview: `Studio is where the tool gets built and validated. Cloud is where delivery happens, with hosted runtime, configuration, and access handled in one place, then used mainly through oo-cli by agents.`,
  highlights: [
    "Ready for agents",
    "Runs in Cloud",
    "Stores secrets",
    "Control access",
  ],
  primaryCta: "Read Cloud docs",
  secondaryCta: "Open Cloud Console",
  playAriaLabel: "Play demo video",
};

export default function CloudPageFirstScreen() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const heroVideoUrl =
    "https://static.oomol.com/assets/homepage/oomol-flow-en.webm";
  const heroVideoPosterUrl = useBaseUrl(
    "/img/pages/home/homepage-first-screen-workflow-poster.webp"
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleGroup}>
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
          <HeroVideoDialog
            videoSrc={heroVideoUrl}
            thumbnailSrc={heroVideoPosterUrl}
            thumbnailAlt="OOMOL Cloud workflow demo"
            title="OOMOL Cloud workflow demo"
            playAriaLabel={copy.playAriaLabel}
          />
        </div>
      </div>
    </section>
  );
}
