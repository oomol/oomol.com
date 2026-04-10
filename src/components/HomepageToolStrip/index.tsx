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
  badge: "现成工具 + 你的 API",
  title: "先接现成工具，再接自己的能力",
  description: "现成工具、内部服务和自定义能力可以共用一条路径。",
  appsLabel: "现成工具",
  customLabel: "自定义能力",
  customCards: [
    {
      icon: "i-lucide-braces",
      title: "你的 API",
      text: "业务接口和内部服务继续接入。",
    },
    {
      icon: "i-lucide-blocks",
      title: "你的能力",
      text: "需要时再组合和扩展自己的实现。",
    },
  ],
  footer: "SaaS 授权、接口密钥和自定义逻辑走同一条路径。",
};

const enCopy = {
  badge: "Ready-made tools + your API",
  title:
    "Connect ready-made tools first, then keep bringing in your own capabilities",
  description:
    "Ready-made tools, internal services, and custom capabilities can share one path.",
  appsLabel: "Tools",
  customLabel: "Your side",
  customCards: [
    {
      icon: "i-lucide-braces",
      title: "Your API",
      text: "Business endpoints and internal services keep joining the same path.",
    },
    {
      icon: "i-lucide-blocks",
      title: "Your capability",
      text: "Compose and extend your own implementation when ready-made ones are not enough.",
    },
  ],
  footer: "SaaS auth, API keys, and custom logic stay on the same path.",
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
            <div className={styles.blockLabel}>{copy.appsLabel}</div>
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
            <div className={styles.blockLabel}>{copy.customLabel}</div>
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
