import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const zhCopy = {
  title: "让 Agent 跑起来，先解决这四件事",
  subtitle: "先跑通一个工具，再继续扩展成自己的工具链。",
  cards: [
    {
      icon: "i-lucide-search",
      title: "先找到能直接用的应用和工具",
      text: "先搜索、先查看、先运行，不用一开始就从零搭集成。",
    },
    {
      icon: "i-lucide-key-round",
      title: "需要访问时，再把账号和密钥接进来",
      text: "账号、API Key 和访问关系按需接入，不在第一步增加信任成本。",
    },
    {
      icon: "i-lucide-blocks",
      title: "现成工具不够时，再接你的 API 和业务逻辑",
      text: "内部服务、自定义接口和组合逻辑都可以继续接进同一条路径。",
    },
    {
      icon: "i-lucide-waypoints",
      title: "同一份实现继续服务不同入口",
      text: "CLI、自动化和其他 Agent 入口共用同一份实现，不需要重复包装。",
    },
  ],
};

const enCopy = {
  title: "What agents need to run for real",
  subtitle:
    "Get one tool working first, then extend it into your own toolchain.",
  cards: [
    {
      icon: "i-lucide-search",
      title: "Find apps and tools you can use right away",
      text: "Search, inspect, and run before building from scratch.",
    },
    {
      icon: "i-lucide-key-round",
      title: "Connect accounts and API keys only when a tool really needs access",
      text: "Keep OAuth, API keys, and access relationships on the same path without putting trust cost first.",
    },
    {
      icon: "i-lucide-blocks",
      title: "When ready-made tools stop short, bring in your APIs and business logic",
      text: "Add internal services, custom endpoints, and composed logic onto the same path.",
    },
    {
      icon: "i-lucide-waypoints",
      title: "Carry the same implementation into different surfaces",
      text: "Let CLI, automations, and other agent entry points share one implementation without repackaging it.",
    },
  ],
};

export default function HomepageWhyOomol() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {copy.cards.map(card => (
            <article key={card.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <i
                    className={`${styles.icon} ${card.icon}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
