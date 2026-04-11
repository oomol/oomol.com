import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const zhCopy = {
  badge: "开发者免费方案",
  title: "零成本起步，先把产品跑起来",
  subtitle:
    "不用先付费。接入自有模型 + 每月 200 分钟免费 Cloud Task，足够你从 Studio 走到第一次线上交付。",
  benefits: [
    {
      tag: "当前推荐",
      value: "GLM-5",
      valueCaption: "支持接入自有模型",
      eyebrow: "Studio 免费",
      title: "接入自有模型，先把 Studio 跑起来",
      description: "已有模型额度就直接接入，不用再额外买服务。推荐先用 GLM-5。",
      note: "按教程配好后，通常就能完成本地验证。",
      cta: "查看配置教程",
      href: "/docs/get-started/use-your-own-model",
    },
    {
      tag: "每月赠送",
      value: "200 分钟",
      valueCaption: "Cloud Task 免费时长",
      eyebrow: "Cloud 免费",
      title: "每月送 200 分钟，轻量任务先跑起来",
      description:
        "200 分钟免费 Cloud Task，通常够你先跑定时任务、轻量自动化和交付验证。",
      note: "先用免费额度跑一遍，再决定是否继续投入。",
      cta: "查看 Cloud 交付",
      href: "/docs/cloud-services/cloud-function",
    },
  ],
};

const enCopy = {
  badge: "Free for Developers",
  title: "Start at zero cost, get the full loop running",
  subtitle:
    "No upfront payment. Bring your own model plus 200 free Cloud Task minutes each month — enough to complete your first Studio-to-production delivery cycle.",
  benefits: [
    {
      tag: "Recommended",
      value: "GLM-5",
      valueCaption: "Use your own model",
      eyebrow: "Studio Free",
      title: "Bring Your Own Model and Get Studio Running",
      description:
        "If you already have model quota, connect it directly instead of paying for another service. We recommend starting with GLM-5.",
      note: "Follow the guide and you can usually finish local validation first.",
      cta: "View Setup Guide",
      href: "/docs/get-started/use-your-own-model",
    },
    {
      tag: "Monthly Included",
      value: "200 Minutes",
      valueCaption: "Free Cloud Task time",
      eyebrow: "Cloud Free",
      title: "200 Free Minutes Each Month for Lightweight Jobs",
      description:
        "The free Cloud Task quota is often enough for scheduled jobs, lightweight automation, and delivery validation.",
      note: "Use the free quota to validate the flow before you spend more.",
      cta: "Explore OOMOL Cloud",
      href: "/docs/cloud-services/cloud-function",
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
