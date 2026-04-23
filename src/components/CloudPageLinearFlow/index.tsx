import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CloudPageDeveloperBenefits from "@site/src/components/CloudPageDeveloperBenefits";
import ResponsiveVideo from "@site/src/components/mdx/ResponsiveVideo";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
} as const;

type Copy = {
  cloud: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    media: { title: string };
    docs: string;
    secondary: string;
  };
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string };
    guide: string;
    github: string;
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

type VideoCardProps = {
  title: string;
  src: string;
};

type ImageCardProps = {
  title: string;
  src: string;
};

function VideoCard({ title, src }: VideoCardProps) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.videoCardMedia}>
        <ResponsiveVideo
          autoPlay
          className={styles.videoCardVideo}
          loop
          muted
          playsInline
          preload="none"
          src={src}
          type="video/webm"
          loadRootMargin="360px 0px"
          aria-label={title}
        />
      </div>
    </div>
  );
}

function ImageCard({ title, src }: ImageCardProps) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.imageCardMedia}>
        <img
          className={styles.imageCardImage}
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

const zhCopy: Copy = {
  cloud: {
    eyebrow: "01 / Cloud",
    title: "发布到 Cloud，让工具在线运行",
    description:
      "本地测试没问题后，把工具发布到 Cloud。它会在云端运行，密钥和谁能使用也都在 Cloud 里管理。",
    points: ["云端运行", "保存密钥", "管理谁能用"],
    media: {
      title: "Cloud 控制台预览",
    },
    docs: "查看 Cloud 文档",
    secondary: "打开 Cloud 控制台",
  },
  cli: {
    eyebrow: "02 / oo-cli",
    title: "发布后，AI Agent 仍在 oo-cli 里使用工具",
    description:
      "使用者不用知道工具部署在哪里，也不用换新的使用方式。工具发布后，AI Agent 仍然可以在 oo-cli 里搜索、查看并运行它；以后如果需要 API、MCP 或自动化，再继续扩展。",
    media: {
      title: "oo-cli 调用演示",
    },
    guide: "了解 oo-cli",
    github: "查看 GitHub",
  },
  cta: {
    title: "把跑通的工具发布给 AI Agent 使用",
    description:
      "Cloud 负责在线运行、保存密钥和管理谁能使用；AI Agent 继续在 oo-cli 里使用工具。",
    primary: "查看 Cloud 文档",
    secondary: "打开 Cloud 控制台",
  },
};

const enCopy: Copy = {
  cloud: {
    eyebrow: "01 / Cloud",
    title: "Publish the tool to Cloud and keep it running",
    description:
      "After local testing, publish the tool to Cloud. It runs online, and Cloud manages secrets and who can use it.",
    points: ["Runs online", "Stores secrets", "Controls access"],
    media: {
      title: "Cloud console preview",
    },
    docs: "Read Cloud docs",
    secondary: "Open Cloud Console",
  },
  cli: {
    eyebrow: "02 / oo-cli",
    title: "After publishing, agents still find and run it with oo-cli",
    description:
      "Users do not need to know where the tool is deployed or learn a new workflow. After publishing, they can still search, inspect, and run it in oo-cli. If you later need an API, MCP, or automation, you can add those paths.",
    media: {
      title: "oo-cli invocation demo",
    },
    guide: "Explore oo-cli",
    github: "View GitHub",
  },
  cta: {
    title: "Publish working tools for agents to use",
    description:
      "Cloud keeps the tool running, stores secrets, and controls who can use it. Agents keep finding and running the tool through oo-cli.",
    primary: "Read Cloud docs",
    secondary: "Open Cloud Console",
  },
};

export default function CloudPageLinearFlow() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const cloudConsoleImage = useBaseUrl(
    i18n.currentLocale === "zh-CN"
      ? "/img/pages/home/cloud-console-zh.webp"
      : "/img/pages/home/cloud-console-en.webp"
  );

  return (
    <div className={`${styles.flow} oomol-no-section-isolation`}>
      {/* ── Section: Cloud ── */}
      <section className={clsx(styles.section, styles.cloudSection)}>
        <div className={clsx(styles.container, styles.cloudContainer)}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cloud.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cloud.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.cloud.description}
            </p>
            <div className={styles.cloudPointList} aria-label="Cloud covers">
              {copy.cloud.points.map(point => (
                <span key={point} className={styles.cloudPoint}>
                  {point}
                </span>
              ))}
            </div>
            <div className={styles.inlineActions}>
              <Link
                to="/docs/cloud-services/cloud-function"
                className={styles.primaryLink}
              >
                {copy.cloud.docs}
              </Link>
              <a
                href="https://console.oomol.com/cloud-function"
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryLink}
              >
                {copy.cloud.secondary}
              </a>
            </div>
          </div>

          <div className={clsx(styles.mediaPanel, styles.cloudMediaPanel)}>
            <ImageCard title={copy.cloud.media.title} src={cloudConsoleImage} />
          </div>
        </div>
      </section>

      {/* ── Section: oo-cli ── */}
      <section className={clsx(styles.section, styles.cliSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cli.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cli.title}</h2>
            <p className={styles.sectionDescription}>{copy.cli.description}</p>
            <div className={styles.inlineActions}>
              <Link to="/docs/oo-cli" className={styles.primaryLink}>
                {copy.cli.guide}
              </Link>
              <a
                href="https://github.com/oomol-lab/oo-cli"
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryLink}
              >
                {copy.cli.github}
              </a>
            </div>
          </div>

          <div className={styles.mediaPanel}>
            <VideoCard
              title={copy.cli.media.title}
              src={homepageMediaUrls.cli}
            />
          </div>
        </div>
      </section>

      <CloudPageDeveloperBenefits />

      {/* ── CTA ── */}
      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/docs/cloud-services/cloud-function">
                {copy.cta.primary}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://console.oomol.com/cloud-function"
                target="_blank"
                rel="noreferrer"
              >
                {copy.cta.secondary}
              </a>
            </Button>
          </>
        }
      />
    </div>
  );
}
