import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
  studio:
    "https://static.oomol.com/assets/homepage/OOMOL-Studio-gen-use-skils-en.webm",
} as const;

type Copy = {
  intro: {
    title: string;
    description: string;
  };
  cli: {
    title: string;
    description: string;
    media: { title: string; note: string };
    guide: string;
    github: string;
  };
  studio: {
    title: string;
    description: string;
    media: { title: string; note: string };
    primary: string;
    secondary: string;
  };
  cloud: {
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
  intro: {
    title: "先在 oo-cli 里用起来，不够时再自己做",
    description:
      "先用现成工具；不够时再用 Studio 扩展；需要持续运行时再交给 Cloud。",
  },
  cli: {
    title: "先装 oo-cli，让 Agent 直接调用应用和工具",
    description:
      "在 Codex、OpenClaw、Claude Code 和终端里，先搜、先看、先跑，把使用路径先跑通。",
    media: {
      title: "Agent 演示视频",
      note: "展示在 Codex 中安装、搜索、查看并运行工具的过程。",
    },
    guide: "查看安装文档",
    github: "查看 GitHub",
  },
  studio: {
    title: "现成工具不够，再用 OOMOL Studio 做你自己的",
    description:
      "直接告诉 Agent 你要什么，再补代码、接依赖、改参数和做组合。Studio 让你更快把新工具做出来并在本地验证。",
    media: {
      title: "Studio 演示视频",
      note: "展示从描述需求、生成工具到本地验证跑通的过程。",
    },
    primary: "安装 OOMOL Studio",
    secondary: "了解 Studio",
  },
  cloud: {
    title: "需要持续运行和交付时，再交给 Cloud",
    description:
      "本地验证后，Cloud 承接运行、配置、Secrets 和使用关系，不用再围着同一份实现补一层交付系统。",
    cards: [
      {
        title: "统一承接运行与交付",
        text: "当你把工具交付给自己、团队或客户时，继续沿用同一份实现和同一条路径。",
      },
      {
        title: "把配置和使用关系放进同一个后台",
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
    title: "先用现成工具，需要时再做自己的",
    description:
      "先用 oo-cli 跑通现成工具。需要自定义时，再用 Studio 和 Cloud 组合、扩展并交付自己的工具。",
    primary: "先用 oo-cli",
    secondary: "了解 Studio",
  },
};

const enCopy: Copy = {
  intro: {
    title:
      "Start in oo-cli. Build your own only when ready-made tools stop short",
    description:
      "Get one tool working first. When ready-made tools are not enough, build your own in Studio, then hand it to Cloud when it needs to keep running and be delivered.",
  },
  cli: {
    title: "Install oo-cli and let agents call apps and tools",
    description:
      "In Codex, OpenClaw, Claude Code, and terminal workflows, start by searching, inspecting, and running published tools to get the usage path working.",
    media: {
      title: "Agent demo video",
      note: "Show installing, searching, inspecting, and running a tool in Codex.",
    },
    guide: "Open install guide",
    github: "View GitHub",
  },
  studio: {
    title:
      "When ready-made tools are not enough, build your own in OOMOL Studio",
    description:
      "Tell the agent what you want, then keep editing code, dependencies, parameters, and compositions yourself. Studio does not replace engineering workflow; it helps you create new tools faster and validate them locally.",
    media: {
      title: "Studio demo video",
      note: "Show the path from prompting to generating a tool and validating it locally.",
    },
    primary: "Install OOMOL Studio",
    secondary: "Explore Studio",
  },
  cloud: {
    title: "When it needs to keep running and be delivered, Cloud takes over",
    description:
      "After local validation is done, Cloud handles runtime, configuration, secrets, and delivery relationships. You do not need to rebuild another delivery layer around the same implementation.",
    cards: [
      {
        title: "Handle runtime and delivery in one path",
        text: "Keep the same implementation as you deliver the tool to yourself, your team, or customers.",
      },
      {
        title: "Keep configuration and usage relationships in one backend",
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
    title: "Start with ready-made tools, build your own only when needed",
    description:
      "Use oo-cli to get ready-made tools working first. When you need custom ones, move into Studio and Cloud to compose, extend, and deliver your own tools.",
    primary: "Start with oo-cli",
    secondary: "Build your first tool",
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
      <section className={styles.introSection}>
        <div className={styles.introInner}>
          <h2 className={styles.introTitle}>{copy.intro.title}</h2>
          <p className={styles.introDescription}>{copy.intro.description}</p>
        </div>
      </section>

      {/* ── Section: oo-cli ── */}
      <section className={clsx(styles.section, styles.cliSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <h2 className={styles.sectionTitle}>{copy.cli.title}</h2>
            <p className={styles.sectionDescription}>{copy.cli.description}</p>
            <div className={styles.inlineActions}>
              <Link
                to="/docs/cloud-services/cli"
                className={styles.primaryLink}
              >
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

      {/* ── Section: Studio ── */}
      <section className={clsx(styles.section, styles.sectionTint)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
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

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>{copy.cta.title}</h2>
          <p className={styles.ctaDescription}>{copy.cta.description}</p>
          <div className={styles.ctaActions}>
            <Button asChild size="lg" className={styles.ctaPrimary}>
              <Link to="/docs/cloud-services/cli">{copy.cta.primary}</Link>
            </Button>
            <Button
              asChild
              variant="contrast"
              size="lg"
              className={styles.ctaSecondary}
            >
              <Link to="/studio">{copy.cta.secondary}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
