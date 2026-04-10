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
    badge: string;
    title: string;
    description: string;
  };
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
    media: { title: string; note: string; pills: string[]; items: string[] };
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
  intro: {
    badge: "怎么开始",
    title: "从用起来，到做自己的，再到持续交付",
    description: "先用起来；不够时再做自己的；需要持续运行时再交给 Cloud。",
  },
  cli: {
    eyebrow: "01 / oo-cli",
    title: "先在 Codex 里装 oo-cli，直接开始用能力",
    description: "先搜索并运行已发布能力，把使用路径先跑通。",
    media: {
      title: "Codex 演示视频",
      note: "展示在 Codex 中安装、搜索、查看并运行能力的过程。",
    },
    guide: "查看安装文档",
    github: "查看 GitHub",
  },
  studio: {
    eyebrow: "02 / OOMOL Studio",
    title: "当现成能力不够，就用 OOMOL Studio 做你自己的",
    description:
      "告诉 Agent 你要生成什么，再继续补代码、接依赖、改参数和做组合。",
    media: {
      title: "Studio 演示视频",
      note: "展示从描述需求、生成能力到本地验证跑通的过程。",
    },
    primary: "安装 OOMOL Studio",
    secondary: "了解 Studio",
  },
  cloud: {
    eyebrow: "03 / Cloud",
    title: "当能力需要持续运行和交付时，Cloud 来承接",
    description: "本地验证后，Cloud 承接运行、配置、交付关系和使用数据。",
    cards: [
      {
        title: "统一承接运行与交付",
        text: "把能力交付给自己、团队或客户时，继续沿用同一套实现和同一条路径。",
      },
      {
        title: "把配置和使用关系放进同一个后台",
        text: "Secrets、权限、版本、运行配置和使用数据集中管理，减少分散维护。",
      },
    ],
    media: {
      title: "Cloud 控制台预览",
      note: "把运行配置、交付关系和使用数据放到同一个后台里管理。",
      pills: ["运行配置", "Secrets 管理", "使用数据"],
      items: ["统一承接运行和交付", "集中管理配置、权限和版本"],
    },
    primary: "了解 Cloud",
    secondary: "打开 Cloud 控制台",
  },
  cta: {
    title: "先把一个能力跑起来，再决定要不要做自己的",
    description:
      "先通过 oo-cli 跑通使用路径。需要自己的能力时，再进入 Studio 和 Cloud。",
    primary: "先用 oo-cli",
    secondary: "了解 Studio",
  },
};

const enCopy: Copy = {
  intro: {
    badge: "One Path",
    title: "From usage to building to delivery, one continuous path",
    description:
      "Start by getting one capability working. Build your own when published capabilities are not enough, then hand it to Cloud when it needs to keep running and be delivered.",
  },
  cli: {
    eyebrow: "01 / oo-cli",
    title: "Install oo-cli in Codex and start using capabilities",
    description:
      "oo-cli is the best entry point for using capabilities inside Codex, Claude Code, and terminal workflows. Search, inspect, and run published capabilities first to get the usage path working.",
    media: {
      title: "Codex demo video",
      note: "Show installing, searching, inspecting, and running a capability in Codex.",
    },
    guide: "Open install guide",
    github: "View GitHub",
  },
  studio: {
    eyebrow: "02 / OOMOL Studio",
    title:
      "When ready-made capabilities are not enough, build your own in OOMOL Studio",
    description:
      "Tell the agent what capability you want, then keep editing code, dependencies, parameters, and compositions yourself. Studio does not replace engineering workflow; it brings capability generation and local validation back into a real coding environment.",
    media: {
      title: "Studio demo video",
      note: "Show the path from prompting to local validation.",
    },
    primary: "Install OOMOL Studio",
    secondary: "Explore Studio",
  },
  cloud: {
    eyebrow: "03 / Cloud",
    title:
      "When a capability needs to keep running and be delivered, Cloud takes over",
    description:
      "After local validation is done, Cloud handles runtime, configuration, secrets, delivery relationships, and usage data. You do not need to keep rebuilding layers around the same implementation.",
    cards: [
      {
        title: "Handle runtime and delivery in one path",
        text: "Keep the same implementation as you deliver the capability to yourself, your team, or customers.",
      },
      {
        title: "Keep configuration and usage relationships in one backend",
        text: "Manage secrets, access, releases, runtime settings, and usage data in one place.",
      },
    ],
    media: {
      title: "Cloud console preview",
      note: "Bring runtime settings, delivery relationships, and usage data into one backend.",
      pills: ["Runtime settings", "Secrets", "Usage data"],
      items: [
        "Handle runtime and delivery together",
        "Manage configuration, access, and releases in one console",
      ],
    },
    primary: "Explore Cloud",
    secondary: "Open Cloud Console",
  },
  cta: {
    title: "Run one capability first, then decide whether to build your own",
    description:
      "Start by getting the usage path working in oo-cli. When you need your own capability, move into Studio to generate, compose, and validate it, then deliver it through Cloud.",
    primary: "Start with oo-cli",
    secondary: "Build your first capability",
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
          <div className={styles.introBadge}>{copy.intro.badge}</div>
          <h2 className={styles.introTitle}>{copy.intro.title}</h2>
          <p className={styles.introDescription}>{copy.intro.description}</p>
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
              pills={copy.cloud.media.pills}
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
              variant="outline"
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
