import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";

// 开发生命周期步骤数据
const lifecycleSteps = [
  {
    number: "01",
    title: translate({ message: "HOME.Lifecycle.step1.title" }),
    description: translate({ message: "HOME.Lifecycle.step1.description" }),
    details: [
      translate({ message: "HOME.Lifecycle.step1.detail1" }),
      translate({ message: "HOME.Lifecycle.step1.detail2" }),
    ],
    icon: "🎨",
  },
  {
    number: "02",
    title: translate({ message: "HOME.Lifecycle.step2.title" }),
    description: translate({ message: "HOME.Lifecycle.step2.description" }),
    details: [],
    icon: "📦",
  },
  {
    number: "03",
    title: translate({ message: "HOME.Lifecycle.step3.title" }),
    description: translate({ message: "HOME.Lifecycle.step3.description" }),
    details: [
      translate({ message: "HOME.Lifecycle.step3.detail1" }),
      translate({ message: "HOME.Lifecycle.step3.detail2" }),
      translate({ message: "HOME.Lifecycle.step3.detail3" }),
    ],
    icon: "🚀",
  },
  {
    number: "04",
    title: translate({ message: "HOME.Lifecycle.step4.title" }),
    description: translate({ message: "HOME.Lifecycle.step4.description" }),
    details: [
      translate({ message: "HOME.Lifecycle.step4.detail1" }),
      translate({ message: "HOME.Lifecycle.step4.detail2" }),
      translate({ message: "HOME.Lifecycle.step4.detail3" }),
      translate({ message: "HOME.Lifecycle.step4.detail4" }),
    ],
    icon: "✨",
  },
];

export default function HomepageLifecycle() {
  return (
    <section className={styles.lifecycleSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.Lifecycle.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.Lifecycle.subtitle" })}
          </p>
        </div>

        {/* Steps Timeline */}
        <div className={styles.timeline}>
          {lifecycleSteps.map((step, index) => (
            <div key={index} className={styles.stepWrapper}>
              {/* Step Card */}
              <div className={styles.stepCard}>
                {/* Step Number & Icon */}
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                </div>

                {/* Step Content */}
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>

                  {/* Step Details */}
                  {step.details.length > 0 && (
                    <ul className={styles.stepDetails}>
                      {step.details.map((detail, idx) => (
                        <li key={idx} className={styles.detailItem}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Connector Arrow (except for last item) */}
              {index < lifecycleSteps.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.arrow}>→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
