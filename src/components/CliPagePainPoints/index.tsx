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
  badge: "oo-cli 现在能做什么",
  title: "把安装、查看、运行和收尾放到同一条 CLI 路径里",
  subtitle:
    "现在不只是搜索工具。官方安装与更新、schema 查看、dry-run、云任务等待、skills、文件和日志，都已经在 oo-cli 里连成一条 Agent 能直接复用的终端路径。",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "搜索",
      command: "oo search",
      title: "一条查询同时搜索 package 和 connector",
      description:
        "用一条自然语言查询，同时搜索已发布 package 和 connector action，先看看是否已经有现成能力可以直接接进 Agent 的工作流里。",
      points: ["混合结果可导出为 JSON", "connector 命中会带 schemaPath"],
    },
    {
      icon: "i-lucide-box",
      eyebrow: "查看",
      command: "oo packages info / oo connector search",
      title: "先看元数据和 schema，再决定怎么跑",
      description:
        "先查看 package 的版本、输入要求和 block 信息，或者先搜 connector schema，让 Agent 在真正执行前就知道需要什么输入。",
      points: ["先理解输入再执行", "减少盲试和无效调用"],
    },
    {
      icon: "i-lucide-download",
      eyebrow: "安装",
      command: "oo install / oo update",
      title: "用官方安装脚本接入，并保持 CLI 常新",
      description:
        "除了包管理器安装，现在也能通过官方脚本拉取匹配平台的二进制，并用 oo update / check-update 维护受管安装。",
      points: ["官方分发二进制", "升级路径更明确"],
    },
    {
      icon: "i-lucide-plug",
      eyebrow: "运行",
      command: "oo connector run",
      title: "先 dry-run 校验，再直接调用 connector",
      description:
        "本地 schema cache 和 dry-run 让 Agent 先确认输入，再把结果和 executionId 交给下一步，而不是一开始就盲跑。",
      points: ["支持 dry-run", "失败信息更易诊断"],
    },
    {
      icon: "i-lucide-cloud",
      eyebrow: "云任务",
      command: "oo cloud-task run / wait / result / log",
      title: "把长任务交给 Cloud Task，再在 CLI 里追踪",
      description:
        "创建任务后继续用 wait、result、log、list 管理状态，不必为了看进度或拿结果再跳去另一套后台。",
      points: ["长任务可持续追踪", "结果能回到同一条 CLI 流程"],
    },
    {
      icon: "i-lucide-bot",
      eyebrow: "技能",
      command: "oo skills install / update",
      title: "把 published skills 和 bundled skills 管理清楚",
      description:
        "CLI 可以搜索、安装和更新已发布 skills，并在 install / update 后自动刷新内置 bundled skills，让 Codex 和 Claude Code 保持同步。",
      points: ["支持搜索已发布 skills", "bundled skills 会跟随安装升级刷新"],
    },
    {
      icon: "i-lucide-folder-cog",
      eyebrow: "配套",
      command: "oo file / oo log / oo config / oo completion",
      title: "文件、日志、补全和配置也都在 CLI 里",
      description:
        "上传、下载、列出、清理文件记录，查看持久化日志，保存配置并生成 shell 补全，减少为了收尾任务再找别的工具。",
      points: ["文件记录可 list / cleanup", "日志和补全都有现成命令"],
    },
  ],
};

const enCopy: Copy = {
  badge: "What oo-cli Covers Now",
  title: "Keep install, inspection, execution, and follow-through in one CLI",
  subtitle:
    "It does more than search. Official installs and updates, schema inspection, dry runs, cloud-task tracking, skills, files, and logs now form one reusable terminal path for agents.",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "Discovery",
      command: "oo search",
      title: "Search packages and connectors through one entry point",
      description:
        "Use one natural-language query to search published packages and connector actions before deciding whether a ready-made capability already solves the job.",
      points: [
        "Mixed results export as JSON",
        "Connector hits report cached schemaPath values",
      ],
    },
    {
      icon: "i-lucide-box",
      eyebrow: "Inspect",
      command: "oo packages info / oo connector search",
      title: "Inspect metadata and schemas before you run",
      description:
        "Inspect package versions, block metadata, and input requirements, or look at connector schemas first so the agent knows what execution will require.",
      points: [
        "Understand inputs before execution",
        "Reduce blind retries and invalid calls",
      ],
    },
    {
      icon: "i-lucide-download",
      eyebrow: "Install",
      command: "oo install / oo update",
      title: "Use official install scripts and keep the CLI current",
      description:
        "In addition to package-manager installs, the latest CLI ships an official binary install path plus oo update / check-update for managed lifecycle maintenance.",
      points: ["Official binary distribution", "Clear ongoing update path"],
    },
    {
      icon: "i-lucide-plug",
      eyebrow: "Run",
      command: "oo connector run",
      title: "Dry-run first, then execute a connector action",
      description:
        "Schema cache plus dry-run validation lets the agent verify inputs first, then pass the result and executionId into the next step.",
      points: ["Dry-run before execution", "Diagnose failures more easily"],
    },
    {
      icon: "i-lucide-cloud",
      eyebrow: "Cloud",
      command: "oo cloud-task run / wait / result / log",
      title: "Hand off longer work to Cloud Task and track it in the CLI",
      description:
        "Create a task, then keep using wait, result, log, and list commands without jumping into a separate backend just to monitor progress.",
      points: [
        "Fits longer-running work",
        "Bring the result back into the same CLI flow",
      ],
    },
    {
      icon: "i-lucide-bot",
      eyebrow: "Skills",
      command: "oo skills install / update",
      title: "Manage published and bundled skills cleanly",
      description:
        "Search, install, and update published skills, while install / update keeps bundled skills aligned for Codex and Claude Code.",
      points: [
        "Search published skills",
        "Bundled skills refresh with install and update",
      ],
    },
    {
      icon: "i-lucide-folder-cog",
      eyebrow: "Ops",
      command: "oo file / oo log / oo config / oo completion",
      title: "Keep files, logs, config, and shell setup in the same CLI",
      description:
        "Upload, download, list, and clean up file records, inspect persisted logs, keep config on disk, and generate shell completion scripts without leaving the CLI.",
      points: [
        "Files support list and cleanup",
        "Logs and completion are built in",
      ],
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
