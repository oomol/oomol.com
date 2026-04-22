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
    "它不是把网页操作搬到命令行，而是把 Agent 真正常用的终端路径接起来：安装、搜索、查看、校验、运行、升级和继续交付。",
  benefits: [
    {
      tag: "统一入口",
      value: "一个 CLI",
      valueCaption: "安装 / 搜索 / 查看 / 运行 / 收尾",
      eyebrow: "方式",
      title: "用一个 CLI 完成从接入到收尾的整条路径",
      description:
        "Agent 从安装 oo、找工具、看清输入，到真正执行并把结果拿回来，都能在同一个 CLI 里完成，不必在网页和多种协议之间来回切换。",
      note: "切换越少，任务越容易跑通。",
      cta: "查看 CLI 指南",
      href: "/docs/oo-cli",
    },
    {
      tag: "受管更新",
      value: "安装 / 更新",
      valueCaption: "官方脚本 + 版本对齐",
      eyebrow: "生命周期",
      title: "官方安装命令和 oo update 把 CLI 生命周期接起来",
      description:
        "最新版本支持官方安装命令和受管更新路径，按平台拉取正确的二进制，并在安装或升级后自动刷新 bundled skills。",
      note: "终端工具本身也要有稳定的升级路径。",
      cta: "查看安装文档",
      href: "/docs/oo-cli",
    },
    {
      tag: "结构化执行",
      value: "JSON + Dry Run",
      valueCaption: "schemaPath / validation / executionId",
      eyebrow: "执行",
      title: "结果适合继续往下传，执行前也能先校验",
      description:
        "搜索、connector、cloud task、skills、文件等多类命令都能输出结构化结果；connector search 会带出 schemaPath，connector run 还能先 dry-run。",
      note: "既给人看，也能直接交给下一步程序用。",
      cta: "查看命令参考",
      href: COMMANDS_REFERENCE_URL,
    },
    {
      tag: "直接可用",
      value: "技能",
      valueCaption: "Codex / Claude Code",
      eyebrow: "使用",
      title: "在 Codex 和 Claude Code 里直接用，并明确区分 bundled / published",
      description:
        "oo 会把内置 skills 安装到受支持的宿主目录，也能搜索、安装和更新已发布 skills，让 Agent 继续在现有宿主里工作。",
      note: "不用跳去另一套入口，也不用手动追版本。",
      cta: "查看 GitHub",
      href: CLI_REPOSITORY_URL,
    },
  ],
};

const enCopy = {
  badge: "Why It Fits Agents",
  title: "A command-line tool built for agents",
  subtitle:
    "This is not a web UI transplanted into a terminal. It connects the terminal path agents actually need: install, search, inspect, validate, run, update, and keep delivering.",
  benefits: [
    {
      tag: "Unified path",
      value: "One CLI",
      valueCaption: "Install / Search / Inspect / Run / Finish",
      eyebrow: "Usage",
      title: "Use one CLI for the whole path from setup to follow-through",
      description:
        "From installing oo and finding a tool to validating inputs, running it, and bringing the result back, the agent stays inside one CLI instead of bouncing across web pages and mixed protocols.",
      note: "Fewer switches make real tasks easier to finish.",
      cta: "Read the CLI guide",
      href: "/docs/oo-cli",
    },
    {
      tag: "Managed lifecycle",
      value: "Install / Update",
      valueCaption: "Official scripts + aligned versions",
      eyebrow: "Lifecycle",
      title:
        "Official install commands and oo update keep the CLI lifecycle connected",
      description:
        "The latest CLI adds official install commands and a managed update path that downloads the right binary for the current platform and refreshes bundled skills after install or upgrade.",
      note: "A terminal-first tool should also have a stable upgrade path.",
      cta: "Read the install guide",
      href: "/docs/oo-cli",
    },
    {
      tag: "Structured execution",
      value: "JSON + Dry Run",
      valueCaption: "schemaPath / validation / executionId",
      eyebrow: "Execution",
      title:
        "Results flow into the next step, and execution can be validated first",
      description:
        "Search, connector, cloud task, skills, and file commands all emit structured output. Connector search reports schemaPath values, and connector run supports dry-run validation before execution.",
      note: "The CLI is not only readable for humans. It is also usable by the next step.",
      cta: "Read the command reference",
      href: COMMANDS_REFERENCE_URL,
    },
    {
      tag: "Direct use",
      value: "Skills",
      valueCaption: "Codex / Claude Code",
      eyebrow: "Use",
      title:
        "Use it directly in Codex and Claude Code, with bundled and published skills separated clearly",
      description:
        "oo installs built-in skills into supported host directories and can also search, install, and update published skills so agents keep working in the hosts they already use.",
      note: "No second place to switch to, and no manual version chasing.",
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
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionSubtitle}>{copy.subtitle}</p>
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
