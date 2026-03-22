import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import MediaRequirementPlaceholder from "@site/src/components/MediaRequirementPlaceholder";
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

        <div className={styles.contentGrid}>
          <div className={styles.problemGrid}>
            {problems.map((problem, index) => (
              <article key={problem.title} className={styles.problemCard}>
                <div className={styles.problemIndex}>{`0${index + 1}`}</div>
                <h3 className={styles.problemTitle}>{problem.title}</h3>
                <p className={styles.problemDescription}>{problem.description}</p>
              </article>
            ))}
          </div>

          <aside className={styles.mediaPanel}>
            <div className={styles.mediaMeta}>
              <div className={styles.mediaEyebrow}>
                {translate({
                  message: "Suggested Media Slot",
                })}
              </div>
              <p className={styles.mediaSummary}>
                {translate({
                  message:
                    "Use motion here to explain why delivery work expands after the function already works. This slot should show process change, not UI detail alone.",
                })}
              </p>
            </div>

            <MediaRequirementPlaceholder
              tone="dark"
              badge={translate({ message: "GIF OR SHORT VIDEO" })}
              titleLines={[
                translate({ message: "Delivery Gap" }),
                translate({ message: "Flow Demo" }),
              ]}
              summary={translate({
                message: "6-10s loop. 16:9. Show delivery work multiplying.",
              })}
              chips={[
                translate({ message: "16:9" }),
                translate({ message: "6-10s" }),
                translate({ message: "Loop" }),
              ]}
              steps={[
                {
                  index: "01",
                  title: translate({ message: "Function works" }),
                  detail: translate({
                    message: "Start from a validated local run.",
                  }),
                },
                {
                  index: "02",
                  title: translate({ message: "Delivery work appears" }),
                  detail: translate({
                    message: "Show wrappers, deploy, env, scheduling.",
                  }),
                },
                {
                  index: "03",
                  title: translate({ message: "Outputs split" }),
                  detail: translate({
                    message: "End at API, MCP, and Task branches.",
                  }),
                },
              ]}
              footnote={translate({
                message: "Replace with real capture: code-to-delivery-gap.mp4",
              })}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
