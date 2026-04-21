import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

type Copy = {
  badge: string;
  title: string;
  subtitle: string;
  cards: Array<{
    icon: string;
    eyebrow: string;
    command: string;
    title: string;
    description: string;
    points: string[];
  }>;
};

const zhCopy: Copy = {
  badge: "oo-cli 能做什么",
  title: "在一个命令行工具里，完成搜索、查看和运行",
  subtitle:
    "它不只是搜索工具。搜索、查看、调用、等待结果，再到技能、文件和配置，都能在 oo-cli 里完成。",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "搜索",
      command: "oo search",
      title: "统一搜索工具和连接器",
      description:
        "用一条自然语言查询，同时搜索已发布的工具和连接器，先看看有没有现成工具可以直接用。",
      points: ["先找现成工具", "结果可以导出为 JSON"],
    },
    {
      icon: "i-lucide-box",
      eyebrow: "查看",
      command: "oo packages info",
      title: "先看工具信息，再决定怎么用",
      description:
        "查看工具说明、输入要求和版本信息，先弄清这个工具需要什么输入、适合做什么，再让 Agent 决定怎么调用。",
      points: ["减少盲调", "先理解再执行"],
    },
    {
      icon: "i-lucide-plug",
      eyebrow: "运行",
      command: "oo connector run",
      title: "直接运行连接器",
      description:
        "看清输入格式后，先 dry-run 检查输入，再直接运行连接器，并把结果交给下一步。",
      points: ["支持 dry-run", "失败信息更易诊断"],
    },
    {
      icon: "i-lucide-cloud",
      eyebrow: "云任务",
      command: "oo cloud-task run",
      title: "运行云任务并等待结果",
      description:
        "提交云任务后，再用 wait、result、log 把结果拿回来，让 CLI 帮 Agent 处理等待和追踪。",
      points: ["适合较长任务", "把结果拿回来继续用"],
    },
    {
      icon: "i-lucide-bot",
      eyebrow: "技能",
      command: "oo skills install",
      title: "在 Codex 和 Claude Code 里直接使用",
      description:
        "搜索、安装和更新 oo 管理的技能，让 Agent 直接在 Codex 和 Claude Code 里使用这些工具。",
      points: ["支持自动同步", "延续现在的使用方式"],
    },
    {
      icon: "i-lucide-files",
      eyebrow: "配套",
      command: "oo file / oo auth / oo log",
      title: "处理文件、账号和调试信息",
      description:
        "上传下载文件、切换账号、保存配置、查看日志，这些让任务真正跑通的配套功能都已经在 CLI 里准备好。",
      points: ["少找辅助手段", "更容易排查问题"],
    },
  ],
};

const enCopy: Copy = {
  badge: "What You Can Do with oo-cli",
  title: "Search, inspect, and run tools from one CLI",
  subtitle:
    "It does more than search. Discovery, inspection, execution, waiting for results, skills, files, and config all live in one CLI.",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "Discovery",
      command: "oo search",
      title: "Search packages and connectors through one entry point",
      description:
        "Use one natural-language query to search published packages and connector actions before deciding whether a ready-made tool already solves the job.",
      points: ["Find ready-made tools first", "Export results as JSON"],
    },
    {
      icon: "i-lucide-box",
      eyebrow: "Inspect",
      command: "oo packages info",
      title: "Inspect a tool before deciding how to use it",
      description:
        "Inspect package metadata, input requirements, and versions first so the agent understands what the tool expects and what it is good for before running it.",
      points: ["Reduce blind trial and error", "Understand before executing"],
    },
    {
      icon: "i-lucide-plug",
      eyebrow: "Run",
      command: "oo connector run",
      title: "Execute connector actions directly",
      description:
        "Check inputs with a dry run, execute the action, and hand the result to whatever the agent should do next.",
      points: ["Dry-run before execution", "Diagnose failures more easily"],
    },
    {
      icon: "i-lucide-cloud",
      eyebrow: "Cloud",
      command: "oo cloud-task run",
      title: "Run cloud tasks and wait for the result",
      description:
        "Submit a cloud task, then use wait, result, and log commands to bring the result back when the job takes longer to finish.",
      points: [
        "Fits longer-running work",
        "Bring the result back and keep going",
      ],
    },
    {
      icon: "i-lucide-bot",
      eyebrow: "Skills",
      command: "oo skills install",
      title: "Use these tools directly in Codex and Claude Code",
      description:
        "Search, install, and update oo-managed skills so agents can use these tools directly inside Codex and Claude Code.",
      points: [
        "Support automatic sync",
        "Keep using the tools you already know",
      ],
    },
    {
      icon: "i-lucide-files",
      eyebrow: "Ops",
      command: "oo file / oo auth / oo log",
      title: "Handle files, auth, config, and debugging",
      description:
        "Upload and download files, switch accounts, manage config, and inspect logs without leaving the CLI you are already using.",
      points: ["Avoid extra helper tools", "Debug real failures faster"],
    },
  ],
};

export default function CliPagePainPoints() {
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
          {copy.cards.map(card => (
            <article key={card.title} className={styles.card}>
              <div className={styles.cardIcon}>
                <i
                  className={`${styles.iconGlyph} ${card.icon}`}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.cardMeta}>
                <div className={styles.cardEyebrow}>{card.eyebrow}</div>
                <code className={styles.cardCommand}>{card.command}</code>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <ul className={styles.pointList}>
                {card.points.map(point => (
                  <li key={point} className={styles.pointItem}>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
