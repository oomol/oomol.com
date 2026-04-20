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
  badge: "为什么在 Studio 之后还需要 Cloud",
  title: "Studio 解决构建，Cloud 解决交付层",
  subtitle:
    "工具在本地跑通之后，真正拖慢上线的往往不是逻辑本身，而是托管运行、访问控制、Secrets 和交付这层。Cloud 的角色，就是把这一层压到最短。",
  cards: [
    {
      icon: "i-lucide-waypoints",
      eyebrow: "交付层",
      title: "不用再围着同一份实现补一套后台",
      description:
        "Cloud 承接交付、配置、权限和运行关系，让你不需要再单独做一个发布后台去包住同一份实现。",
      points: ["主要沿 oo-cli 继续交付给 Agent", "不用再额外补一层用户入口和管理面"],
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "托管层",
      title: "把运行、权限和访问控制一起交给 Cloud",
      description:
        "用户主要通过 oo-cli 继续使用工具；当你需要 API、MCP 或自动化时，也可以从同一层能力继续往外提供，而实现仍然留在服务器端。",
      points: ["少管运维和权限细节", "先交付，再按实际使用扩展"],
    },
  ],
};

const enCopy: Copy = {
  badge: "Why Cloud after Studio",
  title: "Studio handles building. Cloud handles delivery.",
  subtitle:
    "Once the tool works locally, what slows launch is usually not the logic itself but everything around it: hosted runtime, access control, secrets, and delivery. Cloud exists to shrink that layer.",
  cards: [
    {
      icon: "i-lucide-waypoints",
      eyebrow: "Delivery layer",
      title: "Stop building another backend around the same implementation",
      description:
        "Cloud takes over delivery, configuration, access, and runtime so you do not need a separate publishing backend wrapped around the same tool.",
      points: [
        "Deliver it mainly through oo-cli for agents",
        "Avoid building a separate user and admin layer",
      ],
    },
    {
      icon: "i-lucide-blocks",
      eyebrow: "Hosted layer",
      title: "Let Cloud handle runtime, access, and permissions together",
      description:
        "Users still access the tool mainly through oo-cli. When you need API, MCP, or automation endpoints, you can add them through the same Cloud setup while the implementation stays on the server.",
      points: [
        "Less ops and permission work to manage",
        "Deliver first, then expand with real usage",
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
