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
    title: string;
    description: string;
    points: string[];
  }>;
};

const zhCopy: Copy = {
  badge: "什么时候需要 Cloud",
  title: "工具跑通后，Cloud 帮你把它上线",
  subtitle:
    "本地能跑只是第一步。要让同事、客户或 AI Agent 稳定使用，你还要准备服务器、保存密钥、控制谁能用，并处理运行中的问题。Cloud 把这些麻烦集中处理。",
  cards: [
    {
      icon: "i-lucide-waypoints",
      eyebrow: "发布工具",
      title: "不用为了一个工具再做一套系统",
      description:
        "把工具发布到 Cloud 后，你不需要再单独开发登录、权限、后台管理这些配套功能。",
      points: ["AI Agent 仍在 oo-cli 里使用工具", "少做一套页面和管理后台"],
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "在线运行",
      title: "让工具一直可用，而不是只在本机能跑",
      description:
        "Cloud 负责在线运行、保存密钥、管理谁能使用。以后需要 API、MCP 或自动化，也可以再加上这些使用方式，不用重做工具。",
      points: ["少处理服务器和权限细节", "先上线给 Agent 用，再按需要扩展"],
    },
  ],
};

const enCopy: Copy = {
  badge: "When to use Cloud",
  title: "Once a tool works locally, Cloud helps you publish it",
  subtitle:
    "A working local tool is only the first step. To let teammates, customers, or AI agents use it reliably, you still need hosting, secrets, access rules, and operations. Cloud takes care of that work.",
  cards: [
    {
      icon: "i-lucide-waypoints",
      eyebrow: "Publish tools",
      title: "Do not build a whole app around one tool",
      description:
        "Publish the tool to Cloud instead of building login, permissions, admin pages, and other supporting features yourself.",
      points: [
        "Agents still find and run it with oo-cli",
        "Fewer pages and admin tools to build",
      ],
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "Keep it running",
      title: "Make the tool available beyond your own machine",
      description:
        "Cloud keeps the tool online, stores secrets, and controls who can use it. If you later need an API, MCP, or automation, you can add those options without rebuilding the tool.",
      points: [
        "Less server and permission work",
        "Start with agents, then expand when needed",
      ],
    },
  ],
};

export default function CloudPagePainPoints() {
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
