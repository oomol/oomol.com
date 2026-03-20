import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import React from "react";

const problems = [
  {
    title: translate({ message: "HOME.DeliveryGap.problem1.title" }),
    description: translate({
      message: "HOME.DeliveryGap.problem1.description",
    }),
  },
  {
    title: translate({ message: "HOME.DeliveryGap.problem2.title" }),
    description: translate({
      message: "HOME.DeliveryGap.problem2.description",
    }),
  },
  {
    title: translate({ message: "HOME.DeliveryGap.problem3.title" }),
    description: translate({
      message: "HOME.DeliveryGap.problem3.description",
    }),
  },
];

export default function HomepageDeliveryGap() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            {translate({ message: "HOME.DeliveryGap.badge" })}
          </div>
          <h2 className={styles.title}>
            {translate({ message: "HOME.DeliveryGap.title" })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ message: "HOME.DeliveryGap.subtitle" })}
          </p>
        </div>

        <div className={styles.problemGrid}>
          {problems.map((problem, index) => (
            <article key={problem.title} className={styles.problemCard}>
              <div className={styles.problemIndex}>{`0${index + 1}`}</div>
              <h3 className={styles.problemTitle}>{problem.title}</h3>
              <p className={styles.problemDescription}>{problem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
