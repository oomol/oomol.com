import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import React from "react";

export default function HomepagePainPoints() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            {translate({ message: "HOME.PainPoints.badge" })}
          </div>
          <h2 className={styles.title}>
            {translate({ message: "HOME.PainPoints.title" })}
          </h2>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>
              {translate({ message: "HOME.PainPoints.card1.title" })}
            </h3>
            <p className={styles.cardDescription}>
              {translate({ message: "HOME.PainPoints.card1.description" })}
            </p>
            <div className={styles.solution}>
              <p className={styles.solutionText}>
                {translate({ message: "HOME.PainPoints.card1.solution" })}
              </p>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>
              {translate({ message: "HOME.PainPoints.card2.title" })}
            </h3>
            <p className={styles.cardDescription}>
              {translate({ message: "HOME.PainPoints.card2.description" })}
            </p>
            <div className={styles.solution}>
              <p className={styles.solutionText}>
                {translate({ message: "HOME.PainPoints.card2.solution" })}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
