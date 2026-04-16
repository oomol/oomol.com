import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const zhCopy = {
  badge: "开发者入口",
  title: "现成能力不够，就到 OOMOL Studio 做自己的工具",
  subtitle:
    "你可以在 Studio 里重组现成能力、补代码、编排 workflow、写新的 function tool。工具在本地跑通之后，再交给 Cloud 承接交付。",
  primaryCta: "了解 OOMOL Studio",
  secondaryCta: "下载 OOMOL Studio",
  cards: [
    {
      icon: "i-lucide-blocks",
      title: "把现成能力重组成你自己的工具",
      text: "把 GitHub、Slack、Notion、Gmail 这些现成能力继续拼成你自己的执行链路，而不是停在单次调用。",
    },
    {
      icon: "i-lucide-waypoints",
      title: "把多步逻辑固定成 workflow",
      text: "把判断、分支、重试和多步协作整理成可重复运行的 workflow，而不是每次都临时拼接。",
    },
    {
      icon: "i-lucide-braces",
      title: "直接编写新的函数工具",
      text: "当现有封装不够用时，直接写新的 function tool，把你自己的 API、内部系统和逻辑接进来。",
    },
    {
      icon: "i-lucide-route",
      title: "让新工具继续进入交付路径",
      text: "Studio 不是终点。本地验证后，再交给 Cloud，并主要沿 oo-cli 继续给 Agent 使用。",
    },
  ],
};

const enCopy = {
  badge: "Developer entry",
  title: "When ready-made capabilities stop short, move into OOMOL Studio",
  subtitle:
    "In Studio, you can recombine ready-made capabilities, add code, orchestrate workflows, and write new function tools. Once the tool works locally, hand it to Cloud for delivery.",
  primaryCta: "Explore OOMOL Studio",
  secondaryCta: "Download OOMOL Studio",
  cards: [
    {
      icon: "i-lucide-blocks",
      title: "Turn ready-made capabilities into your own tool",
      text: "Take GitHub, Slack, Notion, Gmail, and other built-in capabilities and reorganize them into your own execution chain instead of stopping at one-off use.",
    },
    {
      icon: "i-lucide-waypoints",
      title: "Turn multi-step logic into a workflow",
      text: "Turn branching, retries, coordination, and multi-step logic into repeatable workflows instead of rebuilding them ad hoc.",
    },
    {
      icon: "i-lucide-braces",
      title: "Write new function tools directly",
      text: "When existing wrappers stop short, write new function tools and bring in your own APIs, internal systems, and business logic.",
    },
    {
      icon: "i-lucide-route",
      title: "Move the new tool into the delivery path",
      text: "Studio is not the endpoint. Once local validation is done, the next step is Cloud, then mainly back into oo-cli so agents can keep using the same path.",
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
              <Link to="/downloads">{copy.secondaryCta}</Link>
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
