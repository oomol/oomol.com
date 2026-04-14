import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const zhCopy = {
  badge: "为什么用 Cloud",
  title: "现成工具不够时，难的是做出自己的工具",
  card1: {
    icon: "i-lucide-blocks",
    title: "现成工具很快会到边界",
    description:
      "能先用，但一到真实业务，参数、状态、外部依赖和上下游约束就会超出边界。",
    solution: "缺的那部分，最后还是要做成你自己的工具。",
  },
  card2: {
    icon: "i-lucide-waypoints",
    title: "难的是把它真正用起来",
    description:
      "做出功能只是开始。生成、验证、发布，再到 oo-cli 里可搜索、可调用，才是更重的一段。",
    solution: "Studio 生成并验证，Cloud 发布并运行，oo-cli 负责调用。",
  },
};

const enCopy = {
  badge: "Why Cloud",
  title:
    "When ready-made tools stop short, the hard part is building your own tool",
  card1: {
    icon: "i-lucide-blocks",
    title: "Ready-made tools hit a limit fast",
    description:
      "They help at first, but real work quickly outgrows them with parameters, state, external dependencies, and handoff constraints.",
    solution: "The missing piece still has to become a tool of your own.",
  },
  card2: {
    icon: "i-lucide-waypoints",
    title: "The hard part is making it usable",
    description:
      "Building the feature is only the start. Generation, validation, publish, and discovery in oo-cli are the heavier part.",
    solution:
      "Studio builds and validates it. Cloud publishes and runs it. oo-cli makes it callable.",
  },
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
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardIcon}>
              <i
                className={`${styles.iconGlyph} ${copy.card1.icon}`}
                aria-hidden="true"
              />
            </div>
            <h3 className={styles.cardTitle}>{copy.card1.title}</h3>
            <p className={styles.cardDescription}>{copy.card1.description}</p>
            <div className={styles.solution}>
              <p className={styles.solutionText}>{copy.card1.solution}</p>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>
              <i
                className={`${styles.iconGlyph} ${copy.card2.icon}`}
                aria-hidden="true"
              />
            </div>
            <h3 className={styles.cardTitle}>{copy.card2.title}</h3>
            <p className={styles.cardDescription}>{copy.card2.description}</p>
            <div className={styles.solution}>
              <p className={styles.solutionText}>{copy.card2.solution}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
