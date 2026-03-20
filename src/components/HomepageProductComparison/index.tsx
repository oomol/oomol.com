import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";

const deliveryOutputs = [
  {
    title: translate({ message: "HOME.ProductComparison.output1.title" }),
    description: translate({
      message: "HOME.ProductComparison.output1.description",
    }),
  },
  {
    title: translate({ message: "HOME.ProductComparison.output2.title" }),
    description: translate({
      message: "HOME.ProductComparison.output2.description",
    }),
  },
  {
    title: translate({ message: "HOME.ProductComparison.output3.title" }),
    description: translate({
      message: "HOME.ProductComparison.output3.description",
    }),
  },
];

const cloudBenefits = [
  {
    label: translate({ message: "HOME.ProductComparison.benefit1.label" }),
    value: translate({ message: "HOME.ProductComparison.benefit1.value" }),
    description: translate({
      message: "HOME.ProductComparison.benefit1.description",
    }),
  },
  {
    label: translate({ message: "HOME.ProductComparison.benefit2.label" }),
    value: translate({ message: "HOME.ProductComparison.benefit2.value" }),
    description: translate({
      message: "HOME.ProductComparison.benefit2.description",
    }),
  },
];

export default function HomepageProductComparison() {
  return (
    <section className={styles.comparisonSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.ProductComparison.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.ProductComparison.subtitle" })}
          </p>
        </div>

        <div className={styles.cloudSection}>
          <div className={styles.cloudCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardMetaRow}>
                <div className={styles.cardIcon} aria-hidden="true">
                  ☁️
                </div>
                <div className={styles.cardBadge}>
                  {translate({ message: "HOME.ProductComparison.cloud.stage" })}
                </div>
              </div>
              <h3 className={styles.cardTitle}>
                {translate({ message: "HOME.ProductComparison.product.cloud" })}
              </h3>
              <p className={styles.cardLead}>
                {translate({ message: "HOME.ProductComparison.cloud.capability" })}
              </p>
              <p className={styles.cardSummary}>
                {translate({ message: "HOME.ProductComparison.cloud.scenario" })}
              </p>
              <div className={styles.cardActions}>
                <Link to="/cloud" className={styles.primaryCta}>
                  {translate({ message: "HOME.ProductComparison.cta" })}
                </Link>
                <div className={styles.inlineNote}>
                  {translate({ message: "HOME.ProductComparison.cloud.tech" })}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailPanel}>
            <div className={styles.outputsIntro}>
              <div className={styles.infoLabel}>
                {translate({ message: "HOME.ProductComparison.outputIntro" })}
              </div>
              <p className={styles.outputsText}>
                {translate({ message: "HOME.ProductComparison.outputSummary" })}
              </p>
            </div>

            <div className={styles.outputsGrid}>
              {deliveryOutputs.map(output => (
                <div key={output.title} className={styles.outputCard}>
                  <h4 className={styles.outputTitle}>{output.title}</h4>
                  <p className={styles.outputDescription}>{output.description}</p>
                </div>
              ))}
            </div>

            <div className={styles.benefitsGrid}>
              {cloudBenefits.map(benefit => (
                <div key={benefit.label} className={styles.benefitCard}>
                  <div className={styles.benefitLabel}>{benefit.label}</div>
                  <div className={styles.benefitValue}>{benefit.value}</div>
                  <p className={styles.benefitDescription}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
