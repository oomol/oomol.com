import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

export default function HomepagePainPoints() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";

  const cards = [
    {
      title: translate({ message: "HOME.PainPoints.card1.title" }),
      description: translate({ message: "HOME.PainPoints.card1.description" }),
      prompt: translate({ message: "HOME.PainPoints.card1.prompt" }),
      result: translate({ message: "HOME.PainPoints.card1.solution" }),
      apps: [
        { icon: "i-simple-icons-github", label: "GitHub" },
        { icon: "i-simple-icons-slack", label: "Slack" },
      ],
    },
    {
      title: translate({ message: "HOME.PainPoints.card2.title" }),
      description: translate({ message: "HOME.PainPoints.card2.description" }),
      prompt: translate({ message: "HOME.PainPoints.card2.prompt" }),
      result: translate({ message: "HOME.PainPoints.card2.solution" }),
      apps: [
        { icon: "i-simple-icons-notion", label: "Notion" },
        { icon: "i-simple-icons-linear", label: "Linear" },
      ],
    },
    {
      title: translate({ message: "HOME.PainPoints.card3.title" }),
      description: translate({ message: "HOME.PainPoints.card3.description" }),
      prompt: translate({ message: "HOME.PainPoints.card3.prompt" }),
      result: translate({ message: "HOME.PainPoints.card3.solution" }),
      apps: [
        { icon: "i-simple-icons-gmail", label: "Gmail" },
        {
          icon: "i-lucide-braces",
          label: isZh ? "你的 API" : "Your API",
        },
      ],
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            {translate({ message: "HOME.PainPoints.badge" })}
          </div>
          <h2 className={styles.title}>
            {translate({ message: "HOME.PainPoints.title" })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ message: "HOME.PainPoints.subtitle" })}
          </p>
        </div>

        <div className={styles.grid}>
          {cards.map((card, index) => (
            <article key={card.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardEyebrow}>
                  {isZh ? `动作场景 0${index + 1}` : `Use Case 0${index + 1}`}
                </div>
                <div className={styles.appRow}>
                  {card.apps.map(app => (
                    <span key={app.label} className={styles.appChip}>
                      <i
                        className={`${styles.appIcon} ${app.icon}`}
                        aria-hidden="true"
                      />
                      <span>{app.label}</span>
                    </span>
                  ))}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <div className={styles.exampleBlock}>
                <div className={styles.exampleLabel}>
                  {translate({ message: "HOME.PainPoints.promptLabel" })}
                </div>
                <p className={styles.exampleText}>{card.prompt}</p>
              </div>
              <div className={styles.resultBlock}>
                <div className={styles.resultIconWrap}>
                  <i className="i-lucide-play" aria-hidden="true" />
                </div>
                <div className={styles.resultContent}>
                  <div className={styles.resultLabel}>
                    {translate({ message: "HOME.PainPoints.resultLabel" })}
                  </div>
                  <p className={styles.resultText}>{card.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
