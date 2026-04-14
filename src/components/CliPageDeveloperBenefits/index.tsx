import styles from "../CloudPageDeveloperBenefits/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const zhCopy = {
  badge: "先用起来",
  title: "先把使用面跑通，再决定要不要自己做",
  subtitle:
    "CLI 不要求你第一天就补齐 API、MCP、交付后台和运维体系。先用现成工具验证任务，再决定下一步投入。",
  benefits: [
    {
      tag: "现成工具",
      value: "搜索 / 查看 / 运行",
      valueCaption: "CLI 默认路径",
      eyebrow: "先用",
      title: "先从已发布工具开始",
      description:
        "在终端里先搜索包、查看输入、直接运行，知道现成工具是不是已经够用。",
      note: "适合先验证真实任务，而不是先设计完整接入。",
      cta: "查看安装文档",
      href: "/docs/cloud-services/cli",
    },
    {
      tag: "需要时再扩展",
      value: "Studio / Cloud",
      valueCaption: "下一步去向",
      eyebrow: "再做",
      title: "不够时再进 Studio 和 Cloud",
      description:
        "现成工具不够时，再去生成、验证并交付自己的工具。路径是连续的，不是重新来一遍。",
      note: "先跑通，再决定要不要投入自定义开发。",
      cta: "了解 Studio",
      href: "/studio",
    },
  ],
};

const enCopy = {
  badge: "Start Using It",
  title: "Get the usage path working before you decide to build",
  subtitle:
    "CLI does not require API, MCP, delivery backend, and ops decisions on day one. Validate the task with ready-made tools first, then choose what deserves more investment.",
  benefits: [
    {
      tag: "Ready-made tools",
      value: "Search / Inspect / Run",
      valueCaption: "The default CLI path",
      eyebrow: "Use first",
      title: "Start from published tools",
      description:
        "Search packages, inspect inputs, and run them directly in terminal to see whether existing tools are already enough.",
      note: "A better fit when you want real-task proof before a full integration design.",
      cta: "Open install guide",
      href: "/docs/cloud-services/cli",
    },
    {
      tag: "Extend when needed",
      value: "Studio / Cloud",
      valueCaption: "Where the path continues",
      eyebrow: "Build later",
      title: "Move into Studio and Cloud only when needed",
      description:
        "When ready-made tools stop short, generate, validate, and deliver your own tool through the same path instead of starting over.",
      note: "Get it working first, then decide whether custom development is worth it.",
      cta: "Explore Studio",
      href: "/studio",
    },
  ],
};

export default function CliPageDeveloperBenefits() {
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
          {copy.benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`${styles.card} ${
                index === 0 ? styles.modelCard : styles.cloudCard
              }`}
            >
              <div className={styles.cardTop}>
                <div className={styles.eyebrow}>{benefit.eyebrow}</div>
                <div className={styles.tag}>{benefit.tag}</div>
              </div>
              <div className={styles.valueBox}>
                <div className={styles.value}>{benefit.value}</div>
                <div className={styles.valueCaption}>
                  {benefit.valueCaption}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
              <p className={styles.cardNote}>{benefit.note}</p>
              <div className={styles.cardFooter}>
                <Button asChild variant="secondary" className={styles.cta}>
                  <Link to={benefit.href}>{benefit.cta}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
