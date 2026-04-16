import styles from "./styles.module.scss";
import siteCtaStyles from "@site/src/components/SiteCta/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const COMMANDS_REFERENCE_URL =
  "https://github.com/oomol-lab/oo-cli/blob/main/docs/commands.md";

type Copy = {
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{
      index: string;
      command: string;
      title: string;
      text: string;
    }>;
    terminal: {
      label: string;
      lines: Array<
        { kind: "comment"; text: string } | { kind: "command"; text: string }
      >;
    };
    primary: string;
    secondary: string;
  };
  examples: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      tag: string;
      result: string;
      title: string;
      description: string;
      commands: string[];
    }>;
  };
  next: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      title: string;
      text: string;
      cta: string;
      href: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

const zhCopy: Copy = {
  workflow: {
    eyebrow: "真实流程",
    title: "让 Agent 在 oo-cli 里完成一次真实任务",
    description:
      "常见用法不是先看一堆文档，再自己写一套接入，而是先登录、搜索、查看、调用、等结果。下面这条流程，就是 Agent 在终端里最常见的使用方式。",
    steps: [
      {
        index: "01",
        command: "oo login",
        title: "先登录，复用同一套账号上下文",
        text: "认证状态准备好之后，后续搜索、cloud task 和 skills 都可以沿用同一个 CLI 会话。",
      },
      {
        index: "02",
        command: 'oo search "generate a QR code for OOMOL"',
        title: "先找找有没有现成工具",
        text: "先让 Agent 用自然语言搜索 package 和 connector，看看有没有已经可以直接使用的工具。",
      },
      {
        index: "03",
        command: "oo packages info foo/bar",
        title: "先看清楚这个工具怎么用",
        text: "先看 package metadata、blocks 或 connector schema，弄清需要什么输入，再决定怎么调用。",
      },
      {
        index: "04",
        command: "oo connector run ... / oo cloud-task run ...",
        title: "直接把任务跑起来",
        text: "既可以直接执行 connector action，也可以提交一个 cloud task，把任务先跑起来。",
      },
      {
        index: "05",
        command: "oo cloud-task wait <taskId>",
        title: "等结果回来，再继续下一步",
        text: "CLI 会帮你等待状态、读取日志和拿回结果，Agent 可以继续往下做。",
      },
    ],
    terminal: {
      label: "一次真实任务的命令流程",
      lines: [
        { kind: "comment", text: "# 先登录，后面复用同一套账号上下文" },
        { kind: "command", text: "oo login" },
        {
          kind: "comment",
          text: "# 同时搜索已发布的工具和连接器",
        },
        {
          kind: "command",
          text: 'oo search "generate a QR code for OOMOL"',
        },
        {
          kind: "comment",
          text: "# 先看一个工具的说明和输入要求",
        },
        { kind: "command", text: "oo packages info foo/bar" },
        {
          kind: "comment",
          text: "# 运行一个云任务，再把结果拿回来",
        },
        {
          kind: "command",
          text: "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
        },
        { kind: "command", text: "oo cloud-task wait task_123" },
        { kind: "command", text: "oo cloud-task result task_123" },
      ],
    },
    primary: "查看安装文档",
    secondary: "查看命令参考",
  },
  examples: {
    eyebrow: "命令示例",
    title: "这些功能现在就能直接用",
    description:
      "下面四组示例，分别对应搜索、调用、云任务，以及在 Codex 和 Claude Code 里使用。",
    cards: [
      {
        tag: "搜索",
        result: "返回工具和连接器结果",
        title: "先搜索，再决定要不要自己做",
        description:
          "先用一句自然语言找找有没有现成工具，而不是一开始就自己做。",
        commands: ['oo search "send a summary to Slack" --json'],
      },
      {
        tag: "连接器",
        result: "支持 dry-run 与结构化结果",
        title: "直接运行连接器",
        description:
          "拿到 schema 后，先 dry-run 检查输入，再直接运行 connector action，把结果交给下一步。",
        commands: [
          "oo connector run slack.send-message --dry-run --data @input.json",
          "oo connector run slack.send-message --data @input.json",
        ],
      },
      {
        tag: "云任务",
        result: "适合较长任务与异步等待",
        title: "运行一个任务并等待结果",
        description:
          "对于已发布任务，CLI 会负责创建任务、等待状态变化、读取日志，再把结果拿回来。",
        commands: [
          "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
          "oo cloud-task wait <taskId>",
          "oo cloud-task result <taskId>",
        ],
      },
      {
        tag: "技能",
        result: "直接在 Codex / Claude Code 中使用",
        title: "在 Codex 和 Claude Code 里直接使用",
        description:
          "技能的搜索、安装和更新都在 oo-cli 里完成，不需要换一套地方继续用。",
        commands: [
          'oo skills search "figma"',
          "oo skills install package/name --all -y",
          "oo skills update",
        ],
      },
    ],
  },
  next: {
    eyebrow: "还需要更多时",
    title: "现成工具不够时，再用 Studio 或 Cloud",
    description:
      "oo-cli 先帮你把任务跑起来。需要自己做工具，或者让工具持续运行时，再去 Studio 或 Cloud。",
    cards: [
      {
        title: "去 Studio 生成或补全自己的工具",
        text: "当现有工具不够用时，再去 Studio 让 Agent 帮你生成代码、补参数并做本地验证。",
        cta: "了解 Studio",
        href: "/studio",
      },
      {
        title: "去 Cloud 持续运行和交付",
        text: "当工具需要稳定运行、查看日志或给更多人复用时，再用 Cloud 托管和交付。",
        cta: "了解 Cloud",
        href: "/cloud",
      },
    ],
  },
  cta: {
    title: "现在就让 Agent 用上这些工具",
    description:
      "安装 oo-cli，先在终端里搜索工具、查看输入，并跑通一个真实任务。",
    primary: "查看安装文档",
    secondary: "查看命令参考",
  },
};

const enCopy: Copy = {
  workflow: {
    eyebrow: "Real Workflow",
    title: "Let the agent finish one real task inside oo-cli",
    description:
      "A common path is not to read a pile of docs and build a custom integration first. It is to log in, search, inspect, run, and wait for results. This is closer to how an agent actually uses a CLI.",
    steps: [
      {
        index: "01",
        command: "oo login",
        title: "Log in once and reuse the same account context",
        text: "Once auth is ready, search, cloud tasks, and skills all reuse the same CLI session.",
      },
      {
        index: "02",
        command: 'oo search "generate a QR code for OOMOL"',
        title: "Check whether a ready-made tool already exists",
        text: "Let the agent search packages and connectors in natural language before deciding whether anything new needs to be built.",
      },
      {
        index: "03",
        command: "oo packages info foo/bar",
        title: "See how the tool works before calling it",
        text: "Look at package metadata, blocks, or connector schemas first so the required inputs are clear before execution.",
      },
      {
        index: "04",
        command: "oo connector run ... / oo cloud-task run ...",
        title: "Run the actual call",
        text: "Either execute a connector action directly or submit a cloud task so the real task starts moving.",
      },
      {
        index: "05",
        command: "oo cloud-task wait <taskId>",
        title: "Wait for the result and keep moving",
        text: "The CLI handles waiting, logs, and result retrieval so the agent can keep moving.",
      },
    ],
    terminal: {
      label: "One real agent workflow",
      lines: [
        { kind: "comment", text: "# log in once and reuse the same context" },
        { kind: "command", text: "oo login" },
        {
          kind: "comment",
          text: "# search published packages and connector actions together",
        },
        {
          kind: "command",
          text: 'oo search "generate a QR code for OOMOL"',
        },
        {
          kind: "comment",
          text: "# inspect one package before deciding how to call it",
        },
        { kind: "command", text: "oo packages info foo/bar" },
        {
          kind: "comment",
          text: "# run a cloud task and keep the result in the same CLI flow",
        },
        {
          kind: "command",
          text: "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
        },
        { kind: "command", text: "oo cloud-task wait task_123" },
        { kind: "command", text: "oo cloud-task result task_123" },
      ],
    },
    primary: "Open install guide",
    secondary: "Open command reference",
  },
  examples: {
    eyebrow: "Command Examples",
    title: "These features are available right now",
    description:
      "These examples cover search, execution, cloud tasks, and using tools inside Codex and Claude Code.",
    cards: [
      {
        tag: "Search",
        result: "Return packages and connectors together",
        title: "Search first before deciding to build",
        description:
          "Use one natural-language query to look for ready-made tools before deciding to build your own.",
        commands: ['oo search "send a summary to Slack" --json'],
      },
      {
        tag: "Connector",
        result: "Support dry runs and structured results",
        title: "Execute a connector action directly",
        description:
          "Check inputs with a dry run first, then run the connector action and pass the result into the next step.",
        commands: [
          "oo connector run slack.send-message --dry-run --data @input.json",
          "oo connector run slack.send-message --data @input.json",
        ],
      },
      {
        tag: "Cloud Task",
        result: "Fit longer tasks and async waiting",
        title: "Run a workload and wait for the result",
        description:
          "For published tasks, the CLI creates the task, waits for status updates, reads logs, and brings the result back.",
        commands: [
          "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
          "oo cloud-task wait <taskId>",
          "oo cloud-task result <taskId>",
        ],
      },
      {
        tag: "Skills",
        result: "Land directly in Codex / Claude Code",
        title: "Use these tools directly in Codex and Claude Code",
        description:
          "Search, install, and update skills through oo-cli instead of jumping to a separate place to keep using them.",
        commands: [
          'oo skills search "figma"',
          "oo skills install package/name --all -y",
          "oo skills update",
        ],
      },
    ],
  },
  next: {
    eyebrow: "Need More?",
    title: "When ready-made tools are not enough, use Studio or Cloud",
    description:
      "Let oo-cli get the task moving first. If you need to build your own tool or keep it running, then move on to Studio or Cloud.",
    cards: [
      {
        title: "Go to Studio to generate or complete your own tool",
        text: "When existing tools are not enough, use Studio to let the agent generate code, fill parameters, and validate the tool locally.",
        cta: "Explore Studio",
        href: "/studio",
      },
      {
        title: "Go to Cloud when it needs stable runtime and delivery",
        text: "When the tool needs stable runtime, logs, or broader reuse, let Cloud take over.",
        cta: "Explore Cloud",
        href: "/cloud",
      },
    ],
  },
  cta: {
    title: "Let your agent use these tools now",
    description:
      "Install oo-cli and use it to search tools, inspect inputs, and run a real task from terminal.",
    primary: "Open install guide",
    secondary: "Open command reference",
  },
};

export default function CliPageLinearFlow() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;

  return (
    <div className={styles.flow}>
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.twoColumn}`}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.workflow.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.workflow.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.workflow.description}
            </p>

            <div className={styles.inlineActions}>
              <Link
                to="/docs/oo-cli"
                className={styles.primaryLink}
              >
                {copy.workflow.primary}
              </Link>
              <a
                href={COMMANDS_REFERENCE_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryLink}
              >
                {copy.workflow.secondary}
              </a>
            </div>
          </div>

          <div className={styles.terminalPanel}>
            <div className={styles.terminalChrome} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalLabel}>
                {copy.workflow.terminal.label}
              </div>
              <pre className={styles.commandBlock}>
                {copy.workflow.terminal.lines.map((line, index) =>
                  line.kind === "comment" ? (
                    <span key={index} className={styles.commentLine}>
                      {line.text}
                    </span>
                  ) : (
                    <span key={index} className={styles.commandLine}>
                      <span className={styles.prompt}>$</span> {line.text}
                    </span>
                  )
                )}
              </pre>
            </div>
          </div>

          <div className={styles.commandGrid}>
            {copy.workflow.steps.map(step => (
              <article key={step.index} className={styles.commandCard}>
                <div className={styles.commandTop}>
                  <span className={styles.commandIndex}>{step.index}</span>
                  <span className={styles.commandSnippet}>{step.command}</span>
                </div>
                <h3 className={styles.commandTitle}>{step.title}</h3>
                <p className={styles.commandText}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTint}`}>
        <div className={`${styles.container} ${styles.stackContainer}`}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>{copy.examples.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.examples.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.examples.description}
            </p>
          </div>

          <div className={styles.exampleGrid}>
            {copy.examples.cards.map(card => (
              <article key={card.title} className={styles.exampleCard}>
                <div className={styles.exampleTop}>
                  <span className={styles.exampleTag}>{card.tag}</span>
                  <span className={styles.exampleResult}>{card.result}</span>
                </div>
                <h3 className={styles.exampleTitle}>{card.title}</h3>
                <p className={styles.exampleDescription}>{card.description}</p>
                <div className={styles.exampleSnippet}>
                  <pre>
                    {card.commands.map(command => (
                      <span key={command} className={styles.exampleCommandLine}>
                        {command}
                      </span>
                    ))}
                  </pre>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.stackContainer}`}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>{copy.next.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.next.title}</h2>
            <p className={styles.sectionDescription}>{copy.next.description}</p>
          </div>

          <div className={styles.nextGrid}>
            {copy.next.cards.map(card => (
              <article key={card.title} className={styles.nextCard}>
                <h3 className={styles.nextTitle}>{card.title}</h3>
                <p className={styles.nextText}>{card.text}</p>
                <Link to={card.href} className={styles.primaryLink}>
                  {card.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg" className={siteCtaStyles.actionButton}>
              <Link to="/docs/oo-cli">{copy.cta.primary}</Link>
            </Button>
            <a
              href={COMMANDS_REFERENCE_URL}
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
