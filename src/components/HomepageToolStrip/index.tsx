import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const toolIcons = [
  { icon: "i-simple-icons-github", label: "GitHub" },
  { icon: "i-simple-icons-slack", label: "Slack" },
  { icon: "i-simple-icons-notion", label: "Notion" },
  { icon: "i-simple-icons-gmail", label: "Gmail" },
  { icon: "i-simple-icons-linear", label: "Linear" },
  { icon: "i-simple-icons-hubspot", label: "HubSpot" },
  { icon: "i-simple-icons-salesforce", label: "Salesforce" },
  { icon: "i-simple-icons-stripe", label: "Stripe" },
];

const zhCopy = {
  badge: "内置连接规模",
  title: "先看我们已经连了多少 SaaS",
  description:
    "OOMOL 内置支持 1000 种 SaaS，包含 4 万多个封装工具。用户先对规模有感知，再决定要不要继续深挖具体能力。",
  footer:
    "这些现成连接可以直接进入 oo-cli，也能成为后续 Studio 编排和扩展的起点。",
  panelEyebrow: "Built-in catalog",
  stats: [
    {
      value: "1000+",
      label: "种 SaaS",
      text: "覆盖常见办公、协作、开发、营销和支付类服务。",
    },
    {
      value: "40,000+",
      label: "封装工具",
      text: "把已有连接整理成 Agent 可以直接调用的能力入口。",
    },
    {
      value: "Agent-ready",
      label: "可直接接入",
      text: "同一批连接可以进入 CLI，也能继续被编排和扩展。",
    },
  ],
  wallTitle: "常见 SaaS 已内置接入",
  wallNote: "先用现成的，再决定是否做自定义扩展。",
  coverage: ["OAuth", "API Key", "CLI", "Agent", "Composable"],
};

const enCopy = {
  badge: "Built-in coverage",
  title: "Start with how many SaaS integrations are already built in",
  description:
    "OOMOL comes with support for 1,000 SaaS apps and more than 40,000 wrapped tools. Lead with scale first, because users react to concrete numbers.",
  footer:
    "These built-in connections can go straight into oo-cli and later become the starting point for Studio orchestration and extension.",
  panelEyebrow: "Built-in catalog",
  stats: [
    {
      value: "1000+",
      label: "SaaS apps",
      text: "Covering common services across collaboration, development, marketing, and payments.",
    },
    {
      value: "40,000+",
      label: "wrapped tools",
      text: "Published as agent-usable entry points instead of raw integration fragments.",
    },
    {
      value: "Agent-ready",
      label: "delivery path",
      text: "The same connections can enter CLI first and stay composable later.",
    },
  ],
  wallTitle: "Common SaaS integrations are already available",
  wallNote:
    "Use what already exists first, then decide what needs custom work.",
  coverage: ["OAuth", "API Keys", "CLI", "Agent", "Composable"],
};

export default function HomepageToolStrip() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copyColumn}>
          <div className={styles.badge}>{copy.badge}</div>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.description}>{copy.description}</p>
          <p className={styles.footer}>{copy.footer}</p>
        </div>

        <div className={styles.surfacePanel}>
          <div className={styles.panelEyebrow}>{copy.panelEyebrow}</div>

          <div className={styles.statGrid}>
            {copy.stats.map(stat => (
              <article key={stat.label} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <p className={styles.statText}>{stat.text}</p>
              </article>
            ))}
          </div>

          <div className={styles.toolWall}>
            <div className={styles.wallHeader}>
              <div className={styles.wallTitle}>{copy.wallTitle}</div>
              <div className={styles.wallNote}>{copy.wallNote}</div>
            </div>
            <div className={styles.toolGrid}>
              {toolIcons.map(tool => (
                <div key={tool.label} className={styles.toolChip}>
                  <i
                    className={`${styles.toolIcon} ${tool.icon}`}
                    aria-hidden="true"
                  />
                  <span className={styles.toolLabel}>{tool.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.coverageRow}>
            {copy.coverage.map(item => (
              <span key={item} className={styles.coverageChip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
