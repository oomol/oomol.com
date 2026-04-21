import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/ui/button";
import React from "react";

export default function CloudPageDeveloperBenefits() {
  const copy = {
    badge: translate({
      id: "HOME.CloudBenefits.badge",
      message: "Included Usage",
    }),
    title: translate({
      id: "HOME.CloudBenefits.title",
      message: "Start delivery with the included free quota",
    }),
    subtitle: translate({
      id: "HOME.CloudBenefits.subtitle",
      message:
        "Free users get 200 Cloud Task minutes refreshed every month. Use them to deliver the tool through Cloud first, then top up or upgrade when the quota is not enough.",
    }),
    benefits: [
      {
        tag: translate({
          id: "HOME.CloudBenefits.card1.tag",
          message: "Included Monthly",
        }),
        value: translate({
          id: "HOME.CloudBenefits.card1.value",
          message: "200 min",
        }),
        valueCaption: translate({
          id: "HOME.CloudBenefits.card1.valueCaption",
          message: "Included Cloud Task time",
        }),
        eyebrow: translate({
          id: "HOME.CloudBenefits.card1.eyebrow",
          message: "Free quota",
        }),
        title: translate({
          id: "HOME.CloudBenefits.card1.title",
          message: "Deliver the tool and start using it",
        }),
        description: translate({
          id: "HOME.CloudBenefits.card1.description",
          message:
            "Use the monthly refreshed quota to deliver the tool, confirm it keeps running, and make sure it is searchable and callable in oo-cli.",
        }),
        note: translate({
          id: "HOME.CloudBenefits.card1.note",
          message:
            "A good fit for first delivery, lightweight jobs, and everyday trial use.",
        }),
        cta: translate({
          id: "HOME.CloudBenefits.card1.cta",
          message: "Read Cloud docs",
        }),
        href: "/docs/cloud-services/cloud-function",
      },
      {
        tag: translate({
          id: "HOME.CloudBenefits.card2.tag",
          message: "Time-based billing",
        }),
        value: translate({
          id: "HOME.CloudBenefits.card2.value",
          message: "By runtime",
        }),
        valueCaption: translate({
          id: "HOME.CloudBenefits.card2.valueCaption",
          message: "How Cloud Task is billed",
        }),
        eyebrow: translate({
          id: "HOME.CloudBenefits.card2.eyebrow",
          message: "Usage-based",
        }),
        title: translate({
          id: "HOME.CloudBenefits.card2.title",
          message: "Pay by runtime as usage grows",
        }),
        description: translate({
          id: "HOME.CloudBenefits.card2.description",
          message:
            "You do not need to buy servers or reserve fixed capacity up front. Pay for actual call time only after the included quota runs out, and expand only when demand grows.",
        }),
        note: translate({
          id: "HOME.CloudBenefits.card2.note",
          message:
            "Start with the included quota, then scale only when you need to.",
        }),
        cta: translate({
          id: "HOME.CloudBenefits.card2.cta",
          message: "View pricing",
        }),
        href: "/pricing",
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
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={styles.cta}
                >
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
