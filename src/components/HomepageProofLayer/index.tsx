import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
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

export default function HomepageProofLayer() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const case1Image = useBaseUrl(
    isZh ? "/img/proof/pdf2epub-zh.png" : "/img/proof/pdf2epub-en.png"
  );
  const case2Image = useBaseUrl(
    isZh
      ? "/img/proof/reader-bookshelf-zh.jpg"
      : "/img/proof/reader-bookshelf-en.jpg"
  );
  const case3Image = useBaseUrl(
    isZh ? "/img/proof/reader-pdf-zh.jpg" : "/img/proof/reader-pdf-en.jpg"
  );

  const proofScenarios = [
    {
      kicker: translate({ message: "HOME.ProofLayer.case1.kicker" }),
      title: translate({ message: "HOME.ProofLayer.case1.title" }),
      description: translate({ message: "HOME.ProofLayer.case1.description" }),
      image: case1Image,
      href: "https://pdf.oomol.com/pdf-craft",
      cta: translate({ message: "HOME.ProofLayer.case1.cta" }),
    },
    {
      kicker: translate({ message: "HOME.ProofLayer.case2.kicker" }),
      title: translate({ message: "HOME.ProofLayer.case2.title" }),
      description: translate({ message: "HOME.ProofLayer.case2.description" }),
      image: case2Image,
      href: "https://pdf.oomol.com/download",
      cta: translate({ message: "HOME.ProofLayer.case2.cta" }),
    },
    {
      kicker: translate({ message: "HOME.ProofLayer.case3.kicker" }),
      title: translate({ message: "HOME.ProofLayer.case3.title" }),
      description: translate({ message: "HOME.ProofLayer.case3.description" }),
      image: case3Image,
      href: "https://pdf.oomol.com/download",
      cta: translate({ message: "HOME.ProofLayer.case3.cta" }),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
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
        </div>

        <div className={styles.caseGrid}>
          {proofScenarios.map((item, index) => (
            <div
              key={item.title}
              className={`${styles.caseCard} ${
                index === 0 ? styles.featuredCase : ""
              }`}
            >
              <div className={styles.caseMedia}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.caseImage}
                  loading="lazy"
                />
              </div>
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
