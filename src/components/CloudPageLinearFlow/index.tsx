import styles from "./styles.module.scss";
import siteCtaStyles from "@site/src/components/SiteCta/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CloudPageDeveloperBenefits from "@site/src/components/CloudPageDeveloperBenefits";
import { DownloadButton } from "@site/src/components/DownloadButton";
import { SiteCta } from "@site/src/components/SiteCta";
import { clsx } from "clsx";
import React from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
  studio:
    "https://static.oomol.com/assets/homepage/OOMOL-Studio-gen-use-skils-en.webm",
} as const;

type Copy = {
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
  studio: {
    eyebrow: "01 / OOMOL Studio",
    title: "先把第一版工具做出来并跑通",
    description:
      "从提示词、现有流程或一段代码开始，让 Studio 帮你把第一版工具做出来，然后在本地把输入输出、依赖和行为验证清楚。重点是先把工具本身做成。",
    media: {
      title: "Studio 生成与验证演示",
      note: "展示从生成工具到本地跑通的过程。",
    },
    primary: "安装 OOMOL Studio",
    secondary: "了解 Studio",
  },
  cloud: {
    eyebrow: "02 / Cloud",
    title: "再通过 Cloud 把它发布到 oo-cli",
    description:
      "Cloud 把已经验证过的工具接成真正可用的发布路径。你不需要再单独补一套服务壳，发布后就能持续运行，并在 oo-cli 中被调用。",
    cards: [
      {
        title: "发布后持续可用",
        text: "从本地验证，变成可被反复调用的工具。",
      },
      {
        title: "配置和访问集中管理",
        text: "运行配置、Secrets、权限和状态放到同一个后台里管理。",
      },
      {
        title: "继续用同一份工具实现",
        text: "继续维护已经在 Studio 里验证过的工具，不必为了发布再重做一遍。",
      },
      {
        title: "oo-cli 入口保持一致",
        text: "发布后仍然通过 oo-cli 进入 Agent、Codex 和 OpenCrawl。",
      },
    ],
    media: {
      title: "Cloud 控制台预览",
      note: "在同一个后台里查看运行状态、配置与访问控制。",
      pills: ["运行状态", "运行配置", "Secrets", "访问控制"],
    },
    docs: "查看 Cloud 文档",
    secondary: "打开 Cloud 控制台",
  },
  cli: {
    eyebrow: "03 / oo-cli",
    title: "最后在 oo-cli 里直接用起来",
    description:
      "工具发布后，oo-cli 会把它带进 Agent、Codex 和 OpenCrawl。对使用者来说，不需要再换一套工作方式，也不用关心背后的发布链路。",
    media: {
      title: "oo-cli 调用演示",
      note: "展示已发布工具在 Codex 中被搜索、查看和调用。",
    },
    guide: "查看安装文档",
    github: "查看 GitHub",
  },
  cta: {
    title: "把自己的工具更快带进 oo-cli",
    description:
      "现成工具不够用时，用 Studio 做出并验证第一版工具，再通过 Cloud 发布，让 oo-cli 直接把它带进 Agent、Codex 和 OpenCrawl。",
    secondary: "查看 Cloud 文档",
  },
};

const enCopy: Copy = {
  studio: {
    eyebrow: "01 / OOMOL Studio",
    title: "Build and validate the first version in Studio",
    description:
      "Start from a prompt, an existing flow, or a piece of code. Let Studio build the first version, then validate the inputs, outputs, dependencies, and behavior locally. The goal is to get your tool working first.",
    media: {
      title: "Studio generation and validation demo",
      note: "Show the path from generating a tool to getting it working locally.",
    },
    primary: "Install OOMOL Studio",
    secondary: "Explore Studio",
  },
  cloud: {
    eyebrow: "02 / Cloud",
    title: "Publish it through Cloud so it appears in oo-cli",
    description:
      "Cloud turns a validated tool into a real publish path. You do not need a separate service layer around it before people can keep using it through oo-cli.",
    cards: [
      {
        title: "Keep it available after publish",
        text: "Move from local validation to a tool that can be invoked repeatedly.",
      },
      {
        title: "Manage config and access in one place",
        text: "Keep runtime settings, secrets, permissions, and status in one backend.",
      },
      {
        title: "Keep using the same implementation",
        text: "Keep maintaining what you already validated in Studio instead of rebuilding it for publish.",
      },
      {
        title: "Keep the oo-cli path consistent",
        text: "After publish, the tool is still reached through oo-cli in Agents, Codex, and OpenCrawl.",
      },
    ],
    media: {
      title: "Cloud console preview",
      note: "Track runtime status, configuration, and access control in one backend.",
      pills: [
        "Runtime status",
        "Runtime settings",
        "Secrets",
        "Access control",
      ],
    },
    docs: "Read Cloud docs",
    secondary: "Open Cloud Console",
  },
  cli: {
    eyebrow: "03 / oo-cli",
    title: "Then use it directly from oo-cli",
    description:
      "After a tool is published, oo-cli brings it into Agents, Codex, and OpenCrawl. For the user, there is no need to switch to a different way of working or think about the publish path behind it.",
    media: {
      title: "oo-cli invocation demo",
      note: "Show a published tool being searched, inspected, and called in Codex.",
    },
    guide: "Open install guide",
    github: "View GitHub",
  },
  cta: {
    title: "Bring your own tools to oo-cli faster",
    description:
      "When ready-made tools stop short, use Studio to build and validate the first version, then publish through Cloud so oo-cli can bring it straight into Agents, Codex, and OpenCrawl.",
    secondary: "Read Cloud docs",
  },
};

export default function CloudPageLinearFlow() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const downloadButtonTexts =
    i18n.currentLocale === "zh-CN"
      ? {
          macos: "下载适用于 macOS 的版本",
          macosStable: "下载适用于 macOS 的版本（稳定版）",
          macosNote: "仅支持 Apple Silicon Mac",
          windows: "下载适用于 Windows 的版本",
          windowsStable: "下载适用于 Windows 的版本（稳定版）",
          windowsSubtitle: "仅支持 x64 版本",
        }
      : {
          macos: "Download for macOS",
          macosStable: "Download for macOS (Stable)",
          macosNote: "Apple Silicon Mac only",
          windows: "Download for Windows",
          windowsStable: "Download for Windows (Stable)",
          windowsSubtitle: "only supports x64",
        };
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

      <CloudPageDeveloperBenefits />

      {/* ── CTA ── */}
      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <DownloadButton
              centered
              showNote={false}
              texts={downloadButtonTexts}
            />
            <Link
              to="/docs/cloud-services/cloud-function"
              className={siteCtaStyles.ghostLink}
            >
              {copy.cta.secondary}
            </Link>
          </>
        }
      />
    </div>
  );
}
