import styles from "./styles.module.scss";
import siteCtaStyles from "@site/src/components/SiteCta/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CloudPageDeveloperBenefits from "@site/src/components/CloudPageDeveloperBenefits";
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
    cards: Array<{ title: string; text: string }>;
    media: { title: string; note: string; pills: string[] };
    docs: string;
    secondary: string;
  };
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string; note: string };
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
  note: string;
  src: string;
};

type ImageCardProps = {
  title: string;
  note: string;
  src: string;
  pills: string[];
};

function VideoCard({ title, note, src }: VideoCardProps) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.videoCardMedia}>
        <video
          className={styles.videoCardVideo}
          autoPlay
          loop
          muted
          controls
          playsInline
          preload="metadata"
          aria-label={title}
        >
          <source src={src} type="video/webm" />
        </video>
      </div>
      <div className={styles.videoCardMeta}>
        <h3 className={styles.videoCardTitle}>{title}</h3>
        <p className={styles.videoCardNote}>{note}</p>
      </div>
    </div>
  );
}

function ImageCard({ title, note, src, pills }: ImageCardProps) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.imageCardMedia}>
        <img className={styles.imageCardImage} src={src} alt={title} />
      </div>
      <div className={styles.videoCardMeta}>
        <h3 className={styles.videoCardTitle}>{title}</h3>
        <p className={styles.videoCardNote}>{note}</p>
        <div className={styles.cloudMetaRow}>
          {pills.map(pill => (
            <span key={pill} className={styles.cloudMetaPill}>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const zhCopy: Copy = {
  cloud: {
    eyebrow: "01 / Cloud",
    title: "把交付、托管运行、配置和权限放进同一个后台",
    description:
      "工具验证完成后，Cloud 承接交付，并统一管理托管运行、运行配置、Secrets、访问控制和使用关系。你不需要再围着同一份实现补另一套后台。",
    cards: [
      {
        title: "交付和托管运行沿用同一份实现",
        text: "工具交付出去之后，继续沿用同一份实现，不需要再围绕它重做一层服务。",
      },
      {
        title: "配置和 Secrets 集中管理",
        text: "把运行配置、Secrets 和环境差异放到同一个后台里维护。",
      },
      {
        title: "权限、状态和使用关系统一查看",
        text: "访问控制、运行状态和使用关系集中管理，减少分散维护。",
      },
    ],
    media: {
      title: "Cloud 控制台预览",
      note: "在同一个后台里管理交付、运行配置、Secrets 和访问控制。",
      pills: ["交付", "运行配置", "Secrets", "访问控制"],
    },
    docs: "查看 Cloud 文档",
    secondary: "打开 Cloud 控制台",
  },
  cli: {
    eyebrow: "02 / oo-cli",
    title: "交付之后，Agent 仍然沿 oo-cli 这条路径来使用",
    description:
      "对使用者来说，不需要认识你背后的实现，也不需要切换工作方式。工具交付后，他们仍然在 oo-cli 中搜索、查看和调用。",
    media: {
      title: "oo-cli 调用演示",
      note: "展示已交付工具在 Codex 中被搜索、查看和调用。",
    },
    guide: "了解 oo-cli",
    github: "查看 GitHub",
  },
  cta: {
    title: "让 Cloud 接住已经验证好的工具",
    description:
      "用 Cloud 承接交付、托管运行、配置、Secrets 和访问控制，然后继续把工具交给 oo-cli 使用。",
    primary: "查看 Cloud 文档",
    secondary: "打开 Cloud 控制台",
  },
};

const enCopy: Copy = {
  cloud: {
    eyebrow: "01 / Cloud",
    title: "Keep delivery, hosted runtime, config, and access in one backend",
    description:
      "Once the tool is validated, Cloud takes over delivery and keeps hosted runtime, runtime settings, secrets, access control, and usage relationships in one place. You do not need another backend around the same implementation.",
    cards: [
      {
        title: "Keep delivery and hosted runtime on the same implementation",
        text: "Once the tool is delivered, the same implementation keeps running instead of being rebuilt behind another service layer.",
      },
      {
        title: "Manage config and secrets together",
        text: "Keep runtime settings, secrets, and environment differences in one console.",
      },
      {
        title: "Review access, status, and usage relationships in one place",
        text: "Manage permissions, runtime status, and usage relationships without splitting them across tools.",
      },
    ],
    media: {
      title: "Cloud console preview",
      note: "Keep delivery, runtime settings, secrets, and access control in one backend.",
      pills: ["Delivery", "Runtime settings", "Secrets", "Access control"],
    },
    docs: "Read Cloud docs",
    secondary: "Open Cloud Console",
  },
  cli: {
    eyebrow: "02 / oo-cli",
    title: "After delivery, agents still use it through the oo-cli path",
    description:
      "For the user, there is no need to understand your implementation or learn a new workflow. Once delivered, they still search, inspect, and use it through oo-cli.",
    media: {
      title: "oo-cli invocation demo",
      note: "Show a delivered tool being searched, inspected, and called in Codex.",
    },
    guide: "Explore oo-cli",
    github: "View GitHub",
  },
  cta: {
    title: "Let Cloud take over validated tools",
    description:
      "Use Cloud to handle delivery, hosted runtime, configuration, secrets, and access control, then keep the tool flowing into oo-cli.",
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
      ? "/img/pages/home/cloud-console-zh.png"
      : "/img/pages/home/cloud-console-en.png"
  );

  return (
    <div className={styles.flow}>
      {/* ── Section: Cloud ── */}
      <section className={clsx(styles.section, styles.cloudSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cloud.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cloud.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.cloud.description}
            </p>
            <div className={styles.cloudCardStack}>
              {copy.cloud.cards.map(card => (
                <article key={card.title} className={styles.cloudCard}>
                  <h3 className={styles.cloudTitle}>{card.title}</h3>
                  <p className={styles.cloudText}>{card.text}</p>
                </article>
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

          <div className={styles.mediaPanel}>
            <ImageCard
              title={copy.cloud.media.title}
              note={copy.cloud.media.note}
              src={cloudConsoleImage}
              pills={copy.cloud.media.pills}
            />
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
              note={copy.cli.media.note}
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
            <Button asChild size="lg" className={siteCtaStyles.actionButton}>
              <Link to="/docs/cloud-services/cloud-function">
                {copy.cta.primary}
              </Link>
            </Button>
            <a
              href="https://console.oomol.com/cloud-function"
              target="_blank"
              rel="noreferrer"
              className={siteCtaStyles.ghostLink}
            >
              {copy.cta.secondary}
            </a>
          </>
        }
      />
    </div>
  );
}
