import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import { Button } from "@site/src/components/ui/button";
import React from "react";

export default function HomepageWhyOomol() {
  const copy = {
    badge: translate({
      id: "HOME.DeveloperEntry.badge",
      message: "Developer entry",
    }),
    title: translate({
      id: "HOME.DeveloperEntry.title",
      message:
        "When ready-made capabilities are not enough, move into OOMOL Studio",
    }),
    subtitle: translate({
      id: "HOME.DeveloperEntry.subtitle",
      message:
        "In Studio, you can recombine ready-made capabilities, add code, orchestrate workflows, and write new function tools. Once the tool works locally, hand it to Cloud for delivery.",
    }),
    primaryCta: translate({
      id: "HOME.DeveloperEntry.primaryCta",
      message: "Explore OOMOL Studio",
    }),
    secondaryCta: translate({
      id: "HOME.DeveloperEntry.secondaryCta",
      message: "Download OOMOL Studio",
    }),
    cards: [
      {
        icon: "i-lucide-blocks",
        title: translate({
          id: "HOME.DeveloperEntry.card1.title",
          message: "Turn ready-made capabilities into your own tool",
        }),
        text: translate({
          id: "HOME.DeveloperEntry.card1.text",
          message:
            "Take GitHub, Slack, Notion, Gmail, and other built-in capabilities and reorganize them into your own execution chain instead of stopping at one-off use.",
        }),
      },
      {
        icon: "i-lucide-waypoints",
        title: translate({
          id: "HOME.DeveloperEntry.card2.title",
          message: "Turn multi-step logic into a workflow",
        }),
        text: translate({
          id: "HOME.DeveloperEntry.card2.text",
          message:
            "Turn branching, retries, coordination, and multi-step logic into repeatable workflows instead of rebuilding them ad hoc.",
        }),
      },
      {
        icon: "i-lucide-braces",
        title: translate({
          id: "HOME.DeveloperEntry.card3.title",
          message: "Write new function tools directly",
        }),
        text: translate({
          id: "HOME.DeveloperEntry.card3.text",
          message:
            "When existing wrappers are not enough, write new function tools and bring in your own APIs, business systems, and business logic.",
        }),
      },
      {
        icon: "i-lucide-route",
        title: translate({
          id: "HOME.DeveloperEntry.card4.title",
          message: "Move the new tool into the delivery path",
        }),
        text: translate({
          id: "HOME.DeveloperEntry.card4.text",
          message:
            "Studio is not the endpoint. Once local validation is done, the next step is Cloud, then mainly back into oo-cli so agents can keep using the same path.",
        }),
      },
    ],
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>{copy.badge}</div>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
          <div className={styles.actions}>
            <Button asChild size="sm" className={styles.primaryAction}>
              <Link to="/studio">{copy.primaryCta}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className={styles.secondaryAction}
            >
              <Link to="/downloads">{copy.secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <div className={styles.grid}>
          {copy.cards.map(card => (
            <article key={card.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <i
                    className={`${styles.icon} ${card.icon}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
