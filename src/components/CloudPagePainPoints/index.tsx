import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const zhCopy = {
  badge: "为什么要上云",
  title: "你写的能力，不该在交付时失控",
  card1: {
    title: "本地执行 = 代码泄露",
    description:
      "现在 Codex、Claude Code 要调用你的能力，就得把代码拉到本地跑。你的算法、商业逻辑、调用链路，全部暴露给使用方。",
    solution:
      "Cloud Skill 让能力在云端执行，用户只调用接口，代码始终在你手里。",
  },
  card2: {
    title: "想交付一个 Skill，却要搭一整套后端",
    description:
      "服务器、扩缩容、计费系统、订阅管理、Secrets 配置、使用数据……写核心逻辑只占 20%，剩下 80% 都在搭基础设施。",
    solution: "Cloud 把运行时、订阅、配置和数据全部承接，你只管写核心逻辑。",
  },
};

const enCopy = {
  badge: "Why go cloud",
  title: "Your code shouldn't leak when you deliver it",
  card1: {
    title: "Local execution = code exposure",
    description:
      "Today, when Codex or Claude Code calls your skill, it pulls the code to local and runs it there. Your algorithms, business logic, and call chains are fully exposed to the consumer.",
    solution:
      "A cloud skill runs in the cloud. Users call the interface; your code stays with you.",
  },
  card2: {
    title: "You just want to deliver a skill, not build an entire backend",
    description:
      "Servers, auto-scaling, billing, subscription management, secrets, usage analytics… Writing the core logic is 20% of the work. The other 80% is delivery infrastructure.",
    solution:
      "Cloud handles runtime, subscriptions, configuration, and data. You just write the logic.",
  },
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
          <h2 className={styles.title}>{copy.title}</h2>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{copy.card1.title}</h3>
            <p className={styles.cardDescription}>{copy.card1.description}</p>
            <div className={styles.solution}>
              <p className={styles.solutionText}>{copy.card1.solution}</p>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{copy.card2.title}</h3>
            <p className={styles.cardDescription}>{copy.card2.description}</p>
            <div className={styles.solution}>
              <p className={styles.solutionText}>{copy.card2.solution}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
