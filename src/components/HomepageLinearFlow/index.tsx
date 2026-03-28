import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DownloadButton } from "@site/src/components/DownloadButton";
import { clsx } from "clsx";
import React from "react";

type Copy = {
  cli: {
    eyebrow: string;
    title: string;
    commandsLabel: string;
    commands: Array<{ comment: string; command: string }>;
    media: { label: string; title: string; note: string };
    guide: string;
    github: string;
  };
  studio: {
    eyebrow: string;
    title: string;
    description: string;
    points: Array<{ title: string; text: string }>;
    media: { label: string; title: string; note: string };
    primary: string;
    secondary: string;
  };
  cloud: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ label: string; title: string; text: string }>;
    media: { label: string; title: string; note: string };
    primary: string;
    secondary: string;
  };
  agent: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
    media: { label: string; title: string; note: string };
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

const zhCopy: Copy = {
  cli: {
    eyebrow: "02 / oo-cli",
    title: "先在 Codex 里装 oo-cli，直接开始用 Skill",
    commandsLabel: "以 Codex 为例",
    commands: [
      {
        comment: "先在 Codex 里装好 oo-cli",
        command: "bun install -g @oomol-lab/oo-cli",
      },
      {
        comment: "登录之后，就能直接搜索和运行 Skill",
        command: "oo login",
      },
      {
        comment: "先用自然语言搜索一个 Skill",
        command: 'oo search "social media optimizer"',
      },
      {
        comment: "查看它做什么、需要什么输入",
        command: "oo package info foo/bar@latest",
      },
      {
        comment: "最后直接运行",
        command: "oo cloud-task run foo/bar@1.2.3 --block-id main",
      },
    ],
    media: {
      label: "演示占位",
      title: "这里放 Codex 演示视频",
      note: "建议后续替换成一段在 Codex 中安装、搜索、查看并运行 Skill 的短视频。",
    },
    guide: "查看 oo-cli 指南",
    github: "查看 GitHub",
  },
  studio: {
    eyebrow: "03 / OOMOL Studio",
    title: "想做自己的 Skill，就用 OOMOL Studio",
    description:
      "直接告诉 Agent 你要生成什么，Studio 帮你把 Skill 生成出来，然后在本地完成验证。不会写平台 DSL，也能零门槛开始。",
    points: [
      {
        title: "Describe",
        text: "告诉 Agent 你想做什么，不必先画完整流程。",
      },
      {
        title: "Generate",
        text: "让 Studio 生成 Skill 的实现、参数和基本结构。",
      },
      {
        title: "Validate",
        text: "在本地把依赖、输入输出和运行结果先跑通。",
      },
    ],
    media: {
      label: "演示占位",
      title: "这里放 Studio + Agent Vibe 生成 Skill 的视频",
      note: "建议后续替换成一段从提需求到本地验证跑通的短视频。",
    },
    primary: "安装 OOMOL Studio",
    secondary: "了解 Studio",
  },
  cloud: {
    eyebrow: "04 / Cloud",
    title: "发布之后，Cloud 负责运行和管理",
    description:
      "Skill 做好以后，Cloud 在后台承接运行，并提供订阅方式、配置入口和数据面板。开发者不必再围着同一份实现重做一层产品外壳。",
    cards: [
      {
        label: "订阅",
        title: "把 Skill 交付给自己、团队或客户",
        text: "Cloud 在后台承接订阅关系，让一个 Skill 可以持续交付，而不是只停留在本地脚本。",
      },
      {
        label: "配置",
        title: "把权限、参数和运行环境放在后台配置",
        text: "运行参数、访问控制、Secrets 和发布配置都留在 Cloud 里统一管理。",
      },
      {
        label: "数据",
        title: "查看调用情况、运行状态和使用趋势",
        text: "你可以看到 Skill 的使用和运行数据，而不只是单次调用结果。",
      },
    ],
    media: {
      label: "演示占位",
      title: "这里放 Cloud 后台订阅、配置和数据面板的视频",
      note: "建议后续替换成一段发布后如何查看订阅、配置和运行数据的短视频。",
    },
    primary: "了解 Cloud",
    secondary: "打开 Cloud 控制台",
  },
  agent: {
    eyebrow: "05 / OOMOL AI",
    title: "不想用 CLI，就直接用 OOMOL AI",
    description:
      "它可以理解成 oo-cli 的 GUI 版本。同一套 Skill，不同的消费入口。终端适合工作流，GUI 更适合直观使用。",
    cards: [
      {
        title: "对话入口",
        text: "当用户意图还不够明确时，通过对话选择并调用 Skill。",
      },
      {
        title: "参数入口",
        text: "当输入明确时，用结构化界面直接运行同一个 Skill。",
      },
    ],
    media: {
      label: "演示占位",
      title: "这里放 OOMOL AI 官方 Agent 的演示视频",
      note: "建议后续替换成一段同时体现对话入口和参数入口体验的短视频。",
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
    eyebrow: "02 / oo-cli",
    title: "Install oo-cli in Codex and start using skills",
    commandsLabel: "Using Codex as the demo",
    commands: [
      {
        comment: "Install oo-cli in Codex first",
        command: "bun install -g @oomol-lab/oo-cli",
      },
      {
        comment: "Log in so you can search and run skills",
        command: "oo login",
      },
      {
        comment: "Start with a natural-language search",
        command: 'oo search "social media optimizer"',
      },
      {
        comment: "Inspect what the skill does and what it needs",
        command: "oo package info foo/bar@latest",
      },
      {
        comment: "Run it directly",
        command: "oo cloud-task run foo/bar@1.2.3 --block-id main",
      },
    ],
    media: {
      label: "Video Slot",
      title: "Use this slot for the Codex demo",
      note: "Replace later with a short video that shows installing, searching, inspecting, and running a skill inside Codex.",
    },
    guide: "Open oo-cli Guide",
    github: "View GitHub",
  },
  studio: {
    eyebrow: "03 / OOMOL Studio",
    title: "When you need your own skill, use OOMOL Studio",
    description:
      "Tell the agent what skill you want, let Studio generate the first version, then validate it locally. You do not need to learn a platform DSL before you begin.",
    points: [
      {
        title: "Describe",
        text: "Tell the agent what you want instead of designing the whole flow first.",
      },
      {
        title: "Generate",
        text: "Let Studio generate the implementation, parameters, and structure.",
      },
      {
        title: "Validate",
        text: "Run dependencies, inputs, outputs, and results locally before release.",
      },
    ],
    media: {
      label: "Video Slot",
      title: "Use this slot for a Studio + Agent Vibe skill-generation demo",
      note: "Replace later with a short video that goes from prompting to local validation.",
    },
    primary: "Install OOMOL Studio",
    secondary: "Explore Studio",
  },
  cloud: {
    eyebrow: "04 / Cloud",
    title: "After release, Cloud runs and manages the skill",
    description:
      "Once a skill is ready, Cloud runs it in the background and gives you subscriptions, configuration, and usage data. You do not need to rebuild another product layer around the same implementation.",
    cards: [
      {
        label: "Subscriptions",
        title: "Deliver the skill to yourself, your team, or customers",
        text: "Cloud carries the subscription relationship so a skill can be operated continuously instead of staying as a local script.",
      },
      {
        label: "Configuration",
        title: "Keep access, parameters, and runtime setup in the backend",
        text: "Runtime settings, access control, secrets, and release configuration stay managed in one place.",
      },
      {
        label: "Data",
        title: "See runs, status, and usage trends",
        text: "You get operational visibility into the skill instead of only seeing one-off invocation results.",
      },
    ],
    media: {
      label: "Video Slot",
      title: "Use this slot for a Cloud subscriptions, config, and metrics demo",
      note: "Replace later with a backend walkthrough that shows publishing, settings, and operational data.",
    },
    primary: "Explore Cloud",
    secondary: "Open Cloud Console",
  },
  agent: {
    eyebrow: "05 / OOMOL AI",
    title: "If you do not want CLI, use OOMOL AI",
    description:
      "Think of it as the GUI version of oo-cli. It uses the same skills through a more direct interface. CLI is better for workflows; GUI is better for straightforward use.",
    cards: [
      {
        title: "Chat Surface",
        text: "Use conversation when intent is still fuzzy and the skill should be selected dynamically.",
      },
      {
        title: "Structured Surface",
        text: "Use a parameterized interface when inputs are clear and execution should be direct.",
      },
    ],
    media: {
      label: "Video Slot",
      title: "Use this slot for the OOMOL AI agent demo",
      note: "Replace later with a short video that shows both the chat surface and the structured surface.",
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

  return (
    <div className={styles.flow}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cli.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cli.title}</h2>
            <div className={styles.terminalPanel}>
              <div className={styles.terminalChrome}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.terminalBody}>
                <div className={styles.terminalLabel}>{copy.cli.commandsLabel}</div>
                <pre className={styles.commandBlock}>
                  <code>
                    {copy.cli.commands.map(item => (
                      <React.Fragment key={item.command}>
                        <span className={styles.commentLine}># {item.comment}</span>
                        <span className={styles.commandLine}>
                          <span className={styles.prompt}>$</span> {item.command}
                        </span>
                      </React.Fragment>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
            <div className={styles.inlineActions}>
              <Link to="/docs/cloud-services/cli" className={styles.primaryLink}>
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
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderBadge}>
                {copy.cli.media.label}
              </div>
              <h3 className={styles.placeholderTitle}>{copy.cli.media.title}</h3>
              <p className={styles.placeholderNote}>{copy.cli.media.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={clsx(styles.section, styles.sectionTint)}>
        <div className={styles.container}>
          <div className={styles.mediaPanel}>
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderBadge}>
                {copy.studio.media.label}
              </div>
              <h3 className={styles.placeholderTitle}>{copy.studio.media.title}</h3>
              <p className={styles.placeholderNote}>{copy.studio.media.note}</p>
            </div>
          </div>

          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.studio.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.studio.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.studio.description}
            </p>
            <div className={styles.stepGrid}>
              {copy.studio.points.map(point => (
                <article key={point.title} className={styles.stepCard}>
                  <div className={styles.stepTitle}>{point.title}</div>
                  <p className={styles.stepText}>{point.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.inlineActions}>
              <Link to="/downloads" className={styles.primaryLink}>
                {copy.studio.primary}
              </Link>
              <Link to="/studio" className={styles.secondaryLink}>
                {copy.studio.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cloud.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cloud.title}</h2>
            <p className={styles.sectionDescription}>{copy.cloud.description}</p>
            <div className={styles.cloudCardStack}>
              {copy.cloud.cards.map(card => (
                <article key={card.title} className={styles.cloudCard}>
                  <div className={styles.cloudLabel}>{card.label}</div>
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
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderBadge}>
                {copy.cloud.media.label}
              </div>
              <h3 className={styles.placeholderTitle}>{copy.cloud.media.title}</h3>
              <p className={styles.placeholderNote}>{copy.cloud.media.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={clsx(styles.section, styles.agentSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.agent.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.agent.title}</h2>
            <p className={styles.sectionDescription}>{copy.agent.description}</p>
            <div className={styles.stepGrid}>
              {copy.agent.cards.map(card => (
                <article key={card.title} className={styles.stepCard}>
                  <div className={styles.stepTitle}>{card.title}</div>
                  <p className={styles.stepText}>{card.text}</p>
                </article>
              ))}
            </div>
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
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderBadge}>
                {copy.agent.media.label}
              </div>
              <h3 className={styles.placeholderTitle}>{copy.agent.media.title}</h3>
              <p className={styles.placeholderNote}>{copy.agent.media.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <span className={styles.eyebrow}>06 / CTA</span>
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
