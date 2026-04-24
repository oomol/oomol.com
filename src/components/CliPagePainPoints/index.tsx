import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import React from "react";

type Copy = {
  badge: string;
  title: string;
  subtitle: string;
  cards: Array<{
    icon: string;
    eyebrow: string;
    command: string;
    title: string;
    description: string;
    points: string[];
  }>;
};

export default function CliPagePainPoints() {
  const copy: Copy = {
    badge: translate({ message: "CLI.painpoints.badge" }),
    title: translate({ message: "CLI.painpoints.title" }),
    subtitle: translate({ message: "CLI.painpoints.subtitle" }),
    cards: [
      {
        icon: "i-lucide-download",
        eyebrow: translate({ message: "CLI.painpoints.card1.eyebrow" }),
        command: "oo install / oo update / oo skills install",
        title: translate({ message: "CLI.painpoints.card1.title" }),
        description: translate({
          message: "CLI.painpoints.card1.description",
        }),
        points: [
          translate({ message: "CLI.painpoints.card1.point1" }),
          translate({ message: "CLI.painpoints.card1.point2" }),
        ],
      },
      {
        icon: "i-lucide-search",
        eyebrow: translate({ message: "CLI.painpoints.card2.eyebrow" }),
        command: "oo search / oo packages info / oo connector search",
        title: translate({ message: "CLI.painpoints.card2.title" }),
        description: translate({
          message: "CLI.painpoints.card2.description",
        }),
        points: [
          translate({ message: "CLI.painpoints.card2.point1" }),
          translate({ message: "CLI.painpoints.card2.point2" }),
        ],
      },
      {
        icon: "i-lucide-plug",
        eyebrow: translate({ message: "CLI.painpoints.card3.eyebrow" }),
        command: "oo connector run / oo cloud-task ... / oo file / oo log",
        title: translate({ message: "CLI.painpoints.card3.title" }),
        description: translate({
          message: "CLI.painpoints.card3.description",
        }),
        points: [
          translate({ message: "CLI.painpoints.card3.point1" }),
          translate({ message: "CLI.painpoints.card3.point2" }),
        ],
      },
    ],
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>{copy.badge}</div>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionSubtitle}>{copy.subtitle}</p>
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
              <div className={styles.cardMeta}>
                <div className={styles.cardEyebrow}>{card.eyebrow}</div>
                <code className={styles.cardCommand}>{card.command}</code>
              </div>
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
