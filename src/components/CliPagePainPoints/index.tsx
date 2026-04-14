import styles from "../CloudPagePainPoints/styles.module.scss";

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
    title: string;
    description: string;
    points: string[];
  }>;
};

const zhCopy: Copy = {
  badge: "为什么用 CLI",
  title: "CLI 解决的是先用起来的门槛",
  subtitle:
    "不是先设计一套完整接入方案，而是先让 Agent 把真实任务跑通。搜索、查看、运行，这三步先在终端里完成。",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "发现",
      title: "先确认有没有现成工具",
      description:
        "你不需要第一天就从零做一套。先搜索别人已经发布好的工具，再决定缺口到底在哪里。",
      points: ["先搜再判断", "避免凭想象重做一遍"],
    },
    {
      icon: "i-lucide-terminal-square",
      eyebrow: "使用",
      title: "先在终端和 Agent 里直接跑起来",
      description:
        "CLI 先把查看输入、调用和结果拿回来这条使用路径跑通，再决定是否要延伸到 API、MCP 或网页入口。",
      points: ["先把真实任务做完", "有证据后再决定下一层"],
    },
  ],
};

const enCopy: Copy = {
  badge: "Why CLI",
  title: "CLI lowers the barrier to getting real usage started",
  subtitle:
    "The goal is not to design the full integration stack upfront. The goal is to let the agent finish a real task first. Search, inspect, and run in terminal before anything else.",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "Discovery",
      title: "Check whether ready-made tools already exist",
      description:
        "You do not need to build a new path on day one. Search published tools first, then decide where the real gap is.",
      points: ["Search before you judge", "Avoid rebuilding from guesswork"],
    },
    {
      icon: "i-lucide-terminal-square",
      eyebrow: "Usage",
      title: "Run it directly in terminal and agent workflows first",
      description:
        "CLI gets input inspection, invocation, and results working first. After that, you can decide whether the same capability should also become an API, MCP, or web entry point.",
      points: [
        "Finish a real task first",
        "Choose the next layer with evidence",
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
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
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
              <div className={styles.cardEyebrow}>{card.eyebrow}</div>
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
