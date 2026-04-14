import styles from "../CloudPageLinearFlow/styles.module.scss";
import siteCtaStyles from "@site/src/components/SiteCta/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CliPageDeveloperBenefits from "@site/src/components/CliPageDeveloperBenefits";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React from "react";

const mediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
} as const;

type Copy = {
  build: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
    media: { title: string; note: string; pills: string[] };
    primary: string;
    secondary: string;
  };
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
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
  cli: {
    eyebrow: "01 / oo-cli",
    title: "先在 oo-cli 里搜索、查看并直接调用",
    description:
      "它不是文档入口的替代，而是产品路径里的第一层。先确认工具能不能被 Agent 真正用起来，再决定要不要继续扩展。",
    cards: [
      {
        title: "先搜索现成工具",
        text: "先看有没有别人已经做好的工具，不必第一天就从零开始搭。",
      },
      {
        title: "先查看输入和边界",
        text: "先搞清楚工具需要什么输入、适合什么场景，再决定它是不是你要的。",
      },
      {
        title: "先直接跑一次真实任务",
        text: "先让 Agent 真正调用起来，用结果判断下一步，而不是凭想象设计系统。",
      },
    ],
    media: {
      title: "oo-cli 调用演示",
      note: "展示已发布工具在 Codex 中被搜索、查看和调用。",
    },
    guide: "查看安装文档",
    github: "查看 GitHub",
  },
  build: {
    eyebrow: "02 / Studio + Cloud",
    title: "现成工具不够，再延伸到 Studio 和 Cloud",
    description:
      "CLI 不是终点，而是起点。需要自定义时，就进入 Studio 生成和验证自己的工具；需要持续运行和交付时，再交给 Cloud 承接。",
    cards: [
      {
        title: "在 Studio 里生成和补全自己的工具",
        text: "让 Agent 帮你生成代码、接依赖、补参数，本地先把真正需要的工具跑通。",
      },
      {
        title: "在本地先验证，再决定是否交付",
        text: "先验证真实任务和边界条件，不要在还没跑通之前就补交付层。",
      },
      {
        title: "最后通过 Cloud 继续交付回 CLI",
        text: "工具交付后，又能回到 oo-cli 里被搜索、查看和调用，路径是连起来的。",
      },
    ],
    media: {
      title: "Cloud 控制台预览",
      note: "当工具需要持续运行、配置和交付关系时，再把这层交给 Cloud。",
      pills: ["Studio", "本地验证", "Cloud", "交付回 CLI"],
    },
    primary: "了解 Studio",
    secondary: "了解 Cloud",
  },
  cta: {
    title: "先用 oo-cli，再决定下一层要不要做",
    description:
      "先让 Agent 在 oo-cli 里把任务跑通。需要自定义时，再进入 Studio 和 Cloud 继续扩展和交付。",
    primary: "查看安装文档",
    secondary: "了解 Studio",
  },
};

const enCopy: Copy = {
  cli: {
    eyebrow: "01 / oo-cli",
    title: "Search, inspect, and call tools directly in oo-cli first",
    description:
      "This is not a replacement for docs. It is the first layer in the product path. Confirm that agents can actually use a tool before you decide what deserves further expansion.",
    cards: [
      {
        title: "Search ready-made tools first",
        text: "Check whether someone has already published what you need instead of building from zero on day one.",
      },
      {
        title: "Inspect the inputs and boundaries first",
        text: "Understand what the tool expects and where it fits before you decide whether it is the right path.",
      },
      {
        title: "Run one real task first",
        text: "Let the agent actually call the tool and use the result to decide the next step instead of designing from guesswork.",
      },
    ],
    media: {
      title: "oo-cli invocation demo",
      note: "Show a published tool being searched, inspected, and called in Codex.",
    },
    guide: "Open install guide",
    github: "View GitHub",
  },
  build: {
    eyebrow: "02 / Studio + Cloud",
    title: "When ready-made tools stop short, continue into Studio and Cloud",
    description:
      "CLI is not the endpoint. It is the start of the path. When you need custom behavior, move into Studio to generate and validate your own tool. When it must keep running and be delivered, Cloud takes over.",
    cards: [
      {
        title: "Generate and complete your own tool in Studio",
        text: "Let the agent help with code, dependencies, and parameters, then validate the actual tool you need locally.",
      },
      {
        title: "Validate locally before you decide to deliver",
        text: "Prove the task and the edge cases before you invest in the delivery layer.",
      },
      {
        title: "Deliver it back into CLI through Cloud",
        text: "Once delivered, the tool returns to oo-cli where it can be searched, inspected, and called again through the same path.",
      },
    ],
    media: {
      title: "Cloud console preview",
      note: "When the tool needs runtime, configuration, and delivery relationships, let Cloud handle that layer.",
      pills: ["Studio", "Local validation", "Cloud", "Delivered back to CLI"],
    },
    primary: "Explore Studio",
    secondary: "Explore Cloud",
  },
  cta: {
    title: "Start with oo-cli, then decide which next layer is worth building",
    description:
      "Let the agent finish the task in oo-cli first. When custom behavior is needed, continue into Studio and Cloud for extension and delivery.",
    primary: "Open install guide",
    secondary: "Explore Studio",
  },
};

export default function CliPageLinearFlow() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const buildPreviewImage = useBaseUrl(
    i18n.currentLocale === "zh-CN"
      ? "/img/pages/home/cloud-console-zh.png"
      : "/img/pages/home/cloud-console-en.png"
  );

  return (
    <div className={styles.flow}>
      <section className={clsx(styles.section, styles.cliSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cli.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cli.title}</h2>
            <p className={styles.sectionDescription}>{copy.cli.description}</p>
            <div className={styles.cloudCardStack}>
              {copy.cli.cards.map(card => (
                <article key={card.title} className={styles.cloudCard}>
                  <h3 className={styles.cloudTitle}>{card.title}</h3>
                  <p className={styles.cloudText}>{card.text}</p>
                </article>
              ))}
            </div>
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
              src={mediaUrls.cli}
            />
          </div>
        </div>
      </section>

      <section className={clsx(styles.section, styles.cloudSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.build.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.build.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.build.description}
            </p>
            <div className={styles.cloudCardStack}>
              {copy.build.cards.map(card => (
                <article key={card.title} className={styles.cloudCard}>
                  <h3 className={styles.cloudTitle}>{card.title}</h3>
                  <p className={styles.cloudText}>{card.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.inlineActions}>
              <Link to="/studio" className={styles.primaryLink}>
                {copy.build.primary}
              </Link>
              <Link to="/cloud" className={styles.secondaryLink}>
                {copy.build.secondary}
              </Link>
            </div>
          </div>

          <div className={styles.mediaPanel}>
            <ImageCard
              title={copy.build.media.title}
              note={copy.build.media.note}
              src={buildPreviewImage}
              pills={copy.build.media.pills}
            />
          </div>
        </div>
      </section>

      <CliPageDeveloperBenefits />

      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg" className={siteCtaStyles.actionButton}>
              <Link to="/docs/cloud-services/cli">{copy.cta.primary}</Link>
            </Button>
            <Link to="/studio" className={siteCtaStyles.ghostLink}>
              {copy.cta.secondary}
            </Link>
          </>
        }
      />
    </div>
  );
}
