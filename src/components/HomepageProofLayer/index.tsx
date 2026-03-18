import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import React from "react";

const proofSignals = [
  {
    label: translate({ message: "HOME.ProofLayer.signal1.label" }),
    value: translate({ message: "HOME.ProofLayer.signal1.value" }),
    description: translate({
      message: "HOME.ProofLayer.signal1.description",
    }),
  },
  {
    label: translate({ message: "HOME.ProofLayer.signal2.label" }),
    value: translate({ message: "HOME.ProofLayer.signal2.value" }),
    description: translate({
      message: "HOME.ProofLayer.signal2.description",
    }),
  },
  {
    label: translate({ message: "HOME.ProofLayer.signal3.label" }),
    value: translate({ message: "HOME.ProofLayer.signal3.value" }),
    description: translate({
      message: "HOME.ProofLayer.signal3.description",
    }),
  },
];

const proofScenarios = [
  {
    kicker: translate({ message: "HOME.ProofLayer.case1.kicker" }),
    title: translate({ message: "HOME.ProofLayer.case1.title" }),
    description: translate({ message: "HOME.ProofLayer.case1.description" }),
    href: "https://pdf.oomol.com/",
    cta: translate({ message: "HOME.ProofLayer.case1.cta" }),
  },
  {
    kicker: translate({ message: "HOME.ProofLayer.case2.kicker" }),
    title: translate({ message: "HOME.ProofLayer.case2.title" }),
    description: translate({ message: "HOME.ProofLayer.case2.description" }),
  },
  {
    kicker: translate({ message: "HOME.ProofLayer.case3.kicker" }),
    title: translate({ message: "HOME.ProofLayer.case3.title" }),
    description: translate({ message: "HOME.ProofLayer.case3.description" }),
  },
];

export default function HomepageProofLayer() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            {translate({ message: "HOME.ProofLayer.badge" })}
          </div>
          <h2 className={styles.title}>
            {translate({ message: "HOME.ProofLayer.title" })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ message: "HOME.ProofLayer.subtitle" })}
          </p>
          <p className={styles.note}>
            {translate({ message: "HOME.ProofLayer.note" })}
          </p>
        </div>

        <div className={styles.signalGrid}>
          {proofSignals.map(signal => (
            <div key={signal.label} className={styles.signalCard}>
              <div className={styles.signalLabel}>{signal.label}</div>
              <div className={styles.signalValue}>{signal.value}</div>
              <p className={styles.signalDescription}>{signal.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.caseGrid}>
          {proofScenarios.map(item => (
            <div key={item.title} className={styles.caseCard}>
              <div className={styles.caseKicker}>{item.kicker}</div>
              <h3 className={styles.caseTitle}>{item.title}</h3>
              <p className={styles.caseDescription}>{item.description}</p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.caseLink}
                >
                  {item.cta}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
