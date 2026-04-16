import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CloudPageDeveloperBenefits from "@site/src/components/CloudPageDeveloperBenefits";
import HomepageGuiEntry from "@site/src/components/HomepageGuiEntry";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
  studio:
    "https://static.oomol.com/assets/homepage/OOMOL-Studio-gen-use-skils-en.webm",
} as const;

type Copy = {
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string; note: string };
    guide: string;
    github: string;
  };
  studio: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string; note: string };
    primary: string;
    secondary: string;
  };
  cloud: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
    media: { title: string; note: string; items: string[] };
    primary: string;
    secondary: string;
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

function ImageCard({ title, note, src }: ImageCardProps) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.imageCardMedia}>
        <img className={styles.imageCardImage} src={src} alt={title} />
      </div>
      <div className={styles.videoCardMeta}>
        <h3 className={styles.videoCardTitle}>{title}</h3>
        <p className={styles.videoCardNote}>{note}</p>
      </div>
    </div>
  );
}

const zhCopy: Copy = {
  cli: {
    eyebrow: "03 / 给 Agent 使用",
    title: "最后把工具交回 oo-cli，给 Agent 直接调用",
    description:
      "当工具已经做好并交付出去后，Agent、Codex、OpenClaw 和 Claude Code 会继续沿同一条 oo-cli 路径来搜索、查看和调用。",
    media: {
      title: "oo-cli 调用演示",
      note: "展示一个已交付工具在 Codex 中被搜索、查看和调用。",
    },
    guide: "了解 oo-cli",
    github: "查看 GitHub",
  },
  studio: {
    eyebrow: "01 / 在 Studio 中构建",
    title: "先在 OOMOL Studio 里生成、组合并验证",
    description:
      "把需求交给 Agent 起步，然后继续补代码、接依赖、改参数和做编排。Studio 面向的是构建工具，而不是日常使用工具。",
    media: {
      title: "Studio 演示视频",
      note: "展示从描述需求、生成工具到本地验证跑通的过程。",
    },
    primary: "安装 OOMOL Studio",
    secondary: "了解 Studio",
  },
  cloud: {
    eyebrow: "02 / 通过 Cloud 交付",
    title: "验证完成后，再交给 Cloud 承接交付和运行",
    description:
      "Cloud 承接运行、配置、Secrets、权限和使用关系，让你不必围绕同一份实现再补一层后台。",
    cards: [
      {
        title: "统一承接交付和托管运行",
        text: "当你把工具交付给自己、团队或客户时，继续沿用同一份实现和同一条路径。",
      },
      {
        title: "把配置、权限和使用关系放进同一个后台",
        text: "Secrets、权限、版本、运行配置和使用数据集中管理，减少分散维护。",
      },
    ],
    media: {
      title: "Cloud 控制台预览",
      note: "把运行配置、Secrets 和使用关系放到同一个后台里管理。",
      items: ["统一承接运行和交付", "集中管理配置、权限和版本"],
    },
    primary: "了解 Cloud",
    secondary: "打开 Cloud 控制台",
  },
  cta: {
    title: "先用现成工具；需要时再走这条开发者路径",
    description:
      "先用 oo-cli 跑通现成能力。需要自己生产、组合和交付工具时，再进入 Studio 和 Cloud。",
    primary: "先用 oo-cli",
    secondary: "了解 Studio",
  },
};

const enCopy: Copy = {
  cli: {
    eyebrow: "03 / Use from oo-cli",
    title: "Finally, hand the tool back to oo-cli for agents to use",
    description:
      "Once the tool is built and delivered, Agents, Codex, OpenClaw, and Claude Code keep using the same oo-cli path to search, inspect, and call it.",
    media: {
      title: "oo-cli invocation demo",
      note: "Show a delivered tool being searched, inspected, and called in Codex.",
    },
    guide: "Explore oo-cli",
    github: "View GitHub",
  },
  studio: {
    eyebrow: "01 / Build in Studio",
    title: "Start in OOMOL Studio to generate, compose, and validate",
    description:
      "Use the agent to get started, then keep editing code, dependencies, parameters, and compositions yourself. Studio is for building tools, not for day-to-day tool usage.",
    media: {
      title: "Studio demo video",
      note: "Show the path from prompting to generating a tool and validating it locally.",
    },
    primary: "Install OOMOL Studio",
    secondary: "Explore Studio",
  },
  cloud: {
    eyebrow: "02 / Deliver through Cloud",
    title: "Once validation is done, hand delivery and runtime to Cloud",
    description:
      "Cloud takes over runtime, configuration, secrets, access, and delivery relationships so you do not need to build another backend around the same implementation.",
    cards: [
      {
        title: "Handle delivery and hosted runtime in one path",
        text: "Keep the same implementation as you deliver the tool to yourself, your team, or customers.",
      },
      {
        title: "Keep config, access, and usage relationships in one backend",
        text: "Manage secrets, access, releases, runtime settings, and usage data in one place.",
      },
    ],
    media: {
      title: "Cloud console preview",
      note: "Bring runtime settings, secrets, and delivery relationships into one backend.",
      items: [
        "Handle runtime and delivery together",
        "Manage configuration, access, and releases in one console",
      ],
    },
    primary: "Explore Cloud",
    secondary: "Open Cloud Console",
  },
  cta: {
    title:
      "Start with ready-made tools, then take the developer path when needed",
    description:
      "Use oo-cli to get ready-made capabilities working first. When you need to produce, combine, and deliver your own tools, move into Studio and Cloud.",
    primary: "Start with oo-cli",
    secondary: "Explore Studio",
  },
};

export default function HomepageLinearFlow() {
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
      {/* ── Section: Studio ── */}
      <section className={clsx(styles.section, styles.sectionTint)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.studio.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.studio.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.studio.description}
            </p>
            <div className={styles.inlineActions}>
              <Link to="/downloads" className={styles.primaryLink}>
                {copy.studio.primary}
              </Link>
              <Link to="/studio" className={styles.secondaryLink}>
                {copy.studio.secondary}
              </Link>
            </div>
          </div>

          <div className={styles.mediaPanel}>
            <VideoCard
              title={copy.studio.media.title}
              note={copy.studio.media.note}
              src={homepageMediaUrls.studio}
            />
          </div>
        </div>
      </section>

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
              <Link to="/cloud" className={styles.primaryLink}>
                {copy.cloud.primary}
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

      <HomepageGuiEntry />

      <CloudPageDeveloperBenefits />

      {/* ── CTA ── */}
      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg" className={styles.ctaPrimary}>
              <Link to="/cli">{copy.cta.primary}</Link>
            </Button>
            <Button
              asChild
              variant="contrast"
              size="lg"
              className={styles.ctaSecondary}
            >
              <Link to="/studio">{copy.cta.secondary}</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
