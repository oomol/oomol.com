import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { DownloadButton } from "@site/src/components/DownloadButton";
import ThemedImage from "@theme/ThemedImage";
import { clsx } from "clsx";
import React from "react";

type Copy = {
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    commandsLabel: string;
    commands: string[];
    guide: string;
    github: string;
  };
  studio: {
    eyebrow: string;
    title: string;
    description: string;
    points: Array<{ title: string; text: string }>;
    primary: string;
    secondary: string;
  };
  cloud: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ label: string; title: string; text: string }>;
    primary: string;
    secondary: string;
  };
  agent: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
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
    title: "先安装 oo-cli，三步就能把 Skill 用起来",
    description:
      "oo-cli 是最直接的消费入口。先搜索，再查看，再运行，不用先理解整套系统，也不用先接 API 或 MCP。",
    bullets: [
      "安装一次，就能在终端和 Agent 工作流里直接使用 Skill。",
      "搜索、查看、运行都在一个入口里完成，路径很短。",
      "先把体验跑通，再决定是否要做自己的 Skill。",
    ],
    commandsLabel: "典型使用流程",
    commands: [
      "bun install -g @oomol-lab/oo-cli",
      "oo login",
      'oo search \"social media optimizer\"',
      "oo package info foo/bar@latest",
      "oo cloud-task run foo/bar@1.2.3 --block-id main",
    ],
    guide: "查看 oo-cli 指南",
    github: "查看 GitHub",
  },
  studio: {
    eyebrow: "03 / OOMOL Studio",
    title: "想做自己的 Skill，就装 OOMOL Studio",
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
    primary: "安装 OOMOL Studio",
    secondary: "了解 Studio",
  },
  cloud: {
    eyebrow: "04 / Cloud",
    title: "发布之后，Cloud 负责运行、订阅和管理",
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
    primary: "了解 Cloud",
    secondary: "打开 Cloud 控制台",
  },
  agent: {
    eyebrow: "05 / OOMOL AI",
    title: "不想用 CLI，就直接用 OOMOL AI 官方 Agent",
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
    title: "Install oo-cli first and get a skill running in three steps",
    description:
      "oo-cli is the simplest entry point. Search, inspect, and run without learning the whole system first or wiring API and MCP on day one.",
    bullets: [
      "Install once and use skills directly from terminal and agent workflows.",
      "Search, inspect, and run all happen in one short path.",
      "Start with the experience first, then decide whether to build your own skill.",
    ],
    commandsLabel: "Typical flow",
    commands: [
      "bun install -g @oomol-lab/oo-cli",
      "oo login",
      'oo search \"social media optimizer\"',
      "oo package info foo/bar@latest",
      "oo cloud-task run foo/bar@1.2.3 --block-id main",
    ],
    guide: "Open oo-cli Guide",
    github: "View GitHub",
  },
  studio: {
    eyebrow: "03 / OOMOL Studio",
    title: "When you need your own skill, install OOMOL Studio",
    description:
      "Tell the agent what you want to build, let Studio generate the skill, then validate it locally. No platform DSL or steep setup before you begin.",
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
    primary: "Install OOMOL Studio",
    secondary: "Explore Studio",
  },
  cloud: {
    eyebrow: "04 / Cloud",
    title: "After release, Cloud handles runtime, subscriptions, and management",
    description:
      "Once a skill is ready, Cloud takes over the runtime and gives you subscription paths, configuration controls, and usage data without rebuilding another product shell around the same implementation.",
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
    primary: "Explore Cloud",
    secondary: "Open Cloud Console",
  },
  agent: {
    eyebrow: "05 / OOMOL AI",
    title: "If you do not want CLI, use the official OOMOL AI agent",
    description:
      "Think of it as the GUI version of oo-cli. The same skill, a different consumption surface. Terminal is for workflows; GUI is for direct use.",
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
    primary: "Try OOMOL AI",
    secondary: "Explore OOMOL AI",
  },
  cta: {
    title: "Use one skill first, then decide whether to build your own",
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
  const studioLight = useBaseUrl("/img/pages/studio/studio-light.png");
  const studioDark = useBaseUrl("/img/pages/studio/studio-dark.png");
  const cloudLight = useBaseUrl("/img/pages/cloud/publish-light.png");
  const cloudDark = useBaseUrl("/img/pages/cloud/publish-dark.png");
  const chatLight = useBaseUrl("/img/pages/app/chat-light.png");
  const chatDark = useBaseUrl("/img/pages/app/chat-dark.png");
  const appletLight = useBaseUrl("/img/pages/app/applet-light.png");
  const appletDark = useBaseUrl("/img/pages/app/applet-dark.png");

  return (
    <div className={styles.flow}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cli.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cli.title}</h2>
            <p className={styles.sectionDescription}>{copy.cli.description}</p>
            <div className={styles.bulletList}>
              {copy.cli.bullets.map(item => (
                <p key={item} className={styles.bullet}>
                  {item}
                </p>
              ))}
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
                  {copy.cli.commands.map(command => (
                    <span key={command} className={styles.commandLine}>
                      <span className={styles.prompt}>$</span> {command}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className={clsx(styles.section, styles.sectionTint)}>
        <div className={styles.container}>
          <div className={styles.mediaPanel}>
            <ThemedImage
              sources={{ light: studioLight, dark: studioDark }}
              alt="OOMOL Studio"
              className={styles.heroImage}
            />
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
            <ThemedImage
              sources={{ light: cloudLight, dark: cloudDark }}
              alt="OOMOL Cloud"
              className={styles.heroImage}
            />
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

          <div className={styles.dualMedia}>
            <div className={styles.agentMediaCard}>
              <ThemedImage
                sources={{ light: chatLight, dark: chatDark }}
                alt="OOMOL AI chat"
                className={styles.heroImage}
              />
            </div>
            <div className={styles.agentMediaCard}>
              <ThemedImage
                sources={{ light: appletLight, dark: appletDark }}
                alt="OOMOL AI applet"
                className={styles.heroImage}
              />
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
            <DownloadButton centered />
            <Link to="/docs/cloud-services/cli" className={styles.ctaGhost}>
              {copy.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
