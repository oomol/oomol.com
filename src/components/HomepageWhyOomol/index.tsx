import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const zhCopy = {
  badge: "为什么是 OOMOL",
  title: "让 Agent 真正跑起来，要先解决这四件事",
  subtitle:
    "先找到能用的能力，接入授权，扩展自己的逻辑，再把同一份能力带到不同入口。",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "先发现",
      title: "先找到能直接用的能力",
      text: "先搜索、先查看、先运行。",
    },
    {
      icon: "i-lucide-key-round",
      eyebrow: "再接入",
      title: "把授权、密钥和访问关系接进来",
      text: "SaaS 授权、接口密钥和访问关系走同一条路径。",
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "继续扩展",
      title: "现成能力不够时，再接你的 API 和自定义能力",
      text: "内部服务、业务逻辑和自定义能力继续接进来。",
    },
    {
      icon: "i-lucide-waypoints",
      eyebrow: "持续交付",
      title: "同一份能力继续进入不同入口",
      text: "终端、自动化和 Agent 入口共用同一份实现。",
    },
  ],
};

const enCopy = {
  badge: "Why OOMOL",
  title: "What it takes to get agents running for real",
  subtitle:
    "Find what already works, connect auth, extend with your own logic, then carry the same capability across surfaces.",
  cards: [
    {
      icon: "i-lucide-search",
      eyebrow: "Start here",
      title: "Find capabilities you can use right away",
      text: "Search, inspect, and run before building from scratch.",
    },
    {
      icon: "i-lucide-key-round",
      eyebrow: "Connect",
      title: "Bring auth, API keys, and access into one path",
      text: "Keep SaaS auth, API keys, and access relationships on the same path.",
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "Extend",
      title: "Add your APIs and skills when ready-made ones stop",
      text: "Keep adding internal services, business logic, and custom capabilities.",
    },
    {
      icon: "i-lucide-waypoints",
      eyebrow: "Deliver",
      title: "Carry the same capability into different surfaces",
      text: "Let terminal, automation, and agent entry points share the same implementation.",
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
          <div className={styles.badge}>{copy.badge}</div>
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
                <div className={styles.eyebrow}>{card.eyebrow}</div>
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
