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
      message: "Publish your first tool with the included quota",
    }),
    subtitle: translate({
      id: "HOME.CloudBenefits.subtitle",
      message:
        "Free users get 200 Cloud Task minutes each month. Use them to publish and try your first tool, then top up or upgrade when usage grows.",
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
          message: "Cloud Task time",
        }),
        eyebrow: translate({
          id: "HOME.CloudBenefits.card1.eyebrow",
          message: "Free quota",
        }),
        title: translate({
          id: "HOME.CloudBenefits.card1.title",
          message: "Publish a first version people can use",
        }),
        description: translate({
          id: "HOME.CloudBenefits.card1.description",
          message:
            "Use the monthly quota to put the tool online, check that it runs reliably, and make sure agents can find and run it through oo-cli.",
        }),
        note: translate({
          id: "HOME.CloudBenefits.card1.note",
          message:
            "A good fit for first tools, lightweight jobs, and everyday trials.",
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
          message: "By time",
        }),
        valueCaption: translate({
          id: "HOME.CloudBenefits.card2.valueCaption",
          message: "Cloud Task billing",
        }),
        eyebrow: translate({
          id: "HOME.CloudBenefits.card2.eyebrow",
          message: "Usage-based",
        }),
        title: translate({
          id: "HOME.CloudBenefits.card2.title",
          message: "Pay only for the time you use",
        }),
        description: translate({
          id: "HOME.CloudBenefits.card2.description",
          message:
            "You do not need to buy servers or reserve capacity in advance. After the free quota runs out, billing is based on actual run time, so you can grow when demand grows.",
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
