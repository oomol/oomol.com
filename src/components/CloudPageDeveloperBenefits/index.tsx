import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const zhCopy = {
  badge: "免费额度",
  title: "先用免费额度开始交付",
  subtitle:
    "Free 用户每月自动刷新 200 分钟 Cloud Task。先用它把工具交付到 Cloud；额度不够时，再充值或升级。",
  benefits: [
    {
      tag: "每月赠送",
      value: "200 分钟",
      valueCaption: "Cloud Task 免费时长",
      eyebrow: "免费额度",
      title: "先把工具交付并用起来",
      description:
        "用每月自动刷新的免费额度把工具交付出去，确认它能持续运行，并在 oo-cli 中直接被搜索、查看和调用。",
      note: "适合首次交付、轻量任务和日常试用。",
      cta: "查看 Cloud 文档",
      href: "/docs/cloud-services/cloud-function",
    },
    {
      tag: "按时间计费",
      value: "按时间",
      valueCaption: "Cloud Task 计费方式",
      eyebrow: "按量使用",
      title: "按调用时长计费，按需扩展",
      description:
        "先用每月自动刷新的免费额度；超出后，再按实际调用时长计费，不需要先买服务器或预留固定资源。",
      note: "先用赠送额度跑起来，再决定规模。",
      cta: "查看价格",
      href: "/pricing",
    },
  ],
};

const enCopy = {
  badge: "Free Tier",
  title: "Start delivery with the free quota",
  subtitle:
    "Free users get 200 Cloud Task minutes refreshed every month. Use them to deliver the tool through Cloud first, then top up or upgrade when the quota is not enough.",
  benefits: [
    {
      tag: "Monthly Included",
      value: "200 Minutes",
      valueCaption: "Free Cloud Task time",
      eyebrow: "Free quota",
      title: "Deliver the tool and start using it",
      description:
        "Use the monthly refreshed quota to deliver the tool and confirm it stays searchable and callable in oo-cli.",
      note: "A good fit for first delivery, lightweight jobs, and everyday trial use.",
      cta: "Read Cloud docs",
      href: "/docs/cloud-services/cloud-function",
    },
    {
      tag: "Time-based billing",
      value: "By Time",
      valueCaption: "How Cloud Task is billed",
      eyebrow: "Usage-based",
      title: "Scale with call-duration billing",
      description:
        "You do not need to buy servers or reserve fixed capacity up front. Pay for actual call time only after the included quota runs out, and expand only when demand grows.",
      note: "Start using it first, then decide the scale.",
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
