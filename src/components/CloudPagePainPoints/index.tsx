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
    title: string;
    description: string;
    points: string[];
  }>;
};

export default function CloudPagePainPoints() {
  const copy: Copy = {
    badge: translate({ message: "CLOUD.painpoints.badge" }),
    title: translate({ message: "CLOUD.painpoints.title" }),
    subtitle: translate({ message: "CLOUD.painpoints.subtitle" }),
    cards: [
      {
        icon: "i-lucide-waypoints",
        eyebrow: translate({ message: "CLOUD.painpoints.card1.eyebrow" }),
        title: translate({ message: "CLOUD.painpoints.card1.title" }),
        description: translate({
          message: "CLOUD.painpoints.card1.description",
        }),
        points: [
          translate({ message: "CLOUD.painpoints.card1.point1" }),
          translate({ message: "CLOUD.painpoints.card1.point2" }),
        ],
      },
      {
        icon: "i-lucide-blocks",
        eyebrow: translate({ message: "CLOUD.painpoints.card2.eyebrow" }),
        title: translate({ message: "CLOUD.painpoints.card2.title" }),
        description: translate({
          message: "CLOUD.painpoints.card2.description",
        }),
        points: [
          translate({ message: "CLOUD.painpoints.card2.point1" }),
          translate({ message: "CLOUD.painpoints.card2.point2" }),
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
