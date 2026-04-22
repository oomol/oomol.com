import styles from "./styles.module.scss";
import siteCtaStyles from "@site/src/components/SiteCta/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const COMMANDS_REFERENCE_ROUTE = "/docs/oo-cli/command-reference";

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
    eyebrow: "最新路径",
    title: "从安装到执行，把一次真实任务走通",
    description:
      "先用官方脚本或包管理器把 oo 接进终端，再登录一次建立账号上下文。完成这一步后，大多数任务都会沿着同一条路径重复：搜索、查看、校验、执行，再把结果拿回来。",
    steps: [
      {
        index: "01",
        command: "curl -fsSL https://cli.oomol.com/install.sh | bash\noo login",
        title: "接入：安装并建立账号上下文",
        text: "先把 oo 安装成一个可持续维护的终端入口，再登录一次，后面的 Agent 会话就能复用这套账号上下文。",
      },
      {
        index: "02",
        command:
          'oo search "generate a QR code for OOMOL"\noo packages info foo/bar@latest',
        title: "发现：统一搜索，再看清 package 信息",
        text: "先搜 package 和 connector，再看 metadata、版本和输入要求，确认是否已经有现成能力能直接复用。",
      },
      {
        index: "03",
        command:
          'oo connector search "send an email"\noo connector run <serviceName> -a <action> --dry-run --data @input.json',
        title: "执行：先校验输入，再直接调用 connector",
        text: "schema cache 和 dry-run 帮 Agent 先检查输入，再同步拿到结果和 executionId，而不是一开始就盲跑。",
      },
      {
        index: "04",
        command: "oo cloud-task wait <taskId>\noo cloud-task result <taskId>",
        title: "扩展：交给 Cloud Task 并把结果带回 CLI",
        text: "当任务更长时，把执行交给云端，再用 wait、result、log 继续沿着同一条命令路径收尾。",
      },
    ],
    terminal: {
      label: "一次真实任务的命令流程",
      lines: [
        {
          kind: "comment",
          text: "# 先用官方脚本安装，之后继续用 oo update 保持最新",
        },
        {
          kind: "command",
          text: "curl -fsSL https://cli.oomol.com/install.sh | bash",
        },
        { kind: "comment", text: "# 登录一次，后面复用同一套账号上下文" },
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
          text: "# 先看一个工具的说明、版本和输入要求",
        },
        { kind: "command", text: "oo packages info foo/bar@latest" },
        {
          kind: "comment",
          text: "# 先 dry-run 校验 connector 输入，再真正执行",
        },
        {
          kind: "command",
          text: "oo connector run <serviceName> -a <action> --dry-run --data @input.json",
        },
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
    title: "这些能力现在就能直接用在真实环境里",
    description:
      "从官方安装、结构化搜索，到 connector 和 cloud task，这些都是最新版本最适合直接落地的用法。",
    cards: [
      {
        tag: "安装与更新",
        result: "官方脚本 + oo update",
        title: "先把 CLI 装成可持续维护的终端入口",
        description:
          "最新版本提供官方安装脚本和明确的升级路径，不用每次发布后都重新摸索怎么装、怎么更新。",
        commands: [
          "curl -fsSL https://cli.oomol.com/install.sh | bash",
          "oo check-update",
          "oo update",
        ],
      },
      {
        tag: "搜索",
        result: "返回 package / connector 混合结果",
        title: "先搜索，再决定要不要自己做",
        description:
          "先用一句自然语言找找有没有现成工具，而不是一开始就自己做。",
        commands: ['oo search "send a summary to Slack" --json'],
      },
      {
        tag: "连接器",
        result: "带 schemaPath，可 dry-run",
        title: "先查看 connector，再校验输入并执行",
        description:
          "先通过 connector search 看清 schema，再 dry-run 检查输入，确认没问题后再执行 action，把结果交给下一步。",
        commands: [
          'oo connector search "send an email" --json',
          "oo connector run <serviceName> -a <action> --dry-run --data @input.json",
          "oo connector run <serviceName> -a <action> --data @input.json",
        ],
      },
      {
        tag: "云任务",
        result: "list / log / wait / result 一条龙",
        title: "运行一个任务并等待结果",
        description:
          "对于已发布任务，CLI 会负责创建任务、等待状态变化、读取日志，再把结果拿回来，不必切到别的后台。",
        commands: [
          "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
          "oo cloud-task wait <taskId>",
          "oo cloud-task log <taskId>",
          "oo cloud-task result <taskId>",
        ],
      },
      {
        tag: "技能",
        result: "区分 bundled 与 published skills",
        title: "在 Codex 和 Claude Code 里直接继续工作",
        description:
          "bundled skills 和 published skills 都能通过 oo-cli 管理，让 Agent 继续留在你已经在用的宿主里工作。",
        commands: [
          "oo skills install",
          'oo skills search "figma"',
          "oo skills update",
        ],
      },
    ],
  },
  next: {
    eyebrow: "还需要更多时",
    title: "现成工具不够时，再用 Studio 或 Cloud",
    description:
      "oo-cli 先帮你把已发布能力和安装路径跑通。需要自己做工具，或者让工具持续运行时，再去 Studio 或 Cloud。",
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
      "用官方脚本或包管理器安装 oo-cli，先在终端里搜索工具、查看输入，并跑通一个真实任务。",
    primary: "查看安装文档",
    secondary: "查看命令参考",
  },
};

const enCopy: Copy = {
  workflow: {
    eyebrow: "Current Path",
    title: "From install to execution, walk through one real task",
    description:
      "Start by getting oo into the terminal through the official installer or a package manager, then log in once to establish the account context. After that, most tasks repeat the same loop: search, inspect, validate, execute, and bring the result back.",
    steps: [
      {
        index: "01",
        command: "curl -fsSL https://cli.oomol.com/install.sh | bash\noo login",
        title: "Set up: install oo and establish account context",
        text: "Turn oo into a maintained terminal entry point first, then log in once so later agent sessions can reuse the same account context.",
      },
      {
        index: "02",
        command:
          'oo search "generate a QR code for OOMOL"\noo packages info foo/bar@latest',
        title: "Discover: search once, then inspect the package",
        text: "Search packages and connectors together, then inspect metadata, versions, and input requirements to confirm whether a published capability already fits.",
      },
      {
        index: "03",
        command:
          'oo connector search "send an email"\noo connector run <serviceName> -a <action> --dry-run --data @input.json',
        title: "Execute: validate inputs, then run the connector",
        text: "Schema cache plus dry-run validation lets the agent check inputs first, then get the result and executionId without a blind attempt.",
      },
      {
        index: "04",
        command: "oo cloud-task wait <taskId>\noo cloud-task result <taskId>",
        title: "Extend: hand longer work to Cloud Task and bring it back",
        text: "When the job runs longer, move execution to the cloud, then use wait, result, and log commands to finish in the same command path.",
      },
    ],
    terminal: {
      label: "One real task in oo-cli",
      lines: [
        {
          kind: "comment",
          text: "# install once from the official script, then keep using oo update",
        },
        {
          kind: "command",
          text: "curl -fsSL https://cli.oomol.com/install.sh | bash",
        },
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
        { kind: "command", text: "oo packages info foo/bar@latest" },
        {
          kind: "comment",
          text: "# validate a connector input before execution",
        },
        {
          kind: "command",
          text: "oo connector run <serviceName> -a <action> --dry-run --data @input.json",
        },
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
    primary: "Read the install guide",
    secondary: "Read the command reference",
  },
  examples: {
    eyebrow: "Command Examples",
    title: "These capabilities are ready for real work right now",
    description:
      "From official install to structured search, connector execution, and cloud-task tracking, these are the most practical ways to use the current CLI.",
    cards: [
      {
        tag: "Install & Update",
        result: "Official scripts + oo update",
        title: "Turn oo into a maintained terminal entry point first",
        description:
          "The latest CLI adds official install scripts and a clear upgrade path, so you do not have to rediscover how to install or update it on every release.",
        commands: [
          "curl -fsSL https://cli.oomol.com/install.sh | bash",
          "oo check-update",
          "oo update",
        ],
      },
      {
        tag: "Search",
        result: "Returns mixed package and connector results",
        title: "Search first before deciding to build",
        description:
          "Use one natural-language query to look for ready-made tools before deciding to build your own.",
        commands: ['oo search "send a summary to Slack" --json'],
      },
      {
        tag: "Connector",
        result: "Includes schemaPath and dry-run support",
        title: "Inspect a connector, then validate and execute it",
        description:
          "Use connector search to inspect the schema first, then validate the payload with a dry run before sending the real action call.",
        commands: [
          'oo connector search "send an email" --json',
          "oo connector run <serviceName> -a <action> --dry-run --data @input.json",
          "oo connector run <serviceName> -a <action> --data @input.json",
        ],
      },
      {
        tag: "Cloud Task",
        result: "list / log / wait / result in one flow",
        title: "Run a workload and wait for the result",
        description:
          "For published tasks, the CLI creates the task, waits for status updates, reads logs, and brings the result back without leaving the terminal path.",
        commands: [
          "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
          "oo cloud-task wait <taskId>",
          "oo cloud-task log <taskId>",
          "oo cloud-task result <taskId>",
        ],
      },
      {
        tag: "Skills",
        result: "Separates bundled and published skills",
        title: "Keep working directly inside Codex and Claude Code",
        description:
          "Manage bundled and published skills through oo-cli so agents keep working in the hosts they already use.",
        commands: [
          "oo skills install",
          'oo skills search "figma"',
          "oo skills update",
        ],
      },
    ],
  },
  next: {
    eyebrow: "Need More?",
    title: "When ready-made tools are not enough, use Studio or Cloud",
    description:
      "Let oo-cli establish the published-tool path and the install/update lifecycle first. If you need to build your own tool or keep it running continuously, then move on to Studio or Cloud.",
    cards: [
      {
        title: "Go to Studio to generate or complete your own tool",
        text: "When existing tools are not enough, use Studio to let the agent generate code, fill in parameters, and validate the tool locally.",
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
      "Install oo-cli from the official script or your package manager, then use it to search tools, inspect inputs, and run a real task from the terminal.",
    primary: "Read the install guide",
    secondary: "Read the command reference",
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
              <Link to="/docs/oo-cli" className={styles.primaryLink}>
                {copy.workflow.primary}
              </Link>
              <Link
                to={COMMANDS_REFERENCE_ROUTE}
                className={styles.secondaryLink}
              >
                {copy.workflow.secondary}
              </Link>
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
                <span className={styles.commandIndex}>{step.index}</span>
                <code className={styles.commandSnippet}>{step.command}</code>
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
            <Link
              to={COMMANDS_REFERENCE_ROUTE}
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
