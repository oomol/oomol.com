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
];

const zhCopy = {
  title: "先接常用应用，再接自己的工具",
  description: "常见 SaaS、内部服务和自定义 API，都能沿同一路径给 Agent 使用。",
  customCards: [
    {
      icon: "i-lucide-braces",
      title: "你的 API",
      text: "把业务接口和内部服务继续接进来。",
    },
    {
      icon: "i-lucide-blocks",
      title: "你的逻辑",
      text: "现成工具不够时，再组合和扩展自己的实现。",
    },
  ],
  footer: "现成工具不够时，用 OOMOL 继续组合和扩展。",
};

const enCopy = {
  title: "Start with the apps you already use, then bring in your own tools",
  description:
    "SaaS apps, internal services, and custom APIs can all follow the same path into agents.",
  customCards: [
    {
      icon: "i-lucide-braces",
      title: "Your API",
      text: "Bring business endpoints and internal services onto the same path.",
    },
    {
      icon: "i-lucide-blocks",
      title: "Your logic",
      text: "Compose and extend your own implementation when ready-made tools stop short.",
    },
  ],
  footer:
    "When ready-made tools stop short, keep composing and extending with OOMOL.",
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
          <p className={styles.footer}>{copy.footer}</p>
        </div>

        <div className={styles.surfacePanel}>
          <div className={styles.toolsBlock}>
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

          <div className={styles.connectorRow} aria-hidden="true">
            <span className={styles.connectorLine} />
            <span className={styles.connectorBadge}>+</span>
            <span className={styles.connectorLine} />
            <span className={styles.connectorArrow}>→</span>
          </div>

          <div className={styles.customBlock}>
            <div className={styles.customGrid}>
              {copy.customCards.map(card => (
                <div key={card.title} className={styles.customCard}>
                  <div className={styles.customIconWrap}>
                    <i
                      className={`${styles.customIcon} ${card.icon}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles.customTitle}>{card.title}</div>
                  <p className={styles.customText}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
