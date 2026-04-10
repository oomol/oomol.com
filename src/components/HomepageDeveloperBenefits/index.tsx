import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import React from "react";

const benefits = [
  {
    tag: translate({ message: "HOME.DeveloperBenefits.card1.tag" }),
    value: translate({ message: "HOME.DeveloperBenefits.card1.value" }),
    valueCaption: translate({
      message: "HOME.DeveloperBenefits.card1.valueCaption",
    }),
    eyebrow: translate({ message: "HOME.DeveloperBenefits.card1.eyebrow" }),
    title: translate({ message: "HOME.DeveloperBenefits.card1.title" }),
    description: translate({
      message: "HOME.DeveloperBenefits.card1.description",
    }),
    note: translate({ message: "HOME.DeveloperBenefits.card1.note" }),
    cta: translate({ message: "HOME.DeveloperBenefits.card1.cta" }),
    href: "/docs/cloud-services/cli",
  },
  {
    tag: translate({ message: "HOME.DeveloperBenefits.card2.tag" }),
    value: translate({ message: "HOME.DeveloperBenefits.card2.value" }),
    valueCaption: translate({
      message: "HOME.DeveloperBenefits.card2.valueCaption",
    }),
    eyebrow: translate({ message: "HOME.DeveloperBenefits.card2.eyebrow" }),
    title: translate({ message: "HOME.DeveloperBenefits.card2.title" }),
    description: translate({
      message: "HOME.DeveloperBenefits.card2.description",
    }),
    note: translate({ message: "HOME.DeveloperBenefits.card2.note" }),
    cta: translate({ message: "HOME.DeveloperBenefits.card2.cta" }),
    href: "/studio",
  },
];

export default function HomepageDeveloperBenefits() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            {translate({ message: "HOME.DeveloperBenefits.badge" })}
          </div>
          <h2 className={styles.title}>
            {translate({ message: "HOME.DeveloperBenefits.title" })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ message: "HOME.DeveloperBenefits.subtitle" })}
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
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
                <Link to={benefit.href} className={styles.cta}>
                  {benefit.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
