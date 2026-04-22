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
  title: "先接入，再找现成工具，然后把任务跑通",
  subtitle:
    "这页不展开讲命令细节。你只要先把 oo-cli 接进终端，再用它找现成工具、执行任务，并把结果带回来；更细的说明交给文档站。",
  cards: [
    {
      icon: "i-lucide-download",
      eyebrow: "接入",
      command: "oo install / oo update / oo skills install",
      title: "把 oo-cli 接进终端和宿主",
      description:
        "通过官方安装命令把 oo 接进终端，再把需要的 skills 接到 Codex、Claude Code 等宿主里。",
      points: ["安装和升级路径清楚", "不用换一套地方继续工作"],
    },
    {
      icon: "i-lucide-search",
      eyebrow: "发现",
      command: "oo search / oo packages info / oo connector search",
      title: "先找现成工具，再决定要不要自己做",
      description:
        "先搜 package 和 connector，再看 package metadata 或 connector schema，确认是否已经有现成能力可以直接复用。",
      points: ["先理解输入和能力范围", "减少一上来就自己做的概率"],
    },
    {
      icon: "i-lucide-plug",
      eyebrow: "运行",
      command: "oo connector run / oo cloud-task ... / oo file / oo log",
      title: "直接执行、等待结果、查看日志都在同一条路径里",
      description:
        "短任务可以直接跑 connector，长任务可以交给 Cloud Task。等待、取结果、文件和日志也都留在 oo-cli 里完成。",
      points: ["支持 dry-run 和长任务追踪", "不必切到另一套后台收尾"],
    },
  ],
};

const enCopy: Copy = {
  badge: "What oo-cli Covers Now",
  title: "Set it up, find a ready-made tool, then run the task",
  subtitle:
    "This page does not need to unpack every command. The main job is simpler: get oo-cli into the terminal, use it to find a ready-made tool, then run the task and bring the result back. The detailed command surface belongs in the docs.",
  cards: [
    {
      icon: "i-lucide-download",
      eyebrow: "Setup",
      command: "oo install / oo update / oo skills install",
      title: "Connect oo-cli to the terminal and the hosts people already use",
      description:
        "Use the official install commands to get oo into the terminal, then connect the skills you need to hosts such as Codex and Claude Code.",
      points: [
        "Clear install and upgrade path",
        "No separate place to switch to",
      ],
    },
    {
      icon: "i-lucide-search",
      eyebrow: "Discovery",
      command: "oo search / oo packages info / oo connector search",
      title: "Find the ready-made tool first before deciding to build",
      description:
        "Search packages and connectors in natural language, then inspect package metadata or connector schemas to confirm whether a published capability already fits.",
      points: [
        "Understand inputs and scope first",
        "Avoid rebuilding what already exists",
      ],
    },
    {
      icon: "i-lucide-plug",
      eyebrow: "Run",
      command: "oo connector run / oo cloud-task ... / oo file / oo log",
      title: "Execute, wait, fetch results, and inspect logs in the same path",
      description:
        "Direct connector calls work for short jobs. Cloud Task handles longer ones. Waiting, results, files, and logs still stay inside oo-cli instead of another backend.",
      points: [
        "Dry-run and long-task tracking are built in",
        "No need to switch tools to finish the job",
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
