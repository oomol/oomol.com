import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

type Copy = {
  badge: string;
  title: string;
  subtitle: string;
  cards: Array<{
    icon: string;
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  }>;
};

const zhCopy: Copy = {
  badge: "为什么用 Cloud",
  title: "Cloud 解决的是交付和使用门槛",
  subtitle:
    "Studio 负责做出工具，Cloud 负责把它交付到 oo-cli，并以云服务的方式供用户使用。",
  cards: [
    {
      icon: "i-lucide-waypoints",
      eyebrow: "交付",
      title: "交付到 oo-cli 更直接",
      description:
        "Cloud 和 oo-cli 是打通的。Studio 里的自定义工具交付后，就能直接在 oo-cli 中被搜索和调用。",
      points: [
        "不用再单独补一套接入链路",
        "从 Studio 到 oo-cli 的交付路径天然连着",
      ],
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "使用",
      title: "免运维，按调用时长计费",
      description:
        "直接以云服务方式提供，用户不需要自己承担部署和运维，也不必为固定资源预先投入。",
      points: [
        "免运维，上手门槛更低",
        "按调用时长收费，成本更灵活",
      ],
    },
  ],
};

const enCopy: Copy = {
  badge: "Why Cloud",
  title: "Cloud lowers the delivery and usage barrier",
  subtitle:
    "Studio is where you build the tool. Cloud is what delivers it to oo-cli and makes it usable as a service.",
  cards: [
    {
      icon: "i-lucide-waypoints",
      eyebrow: "Delivery",
      title: "A shorter path into oo-cli",
      description:
        "Cloud is tightly integrated with oo-cli. Once a custom tool is delivered from Studio, it can be searched and called directly in oo-cli.",
      points: [
        "No separate integration layer to build",
        "The delivery path from Studio to oo-cli stays connected",
      ],
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "Usage",
      title: "No ops burden, flexible billing",
      description:
        "Cloud provides the tool as a service, so users do not need to run or maintain infrastructure of their own.",
      points: [
        "No ops overhead for the user",
        "Billed by call duration for flexible cost",
      ],
    },
  ],
};

export default function CloudPagePainPoints() {
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
          {copy.cards.map(card => (
            <article key={card.title} className={styles.card}>
              <div className={styles.cardIcon}>
                <i
                  className={`${styles.iconGlyph} ${card.icon}`}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.cardEyebrow}>{card.eyebrow}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <ul className={styles.pointList}>
                {card.points.map(point => (
                  <li key={point} className={styles.pointItem}>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
