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
    terminal: {
      label: string;
      lines: Array<
        { kind: "comment"; text: string } | { kind: "command"; text: string }
      >;
    };
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
    title: "大概就是这样开始并把一次任务跑通",
    description:
      "先装好并登录，再搜索并确认工具；能直接跑就直接跑，任务更长就等待结果回来。更细的命令和参数说明都在文档站里。",
    terminal: {
      label: "一次真实任务大概会这样走",
      lines: [
        {
          kind: "comment",
          text: "# 先用官方安装命令装好 oo-cli 并登录",
        },
        {
          kind: "command",
          text: "curl -fsSL https://cli.oomol.com/install.sh | bash",
        },
        { kind: "command", text: "oo login" },
        {
          kind: "comment",
          text: "# 搜索并确认它是不是你要的工具",
        },
        {
          kind: "command",
          text: 'oo search "generate a QR code for OOMOL"',
        },
        { kind: "command", text: "oo packages info foo/bar@latest" },
        {
          kind: "comment",
          text: "# 能直接跑就直接跑，长任务就等结果回来",
        },
        {
          kind: "command",
          text: "oo connector run <serviceName> -a <action> --dry-run --data @input.json",
        },
        {
          kind: "command",
          text: "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
        },
        { kind: "command", text: "oo cloud-task result task_123" },
      ],
    },
  },
  next: {
    eyebrow: "还需要更多时",
    title: "现成工具不够时，再用 Studio 或 Cloud",
    description:
      "oo-cli 先帮你把已发布能力和官方安装命令这条路径跑通。需要自己做工具，或者让工具持续运行时，再去 Studio 或 Cloud。",
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
      "用官方安装命令安装 oo-cli，先在终端里搜索工具、查看输入，并跑通一个真实任务。",
    primary: "查看安装文档",
    secondary: "查看命令参考",
  },
};

const enCopy: Copy = {
  workflow: {
    eyebrow: "Current Path",
    title: "This is roughly how a real task gets moving",
    description:
      "Install and log in first, then search and confirm the tool. If it can run directly, run it directly. If it takes longer, wait for the result to come back. The detailed commands and parameters live in the docs.",
    terminal: {
      label: "One real task usually looks like this",
      lines: [
        {
          kind: "comment",
          text: "# install oo-cli with the official install command, then sign in",
        },
        {
          kind: "command",
          text: "curl -fsSL https://cli.oomol.com/install.sh | bash",
        },
        { kind: "command", text: "oo login" },
        {
          kind: "comment",
          text: "# search and confirm whether it is the right tool",
        },
        {
          kind: "command",
          text: 'oo search "generate a QR code for OOMOL"',
        },
        { kind: "command", text: "oo packages info foo/bar@latest" },
        {
          kind: "comment",
          text: "# run it directly, or wait for the longer job to come back",
        },
        {
          kind: "command",
          text: "oo connector run <serviceName> -a <action> --dry-run --data @input.json",
        },
        {
          kind: "command",
          text: "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
        },
        { kind: "command", text: "oo cloud-task result task_123" },
      ],
    },
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
      "Install oo-cli with the official install commands, then use it to search tools, inspect inputs, and run a real task from the terminal.",
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
      <section className={`${styles.section} ${styles.workflowSection}`}>
        <div className={`${styles.container} ${styles.twoColumn}`}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.workflow.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.workflow.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.workflow.description}
            </p>
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
