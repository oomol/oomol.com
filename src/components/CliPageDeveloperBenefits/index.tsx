import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const COMMANDS_REFERENCE_URL =
  "https://github.com/oomol-lab/oo-cli/blob/main/docs/commands.md";
const CLI_REPOSITORY_URL = "https://github.com/oomol-lab/oo-cli";

const zhCopy = {
  badge: "为什么适合 Agent",
  title: "一个更适合 Agent 使用的命令行工具",
  subtitle:
    "它不是把网页操作搬到命令行，而是把 Agent 常用的几件事放进一个好用的 CLI 里：搜索、查看、运行、等结果。",
  benefits: [
    {
      tag: "统一入口",
      value: "一个 CLI",
      valueCaption: "搜索 / 查看 / 运行 / 等结果",
      eyebrow: "方式",
      title: "用一个 CLI 完成搜索、查看、运行和等待结果",
      description:
        "Agent 从找工具到拿到结果都在同一个 CLI 里完成，不必在网页和多种协议之间反复切换。",
      note: "切换越少，任务越容易跑通。",
      cta: "查看 CLI 指南",
      href: "/docs/cloud-services/cli",
    },
    {
      tag: "结构化输出",
      value: "JSON",
      valueCaption: "方便继续下一步",
      eyebrow: "输出",
      title: "让结果更容易继续往下用",
      description:
        "搜索、连接器、云任务、技能和文件等多类命令都支持 JSON 输出，便于把结果继续传给下一步。",
      note: "不是只给人看的终端输出，结果也能直接交给下一步。",
      cta: "查看命令参考",
      href: COMMANDS_REFERENCE_URL,
    },
    {
      tag: "可验证执行",
      value: "Dry Run",
      valueCaption: "先校验，再调用",
      eyebrow: "执行",
      title: "先检查输入，再真正运行",
      description:
        "`connector run` 和 `cloud-task run` 都支持 dry-run 或显式输入校验，减少无效调用和盲试。",
      note: "先看看能不能跑，再决定要不要跑。",
      cta: "查看命令参考",
      href: COMMANDS_REFERENCE_URL,
    },
    {
      tag: "直接可用",
      value: "技能",
      valueCaption: "Codex / Claude Code",
      eyebrow: "使用",
      title: "直接在 Codex 和 Claude Code 里使用",
      description:
        "oo 会安装和管理内置技能，也支持搜索和安装已发布技能，让 Agent 直接在 Codex 和 Claude Code 里调用。",
      note: "不用换一套地方，直接在你已经在用的工具里就能用。",
      cta: "查看 GitHub",
      href: CLI_REPOSITORY_URL,
    },
  ],
};

const enCopy = {
  badge: "Why It Fits Agents",
  title: "A command-line tool that works better for agents",
  subtitle:
    "This is not a web UI squeezed into a terminal. It gives agents one practical place to search, inspect, run, and wait for results.",
  benefits: [
    {
      tag: "Unified path",
      value: "One CLI",
      valueCaption: "Search / Inspect / Run / Wait",
      eyebrow: "Usage",
      title: "Use one CLI to search, inspect, run, and wait",
      description:
        "From finding a tool to getting the result back, the agent stays inside one CLI instead of bouncing across web pages and mixed protocols.",
      note: "Fewer switches make real tasks easier to finish.",
      cta: "Open CLI guide",
      href: "/docs/cloud-services/cli",
    },
    {
      tag: "Structured output",
      value: "JSON",
      valueCaption: "Let the next step continue",
      eyebrow: "Output",
      title: "Make results easier to use in the next step",
      description:
        "Search, connector, cloud task, skills, and file commands support JSON output so the result can move directly into the next step.",
      note: "Not just terminal output for people. The result can move straight into the next step.",
      cta: "Open command reference",
      href: COMMANDS_REFERENCE_URL,
    },
    {
      tag: "Verifiable execution",
      value: "Dry Run",
      valueCaption: "Validate first, then call",
      eyebrow: "Execution",
      title: "Check inputs before you actually run",
      description:
        "connector run and cloud-task run support dry runs or explicit input checks so the agent can avoid wasteful blind attempts.",
      note: "First see whether it will run. Then decide whether to run it.",
      cta: "Open command reference",
      href: COMMANDS_REFERENCE_URL,
    },
    {
      tag: "Direct use",
      value: "Skills",
      valueCaption: "Codex / Claude Code",
      eyebrow: "Use",
      title: "Use it directly in Codex and Claude Code",
      description:
        "oo installs and manages built-in skills, and it can search and install published skills so agents can use them directly inside Codex and Claude Code.",
      note: "No separate place to jump into.",
      cta: "View GitHub",
      href: CLI_REPOSITORY_URL,
    },
  ],
};

export default function CliPageDeveloperBenefits() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>{copy.badge}</div>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {copy.benefits.map((benefit, index) => {
            const isExternal = benefit.href.startsWith("http");

            return (
              <article
                key={benefit.title}
                className={`${styles.card} ${
                  index % 2 === 0 ? styles.modelCard : styles.cloudCard
                }`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.eyebrow}>{benefit.eyebrow}</div>
                  <div className={styles.tag}>{benefit.tag}</div>
                </div>
                <div className={styles.valueBox}>
                  <div className={styles.value}>{benefit.value}</div>
                  <div className={styles.valueCaption}>
                    {benefit.valueCaption}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
                <p className={styles.cardNote}>{benefit.note}</p>
                <div className={styles.cardFooter}>
                  {isExternal ? (
                    <a
                      href={benefit.href}
                      rel="noreferrer"
                      target="_blank"
                      className={styles.cardLink}
                    >
                      {benefit.cta}
                    </a>
                  ) : (
                    <Link to={benefit.href} className={styles.cardLink}>
                      {benefit.cta}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
