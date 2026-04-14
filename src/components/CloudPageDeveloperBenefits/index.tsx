import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const zhCopy = {
  badge: "免费额度",
  title: "先把第一个 oo-cli 工具跑通",
  subtitle:
    "每月赠送 200 分钟 Cloud Task。先把第一版工具从 Studio 发布到 Cloud，并确认它能在 oo-cli 中被搜索、查看和调用；需要更多时，再按运行时间扩展。",
  benefits: [
    {
      tag: "每月赠送",
      value: "200 分钟",
      valueCaption: "Cloud Task 免费时长",
      eyebrow: "免费额度",
      title: "先验证从 Studio 到 oo-cli 的整条路径",
      description:
        "用免费额度把第一版工具发布出去，确认它能持续运行，并在 oo-cli 中直接被调用。",
      note: "适合第一次发布、轻量任务和流程验证。",
      cta: "了解 Cloud Function",
      href: "/docs/cloud-services/cloud-function",
    },
    {
      tag: "按时间计费",
      value: "按时间",
      valueCaption: "Cloud Task 计费方式",
      eyebrow: "按量使用",
      title: "需求明确后再扩大运行",
      description:
        "不需要先买服务器或预留固定资源。先按实际运行时间扩展，避免在路径还没验证前就投入过多。",
      note: "先把路径跑通，再决定规模。",
      cta: "查看价格",
      href: "/pricing",
    },
  ],
};

const enCopy = {
  badge: "Free Tier",
  title: "Validate your first tool in oo-cli with the free quota",
  subtitle:
    "You get 200 free Cloud Task minutes each month. Use them to publish the first version from Studio to Cloud and confirm it can be searched, inspected, and called in oo-cli, then scale with time-based billing when needed.",
  benefits: [
    {
      tag: "Monthly Included",
      value: "200 Minutes",
      valueCaption: "Free Cloud Task time",
      eyebrow: "Free quota",
      title: "Validate the full path from Studio to oo-cli",
      description:
        "Use the included quota to publish the first version and confirm it stays callable in oo-cli.",
      note: "A good fit for first releases, lightweight jobs, and flow validation.",
      cta: "Read Cloud Function docs",
      href: "/docs/cloud-services/cloud-function",
    },
    {
      tag: "Time-based billing",
      value: "By Time",
      valueCaption: "How Cloud Task is billed",
      eyebrow: "Usage-based",
      title: "Scale runtime only after the demand is real",
      description:
        "You do not need to buy servers or reserve fixed capacity up front. Expand based on actual runtime after the path is proven.",
      note: "Prove the path first, then decide the scale.",
      cta: "View pricing",
      href: "/pricing",
    },
  ],
};

export default function CloudPageDeveloperBenefits() {
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
