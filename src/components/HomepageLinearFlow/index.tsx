import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DownloadButton } from "@site/src/components/DownloadButton";
import HomepageDeveloperBenefits from "@site/src/components/HomepageDeveloperBenefits";
import { clsx } from "clsx";
import React from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
  studio:
    "https://static.oomol.com/assets/homepage/OOMOL-Studio-gen-use-skils-en.webm",
  agent: "https://static.oomol.com/assets/homepage/oomol-AI-use-skills-en.webm",
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
    media: { title: string; note: string; pills: string[]; items: string[] };
    primary: string;
    secondary: string;
  };
  agent: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string; note: string };
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
  cli: {
    eyebrow: "01 / oo-cli",
    title: "先在 Codex 里装 oo-cli，直接开始用 Skill",
    description:
      "oo-cli 是最适合在 Codex 和 Claude Code 里开始使用 Skill 的入口。先把安装文档打开，再用右侧视频直接看真实使用过程。",
    media: {
      title: "Codex 演示视频",
      note: "展示在 Codex 中安装、搜索、查看并运行 Skill。",
    },
    guide: "查看安装文档",
    github: "查看 GitHub",
  },
  studio: {
    eyebrow: "02 / OOMOL Studio",
    title: "想做自己的 Skill，就用 OOMOL Studio",
    description:
      "直接告诉 Agent 你要生成什么，Studio 帮你把 Skill 生成出来，然后在本地完成验证。不会写平台 DSL，也能零门槛开始。",
    media: {
      title: "Studio + Agent Vibe 演示视频",
      note: "展示从提需求到本地验证跑通的过程。",
    },
    primary: "安装 OOMOL Studio",
    secondary: "了解 Studio",
  },
  cloud: {
    eyebrow: "03 / Cloud",
    title: "发布之后，Cloud 负责运行与交付",
    description:
      "Skill 发布之后，Cloud 在后台承接运行、订阅、配置和使用数据。你不需要再围着同一份实现重做一层产品外壳。",
    cards: [
      {
        title: "交付给自己、团队或客户",
        text: "通过订阅持续交付，而不是停留在本地脚本。",
      },
      {
        title: "在一个后台里配置并观察",
        text: "Secrets、权限、版本和使用数据集中管理。",
      },
    ],
    media: {
      title: "Cloud 控制台预览",
      note: "把订阅、配置和运行数据放到同一个后台里。",
      pills: ["订阅关系", "运行配置", "使用数据"],
      items: ["按订阅持续交付与续费", "统一管理 Secrets、权限和版本"],
    },
    primary: "了解 Cloud",
    secondary: "打开 Cloud 控制台",
  },
  agent: {
    eyebrow: "04 / OOMOL AI",
    title: "不想用 CLI，就直接用 OOMOL AI",
    description:
      "它可以理解成 oo-cli 的 GUI 版本。同一套 Skill，不同的消费入口。终端适合工作流，GUI 更适合直观使用。",
    media: {
      title: "OOMOL AI 演示视频",
      note: "展示对话入口和参数入口的体验。",
    },
    primary: "体验 OOMOL AI",
    secondary: "了解 OOMOL AI",
  },
  cta: {
    title: "先用一个 Skill，再决定要不要自己做",
    description:
      "先通过 oo-cli 把使用路径跑通。需要自己的 Skill 时，再安装 Studio 生成、验证并发布。",
    primary: "安装 OOMOL Studio",
    secondary: "先用 oo-cli",
  },
};

const enCopy: Copy = {
  cli: {
    eyebrow: "01 / oo-cli",
    title: "Install oo-cli in Codex and start using skills",
    description:
      "oo-cli is the best entry point for using skills inside Codex and Claude Code. Open the install guide first, then use the video on the right to see the real flow.",
    media: {
      title: "Codex demo video",
      note: "Show installing, searching, inspecting, and running a skill in Codex.",
    },
    guide: "Open install guide",
    github: "View GitHub",
  },
  studio: {
    eyebrow: "02 / OOMOL Studio",
    title: "When you need your own skill, use OOMOL Studio",
    description:
      "Tell the agent what skill you want, let Studio generate the first version, then validate it locally. You do not need to learn a platform DSL before you begin.",
    media: {
      title: "Studio + Agent Vibe demo video",
      note: "Show the path from prompting to local validation.",
    },
    primary: "Install OOMOL Studio",
    secondary: "Explore Studio",
  },
  cloud: {
    eyebrow: "03 / Cloud",
    title: "After release, Cloud runs and delivers the skill",
    description:
      "After a skill is released, Cloud handles runtime, subscriptions, configuration, and usage data. You do not need a second product layer around the same implementation.",
    cards: [
      {
        title: "Deliver it to yourself, your team, or customers",
        text: "Keep the delivery loop running through subscriptions.",
      },
      {
        title: "Configure and observe it in one backend",
        text: "Keep secrets, access, releases, and usage in one place.",
      },
    ],
    media: {
      title: "Cloud console preview",
      note: "Bring subscriptions, settings, and operational data into one backend.",
      pills: ["Subscriptions", "Runtime settings", "Usage data"],
      items: [
        "Deliver and renew through subscriptions",
        "Manage secrets, access, and releases in one console",
      ],
    },
    primary: "Explore Cloud",
    secondary: "Open Cloud Console",
  },
  agent: {
    eyebrow: "04 / OOMOL AI",
    title: "If you do not want CLI, use OOMOL AI",
    description:
      "Think of it as the GUI version of oo-cli. It uses the same skills through a more direct interface. CLI is better for workflows; GUI is better for straightforward use.",
    media: {
      title: "OOMOL AI demo video",
      note: "Show both the chat surface and the structured surface.",
    },
    primary: "Try OOMOL AI",
    secondary: "Explore OOMOL AI",
  },
  cta: {
    title: "Use a skill first, then decide whether to build your own",
    description:
      "Start by getting the usage path working in oo-cli. When you need your own skill, install Studio to generate, validate, and publish it.",
    primary: "Install OOMOL Studio",
    secondary: "Start with oo-cli",
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

      {/* ── Section: OOMOL AI ── */}
      <section className={clsx(styles.section, styles.agentSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.agent.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.agent.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.agent.description}
            </p>
            <div className={styles.inlineActions}>
              <a
                href="https://app.oomol.com"
                target="_blank"
                rel="noreferrer"
                className={styles.primaryLink}
              >
                {copy.agent.primary}
              </a>
              <Link to="/app" className={styles.secondaryLink}>
                {copy.agent.secondary}
              </Link>
            </div>
          </div>

          <div className={styles.mediaPanel}>
            <VideoCard
              title={copy.agent.media.title}
              note={copy.agent.media.note}
              src={homepageMediaUrls.agent}
            />
          </div>
        </div>
      </section>

      <HomepageDeveloperBenefits />

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>{copy.cta.title}</h2>
          <p className={styles.ctaDescription}>{copy.cta.description}</p>
          <div className={styles.ctaActions}>
            <DownloadButton centered showNote={false} />
            <Link to="/docs/cloud-services/cli" className={styles.ctaGhost}>
              {copy.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
