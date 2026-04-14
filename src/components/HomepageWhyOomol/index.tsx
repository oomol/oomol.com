import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const zhCopy = {
  badge: "进阶扩展",
  title: "现成场景不够，就进入 OOMOL Studio 继续扩展",
  subtitle:
    "当你需要重新组合已有连接、编排多步工作流，或者直接开发新的函数工具时，就把这条路径自然延伸到 OOMOL Studio。",
  primaryCta: "了解 OOMOL Studio",
  secondaryCta: "下载 OOMOL Studio",
  cards: [
    {
      icon: "i-lucide-blocks",
      title: "重新组合现有连接",
      text: "把 GitHub、Slack、Notion、Gmail 这些现成能力继续拼成你自己的执行链路。",
    },
    {
      icon: "i-lucide-waypoints",
      title: "编排更复杂的工作流",
      text: "把判断、分支、重试和多步协作整理成可重复运行的 workflow，而不是每次都临时拼接。",
    },
    {
      icon: "i-lucide-braces",
      title: "直接编写新的函数工具",
      text: "当现有封装不够用时，直接写新的 function tool，把你自己的 API、内部系统和逻辑接进来。",
    },
    {
      icon: "i-lucide-terminal",
      title: "把能力继续带回 oo-cli",
      text: "新编排和新工具不是另起炉灶，而是继续扩展 CLI 给 Agent 调用的那条主路径。",
    },
  ],
};

const enCopy = {
  badge: "Advanced extension",
  title: "When ready-made scenarios are not enough, continue in OOMOL Studio",
  subtitle:
    "When you need to recombine existing connections, orchestrate multi-step workflows, or build brand-new function tools, extend the same path in OOMOL Studio.",
  primaryCta: "Explore OOMOL Studio",
  secondaryCta: "Download OOMOL Studio",
  cards: [
    {
      icon: "i-lucide-blocks",
      title: "Recombine built-in connections",
      text: "Take GitHub, Slack, Notion, Gmail, and other ready-made capabilities and rearrange them into your own execution chain.",
    },
    {
      icon: "i-lucide-waypoints",
      title: "Orchestrate more complex workflows",
      text: "Turn branching, retries, coordination, and multi-step logic into repeatable workflows instead of rebuilding them ad hoc.",
    },
    {
      icon: "i-lucide-braces",
      title: "Write new function tools directly",
      text: "When existing wrappers stop short, write new function tools and bring in your own APIs, internal systems, and business logic.",
    },
    {
      icon: "i-lucide-terminal",
      title: "Bring those capabilities back into oo-cli",
      text: "New workflows and tools do not become a parallel product. They extend the same CLI path your agents already use.",
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
          <div className={styles.actions}>
            <Button asChild size="sm" className={styles.primaryAction}>
              <Link to="/studio">{copy.primaryCta}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className={styles.secondaryAction}
            >
              <Link to="/downloads#studio-downloads">{copy.secondaryCta}</Link>
            </Button>
          </div>
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
