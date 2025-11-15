import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";

// 核心功能数据
const coreFeatures = [
  {
    number: "01",
    title: translate({ message: "HOME.CoreFeatures.container.title" }),
    description: translate({ message: "HOME.CoreFeatures.container.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.container.highlight1" }),
    ],
    color: "blue",
  },
  {
    number: "02",
    title: translate({ message: "HOME.CoreFeatures.workflow.title" }),
    description: translate({ message: "HOME.CoreFeatures.workflow.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.workflow.highlight1" }),
    ],
    color: "purple",
  },
  {
    number: "03",
    title: translate({ message: "HOME.CoreFeatures.mcp.title" }),
    description: translate({ message: "HOME.CoreFeatures.mcp.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.mcp.highlight1" }),
    ],
    color: "pink",
  },
  {
    number: "04",
    title: translate({ message: "HOME.CoreFeatures.vscode.title" }),
    description: translate({ message: "HOME.CoreFeatures.vscode.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.vscode.highlight1" }),
    ],
    color: "green",
  },
];

export default function HomepageCoreFeatures() {
  return (
    <section className={styles.coreFeaturesSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.CoreFeatures.title" })}
          </h2>
        </div>

        {/* Features List */}
        <div className={styles.featuresList}>
          {coreFeatures.map((feature, index) => (
            <div key={index} className={`${styles.featureCard} ${styles[feature.color]}`}>
              {/* Feature Number */}
              <div className={styles.featureNumber}>{feature.number}</div>

              {/* Feature Content */}
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>

                {/* Highlights */}
                <ul className={styles.highlightsList}>
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className={styles.highlightItem}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
