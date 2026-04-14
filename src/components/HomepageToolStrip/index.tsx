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
  title: "先看我们已经连了多少 SaaS",
  description:
    "OOMOL 内置支持 1000 种 SaaS，包含 4 万多个封装工具。先用现成连接快速接入，再决定哪些环节值得继续编排或扩展。",
  stats: [
    {
      value: "1000+",
      label: "种 SaaS",
      text: "覆盖办公、协作、开发、营销和支付等常见服务。",
    },
    {
      value: "40,000+",
      label: "封装工具",
      text: "不是零散接口，而是可直接调用的能力入口。",
    },
    {
      value: "Agent-ready",
      label: "可直接接入",
      text: "同一批连接可以进 CLI，也能继续编排和扩展。",
    },
  ],
  wallTitle: "常见 SaaS 已内置接入",
};

const enCopy = {
  title: "Start with how many SaaS integrations are already built in",
  description:
    "OOMOL comes with support for 1,000 SaaS apps and more than 40,000 wrapped tools. Start with what already exists, then decide where deeper orchestration or extension is worth it.",
  stats: [
    {
      value: "1000+",
      label: "SaaS apps",
      text: "Covering common services across collaboration, development, marketing, and payments.",
    },
    {
      value: "40,000+",
      label: "wrapped tools",
      text: "Packaged as usable capability entry points instead of raw integration fragments.",
    },
    {
      value: "Agent-ready",
      label: "delivery path",
      text: "The same connections can enter CLI first and stay composable later.",
    },
  ],
  wallTitle: "Common SaaS integrations are already available",
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
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.description}>{copy.description}</p>
        </div>

        <div className={styles.surfacePanel}>
          <div className={styles.statGrid}>
            {copy.stats.map(stat => (
              <article key={stat.label} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <p className={styles.statText}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  {stat.text}
                </p>
              </article>
            ))}
          </div>

          <div className={styles.toolWall}>
            <div className={styles.wallTitle}>{copy.wallTitle}</div>
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
        </div>
      </div>
    </section>
  );
}
