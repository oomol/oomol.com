import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const benefits = [
  {
    tag: translate({ message: "HOME.DeveloperBenefits.card1.tag" }),
    route: translate({ message: "HOME.DeveloperBenefits.card1.value" }),
    routeCaption: translate({
      message: "HOME.DeveloperBenefits.card1.valueCaption",
    }),
    eyebrow: translate({ message: "HOME.DeveloperBenefits.card1.eyebrow" }),
    title: translate({ message: "HOME.DeveloperBenefits.card1.title" }),
    description: translate({
      message: "HOME.DeveloperBenefits.card1.description",
    }),
    note: translate({ message: "HOME.DeveloperBenefits.card1.note" }),
    cta: translate({ message: "HOME.DeveloperBenefits.card1.cta" }),
    href: "/cli",
  },
  {
    tag: translate({ message: "HOME.DeveloperBenefits.card2.tag" }),
    route: translate({ message: "HOME.DeveloperBenefits.card2.value" }),
    routeCaption: translate({
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
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.DeveloperBenefits.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.DeveloperBenefits.subtitle" })}
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map(benefit => (
            <article key={benefit.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.eyebrow}>{benefit.eyebrow}</div>
                <div className={styles.tag}>{benefit.tag}</div>
              </div>
              <div className={styles.routePill}>
                <div className={styles.route}>{benefit.route}</div>
                <div className={styles.routeCaption}>
                  {benefit.routeCaption}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
              <p className={styles.cardNote}>{benefit.note}</p>
              <div className={styles.cardFooter}>
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
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
