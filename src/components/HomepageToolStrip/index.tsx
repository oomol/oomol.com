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
  badge: "READY-MADE APPS + YOUR API",
  title: "现成工具接得快，你自己的 API 和 skill 也能一起接进来",
  description:
    "不只是展示能连很多 SaaS，而是把现成工具、内部服务和自定义能力放进同一条 agent 能力路径里。",
  customCards: [
    {
      icon: "i-lucide-braces",
      title: "你的 API",
      text: "业务接口、内部服务和私有系统都能继续接入。",
    },
    {
      icon: "i-lucide-blocks",
      title: "你的 Skill",
      text: "需要时再组合、扩展和封装自己的能力。",
    },
  ],
  footer: "SaaS 授权、API Key 和自定义逻辑可以共用同一条交付路径。",
};

const enCopy = {
  badge: "READY-MADE APPS + YOUR API",
  title:
    "Connect ready-made tools fast, then keep bringing in your own APIs and skills",
  description:
    "This is not only about showing many SaaS logos. It brings ready-made apps, internal services, and custom capabilities into one agent capability path.",
  customCards: [
    {
      icon: "i-lucide-braces",
      title: "Your API",
      text: "Business endpoints, internal services, and private systems can join the same path.",
    },
    {
      icon: "i-lucide-blocks",
      title: "Your Skill",
      text: "Compose, extend, and wrap your own capabilities when ready-made ones are not enough.",
    },
  ],
  footer:
    "SaaS auth, API keys, and custom logic can share the same delivery path.",
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
          <div className={styles.toolsBlock}>
            <div className={styles.blockLabel}>Apps</div>
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
            <div className={styles.blockLabel}>Custom</div>
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
